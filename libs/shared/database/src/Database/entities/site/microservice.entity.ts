import {
  Entity,
  Property,
  ManyToOne,
  BeforeCreate,
  BeforeUpdate,
} from '@mikro-orm/core'
import slugify from 'slugify'
import { BaseEntity } from '../base.entity'
import { UserProfile } from '../user/user-profile.entity'

/**
 * Represents a microservice entry added by a user.
 *
 * Inherits common fields (id, timestamps, soft-delete) from BaseEntity.
 * Automatically generates a URL-friendly slug from the name.
 */
@Entity({ tableName: 'microservices' })
export class Microservice extends BaseEntity {
  /**
   * Display name of the microservice.
   */
  @Property({ type: 'text' })
  name!: string

  /**
   * Short description of the microservice.
   */
  @Property({ type: 'text' })
  description!: string

  /**
   * Detailed content or documentation for the microservice.
   */
  @Property({ type: 'text' })
  content!: string

  /**
   * URL or path to an image representing the microservice.
   */
  @Property({ type: 'text' })
  image!: string

  /**
   * Alternative text for the image.
   */
  @Property({ type: 'text' })
  alt!: string

  /**
   * Reference to the user profile who added this microservice.
   * Column: added_by
   */
  @ManyToOne(() => UserProfile, { name: 'added_by' })
  addedBy!: UserProfile

  /**
   * URL-friendly slug, unique across microservices.
   */
  @Property({ type: 'text', unique: true })
  slug!: string

  /**
   * Lifecycle hook to generate or update slug before insert/update.
   */
  @BeforeCreate()
  @BeforeUpdate()
  generateSlug(): void {
    this.slug = slugify(this.name, { lower: true, replacement: '_' })
  }
}
