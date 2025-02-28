import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
} from 'typeorm'
import { BaseEntity } from '../common/entities/base.entity'
import { PaymentsEntity } from '../payments/payments.entity'
import { ProductsEntity } from '../products/products.entity'
import { UsersEntity } from '../users/user.entity'

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
  @OneToMany(() => OrderItemsEntity, (orderItems) => orderItems.orderId)
  orderItems!: OrderItemsEntity[]
}

@Entity('order_items')
export class OrderItemsEntity extends BaseEntity {
  @Column()
  productQuantity!: number
  @Column()
  totalPrice!: number

  @Column({ nullable: true })
  clientName!: string

  @ManyToOne(() => ProductsEntity, (product) => product.orderItems, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'product_id' })
  productId!: ProductsEntity
  @ManyToOne(() => OrdersEntity, (order) => order.orderItems, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'order_id' })
  orderId!: OrdersEntity
}
