// libs/shared/database/src/Database/entities/site/technology.entity.ts

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
import { TechCategory } from '../../enums'

/**
 * A technology is a tool, framework, programming language,
 * or other software used to develop a microservice.
 *
 * This includes but is not limited to:
 * - Programming Languages
 * - Frameworks
 * - Libraries
 * - Databases
 * - Operating Systems
 * - Cloud Providers
 * - etc.
 */
@Entity({ tableName: 'technologies' })
export class Technology extends BaseEntity {
  /**
   * Name of the technology.
   */
  @Property({ type: 'text' })
  name!: string

  /**
   * Short description of the technology.
   */
  @Property({ type: 'text' })
  description!: string

  /**
   * Detailed content or documentation.
   */
  @Property({ type: 'text' })
  content!: string

  /**
   * URL or path to an image representing the technology.
   */
  @Property({ type: 'text' })
  image!: string

  /**
   * Alternate text for the image.
   */
  @Property({ type: 'text' })
  alt!: string

  /**
   * Primary category of the technology.
   */
  @Property({
    type: 'string',
    default: TechCategory.Other,
    name: 'category1',
  })
  category1: TechCategory = TechCategory.Other

  /**
   * Secondary category of the technology.
   */
  @Property({
    type: 'string',
    default: TechCategory.Other,
    name: 'category2',
  })
  category2: TechCategory = TechCategory.Other

  /**
   * Official website or documentation URL.
   */
  @Property({ type: 'text' })
  website!: string

  /**
   * URL-friendly slug, unique across technologies.
   */
  @Property({ type: 'text', unique: true })
  slug!: string

  /**
   * Profile of the user who added this technology.
   */
  @ManyToOne(() => UserProfile, { name: 'added_by' })
  addedBy!: UserProfile

  /**
   * Generate or update slug before insert or update operations.
   */
  @BeforeCreate()
  @BeforeUpdate()
  generateSlug(): void {
    this.slug = slugify(this.name, { lower: true, replacement: '_' })
  }
}
