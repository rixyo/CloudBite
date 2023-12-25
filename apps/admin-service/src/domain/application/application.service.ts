import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { WithdrawEntity } from './entity/withdraw.entity';
import { Repository } from 'typeorm';
import { SecretkeyEntity } from './entity/secretkey.entity';
import { Logger } from 'src/logger/logger';
import {
  SecretkeyApplicationInput,
  WithdrowalApplicationInput,
} from 'src/graphql.classes';

@Injectable()
export class ApplicationService {
  constructor(
    @InjectRepository(WithdrawEntity)
    private readonly withdrawRepository: Repository<WithdrawEntity>,
    @InjectRepository(SecretkeyEntity)
    private readonly secretkeyRepository: Repository<SecretkeyEntity>,
    private readonly logger: Logger,
  ) {}
  async createSecretKey(
    secretkeyInput: SecretkeyApplicationInput,
  ): Promise<SecretkeyEntity> {
    const saveEntity = {
      ...secretkeyInput,
      status: 'pending',
    };
    const secretkeyEntity = this.secretkeyRepository.create(saveEntity);
    let secretkey: SecretkeyEntity;
    try {
      secretkey = await this.secretkeyRepository.save(secretkeyEntity);
    } catch (error) {
      this.logger.error(`Error creating secretkey: ${JSON.stringify(error)}`);
      throw error;
    }
    this.logger.info(
      `Secretkey created: ${(secretkey.id, secretkey.created_at)}`,
    );
    return secretkey;
  }
  async getSecretkeyApplications(): Promise<SecretkeyEntity[]> {
    const secretkeyApplications = await this.secretkeyRepository.find({
      where: { status: 'pending' },
    });
    if (!secretkeyApplications) return [];
    return secretkeyApplications;
  }
  async getSecretkeyApplication(id: string): Promise<SecretkeyEntity> {
    const secretkeyApplication = await this.secretkeyRepository.findOne({
      where: { id },
    });
    if (!secretkeyApplication) throw new Error('Secretkey not found');
    return secretkeyApplication;
  }
  async createWithdraw(
    withdrawInput: WithdrowalApplicationInput,
  ): Promise<WithdrawEntity> {
    const saveEntity = {
      ...withdrawInput,
      status: 'pending',
    };
    const withdrawEntity = this.withdrawRepository.create(saveEntity);
    let withdraw: WithdrawEntity;
    try {
      withdraw = await this.withdrawRepository.save(withdrawEntity);
    } catch (error) {
      this.logger.error(`Error creating withdraw: ${JSON.stringify(error)}`);
      throw error;
    }
    this.logger.info(`Withdraw created: ${(withdraw.id, withdraw.created_at)}`);
    return withdraw;
  }
  async getUserWithdrawAmount(email: string): Promise<any> {
    const withdrawApplications = await this.withdrawRepository.find({
      where: { email, status: 'approved' },
    });
    if (withdrawApplications.length > 0) {
      const amount = withdrawApplications.reduce(
        (a, b) => a + parseInt(b.amount),
        0,
      );
      console.log(amount);
      return amount;
    }
    return 0;
  }
}
