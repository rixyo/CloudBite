import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  ManyToOne,
} from 'typeorm';
import { OrderEntity } from './order.entity'; // Import OrderEntity and ProductEntity based on your project structure

@Entity('order_items')
export class OrderItemEntity extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  public id!: string;

  @Column({ type: 'uuid', select: true })
  public orderId!: string;

  @ManyToOne(() => OrderEntity, (order) => order.orderItems)
  public order!: OrderEntity;

  @Column({ type: 'uuid', select: true })
  public menu_item_id!: string;

  @Column()
  public quantity!: number;

  @CreateDateColumn({
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP',
    select: true,
  })
  public createdAt!: Date;

  @UpdateDateColumn({ type: 'timestamptz', select: true })
  public updatedAt!: Date;
}
