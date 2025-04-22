// libs/shared/database/src/Database/entities/discord/guild.entity.ts

import { Entity, Property } from '@mikro-orm/core'
import { BaseEntity } from '../base.entity'

/**
 * Represents a Discord guild (server) record tracked by the system.
 *
 * Inherits UUID id, timestamps, and soft-delete from BaseEntity.
 */
@Entity({ tableName: 'discord_guilds' })
export class DiscordGuild extends BaseEntity {
  /**
   * Snowflake ID of the guild.
   */
  @Property({ type: 'text', name: 'discord_id' })
  discordId!: string

  /**
   * Name of the guild (2–100 characters, no leading/trailing whitespace).
   */
  @Property({ type: 'text' })
  name!: string

  /**
   * Snowflake ID of the guild owner.
   */
  @Property({ type: 'text', name: 'owner_id' })
  ownerId!: string

  /**
   * Total number of text channels and categories in the guild.
   */
  @Property({ type: 'int', name: 'channel_count' })
  channelCount!: number

  /**
   * Total number of threads across all channels in the guild.
   */
  @Property({ type: 'int', name: 'thread_count' })
  threadCount!: number

  /**
   * Total number of members in the guild.
   */
  @Property({ type: 'int', name: 'member_count' })
  memberCount!: number

  /**
   * Custom command prefix for the guild, if set.
   */
  @Property({ type: 'text', nullable: true })
  prefix?: string

  /**
   * Whether this guild record has been soft-deleted.
   */
  @Property({ default: false })
  deleted = false

  /**
   * Timestamp of the last user interaction in the guild.
   */
  @Property({
    type: 'timestamptz',
    name: 'last_interaction_at',
    defaultRaw: 'CURRENT_TIMESTAMP',
  })
  lastInteractionAt: Date = new Date()
}
