import { Column, Entity, JoinColumn, OneToOne } from 'typeorm'
import { BaseEntity } from '../common/entities/base.entity'
import { PAYMENTS_STATUS } from '../common/interfaces/payments.interface'
import { OrdersEntity } from '../orders/orders.entity'

@Entity('payments')
export class PaymentsEntity extends BaseEntity {
  @Column()
  amount!: number
  @Column({
    enum: PAYMENTS_STATUS,
    default: PAYMENTS_STATUS.PENDING,
  })
  status!: string
  @Column()
  paymentMethod!: string

  @OneToOne(() => OrdersEntity, (order) => order.payment)
  @JoinColumn({ name: 'order_id' })
  order!: string
}
