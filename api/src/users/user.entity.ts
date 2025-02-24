import { Column, Entity, OneToMany } from 'typeorm'
import { BaseEntity } from '../common/entities/base.entity'
import { OrdersEntity } from '../orders/orders.entity'
import { Exclude } from 'class-transformer'

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
  @Column()
  password!: string
  @Column()
  role!: string

  @OneToMany(() => OrdersEntity, (order) => order.user) // note: we will create author property in the Photo class below
  orders!: OrdersEntity[]
}
