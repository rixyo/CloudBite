import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { OrderEntity } from './order.entity';

@Entity('order_item')
export class OrderItemEntity extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  public id!: string;

  @Column({ type: 'uuid', select: true })
  public order_item_id!: string;
  @Column({ type: 'uuid', select: true })
  public restaurant_id!: string;
  @Column()
  public quantity!: number;
  @Column({ type: 'varchar', default: null })
  public order_item_name!: string;
  @Column({ type: 'varchar', default: null })
  public order_item_price!: string;
  @ManyToOne(() => OrderEntity, (event) => event.orderItem)
  @JoinColumn({ name: 'order_id', referencedColumnName: 'id' })
  public order!: OrderEntity;

  @CreateDateColumn({
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP',
    select: true,
  })
  public createdAt!: Date;

  @UpdateDateColumn({ type: 'timestamptz', select: true })
  public updatedAt!: Date;
}
