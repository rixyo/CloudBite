import {
  BaseEntity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  OneToMany,
} from 'typeorm';
import { RestaurantDishEntity } from './restaurant.dish.entity';

@Entity('restaurants')
export class RestaurantEntity extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  public id!: string;

  @Column({ type: 'varchar', length: 255, select: true, unique: true })
  public name!: string;

  @Column({ type: 'varchar', default: null })
  public description!: string;

  @Column({ type: 'uuid' })
  public owner_id!: string;

  @Column({ type: 'varchar', default: null })
  public cuisine!: string;

  @Column({ type: 'boolean', default: true })
  public is_available!: string;

  @Column({ type: 'varchar', default: null })
  public banner!: string;

  @Column({ type: 'varchar', default: null })
  public delivery_options!: string;

  @Column({ type: 'varchar', default: null })
  public pickup_options!: string;

  @OneToMany(() => RestaurantDishEntity, (event) => event.restaurant)
  public dishes!: RestaurantDishEntity[];

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

  @UpdateDateColumn({
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP',
    select: true,
  })
  public deleted_at!: Date;
}
