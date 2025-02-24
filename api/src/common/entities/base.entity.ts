import {
  CreateDateColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm'

export abstract class BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string
  isActive!: boolean
  isDeleted!: boolean
  @CreateDateColumn({
    name: 'created_at',
    type: 'timestamp',
  })
  created_at!: Date
  @UpdateDateColumn({
    name: 'updated_at',
    type: 'timestamp',
  })
  updated_at!: Date
}

// id
// created_at
// updated_at
