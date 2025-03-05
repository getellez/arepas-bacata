import { Exclude } from 'class-transformer'
import { Column, Entity, OneToMany } from 'typeorm'
import { BaseEntity } from '../../common/entities/base.entity'
import { OrdersEntity } from '../orders/orders.entity'
import { UserRoleTypes } from './users.interface'

@Entity('users')
export class UsersEntity extends BaseEntity {
  @Column()
  username!: string
  @Column()
  firstName!: string
  @Column()
  lastName!: string
  @Column()
  email!: string
  @Column({ nullable: true })
  phoneNumer!: string
  @Exclude()
  @Column({ select: false })
  password!: string
  @Column({
    type: 'enum',
    enum: UserRoleTypes,
    nullable: false,
    default: UserRoleTypes.USER,
  })
  role!: UserRoleTypes

  @OneToMany(() => OrdersEntity, (order) => order.user)
  orders!: OrdersEntity[]
}
