// libs/shared/database/src/Database/entities/discord/pastebin.entity.ts

import { Entity, Property } from '@mikro-orm/core'
import { BaseEntity } from '../base.entity'

/**
 * Represents a Pastebin-like paste record in the Discord context.
 *
 * Inherits UUID id, timestamps, and soft-delete from BaseEntity.
 */
@Entity({ tableName: 'pastebins' })
export class Pastebin extends BaseEntity {
  /**
   * Edit code used to modify or delete the paste.
   */
  @Property({ columnType: 'text', name: 'edit_code' })
  editCode!: string

  /**
   * Lifetime of the paste in seconds. -1 for no expiration.
   */
  @Property({ columnType: 'int', default: -1 })
  lifetime = -1
}
