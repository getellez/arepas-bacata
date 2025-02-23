import { BaseEntity, Column, Entity, JoinColumn, OneToOne } from 'typeorm'
import { PAYMENTS_STATUS } from '../common/interfaces/payments.interface'
import { OrdersEntity } from '../orders/orders.entity'

@Entity('payments')
export class PaymentsEntity extends BaseEntity {
  @OneToOne(() => OrdersEntity, (order) => order.payment)
  @JoinColumn({ name: 'order_id' })
  order!: string
  @Column()
  amount!: number
  @Column({
    enum: PAYMENTS_STATUS,
    default: PAYMENTS_STATUS.PENDING,
  })
  status!: string
  @Column()
  paymentMethod!: string
  @Column()
  paymentDate!: Date
}
