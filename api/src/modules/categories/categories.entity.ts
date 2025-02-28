import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm'
import { BaseEntity } from '../../common/entities/base.entity'
import { ProductsEntity } from '../products/product.entity'

@Entity('categories')
export class CategoriesEntity extends BaseEntity {
  @Column()
  name!: string
  @Column()
  description!: string

  @ManyToOne(() => ProductsEntity, (product) => product.category)
  @JoinColumn({ name: 'product_id' })
  product!: ProductsEntity
}
