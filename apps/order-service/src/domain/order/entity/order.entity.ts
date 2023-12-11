import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { OrderItemEntity } from './orderItem.entity';
@Entity('orders')
export class OrderEntity extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  public id!: string;

  @Column({ type: 'uuid', select: true })
  public restaurantId!: string;

  @Column({ type: 'uuid', select: true })
  public userId!: string;

  @OneToMany(() => OrderItemEntity, (orderItem) => orderItem.order, {
    cascade: true,
  })
  public orderItems!: OrderItemEntity[];
  @Column({ type: 'varchar', default: null })
  public payment_status!: string;

  @Column({ type: 'varchar', default: null })
  public total!: string;
  @Column({ type: 'varchar', default: null })
  public delivery_status!: string;

  @Column({ default: '' })
  public phone!: string;

  @Column({ default: '' })
  public address!: string;

  @Column({ type: 'timestamptz', nullable: true })
  public deliveredAt!: Date | null;

  @CreateDateColumn({
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP',
    select: true,
  })
  public createdAt!: Date;

  @UpdateDateColumn({ type: 'timestamptz', select: true })
  public updatedAt!: Date;
}
