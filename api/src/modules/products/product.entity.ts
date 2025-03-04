import { Column, Entity, OneToMany } from 'typeorm'
import { BaseEntity } from '../../common/entities/base.entity'
import { CategoriesEntity } from '../categories/categories.entity'
import { OrderItemsEntity } from '../orders/orders.entity'

@Entity('products')
export class ProductsEntity extends BaseEntity {
  @Column()
  name!: string
  @Column()
  price!: number
  @Column({ nullable: true })
  description!: string
  @Column({ nullable: true })
  image!: string

  @OneToMany(() => CategoriesEntity, (category) => category.product)
  category!: CategoriesEntity[]
  @OneToMany(() => OrderItemsEntity, (orderItems) => orderItems.productId)
  orderItems!: OrderItemsEntity[]
}
