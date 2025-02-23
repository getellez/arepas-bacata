import { Column, Entity, OneToMany, OneToOne } from 'typeorm'
import { BaseEntity } from '../common/entities/base.entity'
import { OrdersEntity } from '../orders/orders.entity'

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
  phoneNumer!: number
  @Column()
  password!: string
  @Column()
  role!: string

  @OneToMany(() => OrdersEntity, (order) => order.user) // note: we will create author property in the Photo class below
  orders!: OrdersEntity[]
}
