import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { ApplicationService } from './application.service';
import { SecretKeyDto } from './dto/secretkey.dto';
import { validate } from 'class-validator';
import { BadRequestException, UseGuards } from '@nestjs/common';
import { SecretkeyEntity } from './entity/secretkey.entity';
import { WithdrawDto } from './dto/withdraw.dto';
import { RestaurantOwnerGuard } from '../auth/guards/restaurant-owner.guard';

@Resolver('Application')
export class ApplicationResolver {
  constructor(private readonly applicationService: ApplicationService) {}
  @Mutation('secretkeyApplication')
  async secretkeyApplication(@Args('input') secretkeyInput: SecretKeyDto) {
    const { email, mobile_number, passport_nid, restaurant_license } =
      secretkeyInput;
    const createSecretKey = new SecretKeyDto();
    createSecretKey.email = email;
    createSecretKey.mobile_number = mobile_number;
    createSecretKey.passport_nid = passport_nid;
    createSecretKey.restaurant_license = restaurant_license;
    const errors = await validate(createSecretKey);
    if (errors.length > 0) {
      const errorsResponse: any = errors.map((val: any) => {
        return Object.values(val.constraints)[0] as string;
      });
      throw new BadRequestException(errorsResponse.join(','));
    }
    return await this.applicationService.createSecretKey(secretkeyInput);
  }
  @Mutation('withdrowApplication')
  async withdrowApplication(@Args('input') withdrowInput: WithdrawDto) {
    const { email, amount, passport_nid, branch_name, account_number } =
      withdrowInput;
    const createWithdraw = new WithdrawDto();
    createWithdraw.email = email;
    createWithdraw.amount = amount;
    createWithdraw.account_number = account_number;
    createWithdraw.passport_nid = passport_nid;
    createWithdraw.branch_name = branch_name;
    const errors = await validate(createWithdraw);
    if (errors.length > 0) {
      const errorsResponse: any = errors.map((val: any) => {
        return Object.values(val.constraints)[0] as string;
      });
      throw new BadRequestException(errorsResponse.join(','));
    }
    return await this.applicationService.createWithdraw(withdrowInput);
  }
  @Query('SecretkeyApplications')
  async getApplication(): Promise<SecretkeyEntity[]> {
    return await this.applicationService.getSecretkeyApplications();
  }
  @Query('SecretkeyApplication')
  async getApplicationById(@Args('id') id: string): Promise<SecretkeyEntity> {
    return await this.applicationService.getSecretkeyApplication(id);
  }
  @Query('UserWithdrowalAmount')
  @UseGuards(RestaurantOwnerGuard)
  async getUserWithdrowalAmount(@Args('email') email: string) {
    const response = await this.applicationService.getUserWithdrawAmount(email);
    return { total: response };
  }
}
