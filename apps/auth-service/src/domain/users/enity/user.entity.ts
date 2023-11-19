import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

export enum UsersRole {
  ADMIN = 'admin',
  USER = 'user',
  RESTAURANT_OWNER = 'restaurant_owner',
}
@Entity('users')
export class UserEntity extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  public id!: string;

  @Column({ type: 'varchar', length: 255, select: true, unique: true })
  public email!: string;

  @Column({ type: 'varchar', length: 500 })
  public password!: string;

  @Column({ type: 'varchar', length: 255, select: true })
  public fullName!: string;
  @Column({ type: 'jsonb', default: [UsersRole.USER] })
  public permissions!: UsersRole[];

  @Column({ type: 'varchar', default: null })
  public avaterUrl!: string;

  @Column({ type: 'varchar', length: 255, select: true })
  public lowercaseEmail!: string;

  @Column({ type: 'jsonb', default: null })
  public passwordReset!: any;

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
