import { Column, Entity } from 'typeorm'
import { BaseEntity } from '../../config/base.entity'

@Entity({ name: 'user' })
export class UserEntity extends BaseEntity {
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
  isActive!: boolean
  @Column()
  isDeleted!: boolean
  @Column()
  role!: string
}
