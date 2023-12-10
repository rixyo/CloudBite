import {
  BaseEntity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  JoinColumn,
  ManyToOne,
} from 'typeorm';
import { RestaurantEntity } from './restaurant.entity';

@Entity('restaurant_dishes')
export class RestaurantDishEntity extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  public id!: string;

  @Column({ type: 'varchar', length: 255, select: true })
  public name!: string;

  @Column({ type: 'varchar', default: null })
  public description!: string;

  @Column({ type: 'varchar', default: null })
  public dish_type!: string;
  @Column({ type: 'jsonb', default: null })
  public thumbnails!: any;

  @Column({ type: 'varchar' })
  public price!: string;

  @ManyToOne(() => RestaurantEntity, (event) => event.dishes)
  @JoinColumn({ name: 'restaurant_id', referencedColumnName: 'id' })
  public restaurant!: RestaurantEntity;

  @CreateDateColumn({
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP',
    select: true,
  })
  public created_at!: Date;

  @UpdateDateColumn({
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP',
    select: true,
  })
  public updated_at!: Date;
}
