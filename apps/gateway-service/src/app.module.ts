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
  //console.log(process.env.SECRET_KEY,'secret');
  const decoded = verify(tokenString, process.env.SECRET_KEY);
  if (!decoded) {
    throw new HttpException(
      { message: INVALID_AUTH_TOKEN },
      HttpStatus.UNAUTHORIZED,
    );
  }
  return decoded;
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
  } catch (err) {
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
            { name: 'User', url: 'http://localhost:5001/graphql' },
            { name: 'Restaurant', url: 'http://localhost:5002/graphql' },
            { name: 'Order', url: 'http://localhost:5003/graphql' },
          ],
        }),
      },
    }),
  ],
})
export class AppModule {}
