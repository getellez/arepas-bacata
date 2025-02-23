import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
} from 'typeorm'
import { UsersEntity } from '../users/user.entity'
import { PaymentsEntity } from '../payments/payments.entity'
import { ProductsEntity } from '../products/products.entity'

@Entity('orders')
export class OrdersEntity extends BaseEntity {
  @Column()
  total!: number
  @Column()
  status!: string

  @ManyToOne(() => UsersEntity, (user) => user.orders)
  @JoinColumn({ name: 'user_id' })
  user!: UsersEntity

  @OneToOne(() => PaymentsEntity, (payment) => payment.order)
  payment!: PaymentsEntity

  @ManyToOne(() => OrderItemsEntity, (orderItems) => orderItems.order)
  orderItems!: ProductsEntity[]
}

@Entity('order_items')
export class OrderItemsEntity {
  @Column()
  @ManyToOne(() => OrdersEntity, (order) => order.orderItems, {
    onDelete: 'CASCADE',
  })
  order!: string
  @ManyToOne(() => ProductsEntity, (product) => product.orderItems)
  @Column()
  product!: string
  @Column()
  quantity!: number
  @Column()
  price!: number
  @Column()
  total!: number
}
