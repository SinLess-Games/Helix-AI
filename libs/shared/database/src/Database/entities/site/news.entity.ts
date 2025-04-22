// libs/shared/database/src/Database/entities/site/news.entity.ts

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
 * Represents a news article added by a user.
 *
 * Inherits UUID id, timestamps, and soft-delete from BaseEntity.
 * Generates a URL-friendly slug from the name on create/update.
 */
@Entity({ tableName: 'news' })
export class News extends BaseEntity {
  /**
   * Title of the news article.
   */
  @Property({ type: 'text' })
  name!: string

  /**
   * Brief summary or teaser for the article.
   */
  @Property({ type: 'text' })
  description!: string

  /**
   * Full content of the news article.
   */
  @Property({ type: 'text' })
  content!: string

  /**
   * URL or path to the article's main image.
   */
  @Property({ type: 'text' })
  image!: string

  /**
   * Alternate text for the image.
   */
  @Property({ type: 'text' })
  alt!: string

  /**
   * URL-friendly slug, unique across news articles.
   */
  @Property({ type: 'text', unique: true })
  slug!: string

  /**
   * Profile of the user who added the article.
   */
  @ManyToOne(() => UserProfile, { name: 'added_by' })
  addedBy!: UserProfile

  /**
   * Generate or update slug before insert or update.
   */
  @BeforeCreate()
  @BeforeUpdate()
  generateSlug(): void {
    this.slug = slugify(this.name, { lower: true, replacement: '_' })
  }
}
