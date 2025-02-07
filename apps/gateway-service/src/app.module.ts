import { RemoteGraphQLDataSource, IntrospectAndCompose } from '@apollo/gateway';
import {
  Module,
  HttpStatus,
  HttpException,
  UnauthorizedException,
} from '@nestjs/common';
import { ApolloGatewayDriver, ApolloGatewayDriverConfig } from '@nestjs/apollo';
import { GraphQLModule } from '@nestjs/graphql';
import { verify } from 'jsonwebtoken';
import { INVALID_AUTH_TOKEN, INVALID_BEARER_TOKEN } from './app.constants';

const getToken = (authToken: string): string => {
  const match = authToken.match(/^Bearer (.*)$/);
  //console.log(match);
  if (!match || match.length < 2) {
    throw new HttpException(
      { message: INVALID_BEARER_TOKEN },
      HttpStatus.UNAUTHORIZED,
    );
  }
  //console.log(match[1]);
  return match[1];
};

const decodeToken = (tokenString: string) => {
  try {
    if (!process.env.SECRET_KEY) {
      throw new Error('SECRET_KEY environment variable is not set');
    }
    const decoded = verify(tokenString, process.env.SECRET_KEY);
    return decoded;
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      throw new HttpException(
        { message: 'Token has expired' },
        HttpStatus.UNAUTHORIZED,
      );
    }
    throw new HttpException(
      { message: INVALID_AUTH_TOKEN },
      HttpStatus.UNAUTHORIZED,
    );
  }
};
const handleAuth = ({ req }) => {
  try {
    if (req.headers.authorization) {
      const token = getToken(req.headers.authorization);
      const decoded: any = decodeToken(token);
      return {
        userId: decoded.userId,
        permissions: decoded.permissions,
        authorization: `${req.headers.authorization}`,
      };
    }
  } catch (error) {
    throw new UnauthorizedException(
      'User unauthorized with invalid authorization Headers',
    );
  }
};
@Module({
  imports: [
    GraphQLModule.forRoot<ApolloGatewayDriverConfig>({
      server: {
        context: handleAuth,
      },
      driver: ApolloGatewayDriver,
      gateway: {
        buildService: ({ name, url }) => {
          return new RemoteGraphQLDataSource({
            url,
            willSendRequest({ request, context }: any) {
              request.http.headers.set('userId', context.userId);
              // for now pass authorization also
              request.http.headers.set('authorization', context.authorization);
              request.http.headers.set('permissions', context.permissions);
            },
          });
        },
        supergraphSdl: new IntrospectAndCompose({
          subgraphs: [
            { name: 'Restaurant', url: 'http://3.87.225.72:5002/graphql' },
            { name: 'Order', url: 'http://34.201.36.252:5003/graphql' },
            { name: 'User', url: 'http://34.227.112.193:5001/graphql' },
            { name: 'Application', url: 'http://52.23.164.126:5004/graphql' },
          ],
        }),
      },
    }),
  ],
})
export class AppModule {}
