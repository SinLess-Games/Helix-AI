// libs/shared/database/src/Database/MikroORMConfig.ts

import path from 'path'
import { TsMorphMetadataProvider } from '@mikro-orm/reflection'
import {
  Options,
  MikroORM,
  EntityManager,
  EntityName,
  FilterQuery,
  FindOptions,
  FindOneOptions,
  EntityData,
} from '@mikro-orm/core'
import { Options } from '@mikro-orm/core'
import { entities } from './entities'

// Database drivers
import { MongoDriver } from '@mikro-orm/mongodb'
import { MySqlDriver } from '@mikro-orm/mysql'
import { MariaDbDriver } from '@mikro-orm/mariadb'
import { PostgreSqlDriver } from '@mikro-orm/postgresql'
import { MsSqlDriver } from '@mikro-orm/mssql'
import { SqliteDriver } from '@mikro-orm/sqlite'
import { BetterSqliteDriver } from '@mikro-orm/better-sqlite'
import { LibSqlDriver } from '@mikro-orm/libsql'

/**
 * Supported database types for dynamic driver selection.
 */
export type SupportedDriver =
  | 'postgresql'
  | 'mysql'
  | 'mariadb'
  | 'sqlite'
  | 'better-sqlite'
  | 'libsql'
  | 'mongodb'
  | 'mssql'

/**
 * Connection and migration configuration.
 */
export interface ConnectionOptions {
  driver: SupportedDriver
  host: string
  port: number
  user: string
  password: string
  dbName: string
  ssl?: boolean
  migrationsDir?: string
  migrationsTableName?: string
}

/**
 * Combined parameters for creating MikroORM options.
 */
export interface CreateOptionsParams {
  /** Core DB & migration settings */
  connection: ConnectionOptions
  /** Optional MikroORM overrides */
  overrides?: Partial<Options>
}

/**
 * MikroORMConfig
 *
 * Builds, stores, and initializes a MikroORM configuration,
 * and provides static helpers for CRUD operations.
 */
export default class MikroORMConfig {
  /** The resolved MikroORM configuration options */
  public readonly config: Options

  private ormInstance?: MikroORM
  private entityManager?: EntityManager

  /**
   * Construct a new config instance and compute the options.
   * Automatically initializes MikroORM and EntityManager.
   * @param params Parameters for generating the config
   */
  constructor(params: CreateOptionsParams) {
    this.config = MikroORMConfig.createOptions(params)
    // auto-initialize ORM and EM
    this.init().catch((err) => {
      console.error('Failed to initialize MikroORM:', err)
      throw err
    })
  }

  /**
   * Initialize MikroORM with the computed options.
   */
  public async init(): Promise<void> {
    this.ormInstance = await MikroORM.init(this.config)
    this.entityManager = this.ormInstance.em
  }

  /**
   * Get the initialized MikroORM instance.
   */
  public getORM(): MikroORM {
    if (!this.ormInstance) {
      throw new Error('ORM not initialized. Call init() first.')
    }
    return this.ormInstance
  }

  /**
   * Get the initialized EntityManager.
   */
  public getEntityManager(): EntityManager {
    if (!this.entityManager) {
      throw new Error('EntityManager not available. Call init() first.')
    }
    return this.entityManager
  }

  /**
   * Build a complete MikroORM configuration.
   */
  public static createOptions(params: CreateOptionsParams): Options {
    const { connection: opts, overrides = {} } = params

    // Migrations path and table
    const migrationsPath = opts.migrationsDir
      ? path.resolve(process.cwd(), opts.migrationsDir)
      : path.resolve(process.cwd(), 'migrations')
    const migrationsTable = opts.migrationsTableName ?? 'migrations'

    // Base configuration
    const base: Options = {
      entities,
      metadataProvider: TsMorphMetadataProvider,
      metadataCache: { enabled: true, pretty: true },
      discovery: {
        warnWhenNoEntities: false,
        requireEntitiesArray: true,
        alwaysAnalyseProperties: false,
      },
      forceUtcTimezone: true,
      driver: getDriverClass(opts.driver),
      driverOptions: {
        connection: {
          host: opts.host,
          port: opts.port,
          user: opts.user,
          password: opts.password,
          database: opts.dbName,
          ssl: opts.ssl ? { rejectUnauthorized: false } : undefined,
        },
      },
      migrations: {
        tableName: migrationsTable,
        path: migrationsPath,
        glob: '!(*.d).{js,ts}',
        transactional: true,
        disableForeignKeys: true,
        allOrNothing: true,
        emit: 'ts',
      },
    }

    return { ...base, ...overrides }
  }

  /**
   * Retrieve the driver class for a given name.
   */
  public static getDriverClass(name: SupportedDriver) {
    return getDriverClass(name)
  }

  /**
   * Helper: find one entity by filter.
   */
  public static async findOne<T>(
    params: CreateOptionsParams,
    entity: EntityName<T>,
    where: FilterQuery<T>,
    options?: Omit<FindOneOptions<T>, 'where'>,
  ): Promise<T | null> {
    const cfg = new MikroORMConfig(params)
    await cfg.init()
    return cfg.getEntityManager().findOne(entity, where as any, options)
  }

  /**
   * Helper: find multiple entities by filter.
   */
  public static async findAll<T>(
    params: CreateOptionsParams,
    entity: EntityName<T>,
    where: FilterQuery<T> = {},
    options?: Omit<FindOptions<T>, 'where'>,
  ): Promise<T[]> {
    const cfg = new MikroORMConfig(params)
    await cfg.init()
    return cfg.getEntityManager().find(entity, where as any, options)
  }

  /**
   * Helper: create and persist a new entity.
   */
  public static async create<T>(
    params: CreateOptionsParams,
    entity: EntityName<T>,
    data: EntityData<T>,
  ): Promise<T> {
    const cfg = new MikroORMConfig(params)
    await cfg.init()
    const em = cfg.getEntityManager()
    const inst = em.create(entity, data)
    await em.persistAndFlush(inst)
    return inst
  }

  /**
   * Helper: update an entity by filter or PK.
   */
  public static async update<T>(
    params: CreateOptionsParams,
    entity: EntityName<T>,
    where: FilterQuery<T> | number | string,
    data: EntityData<T>,
  ): Promise<T> {
    const cfg = new MikroORMConfig(params)
    await cfg.init()
    const em = cfg.getEntityManager()
    const inst = await em.findOneOrFail(entity, where as any)
    em.assign(inst, data)
    await em.persistAndFlush(inst)
    return inst
  }

  /**
   * Helper: delete an entity by filter or PK.
   */
  public static async delete<T>(
    params: CreateOptionsParams,
    entity: EntityName<T>,
    where: FilterQuery<T> | number | string,
  ): Promise<void> {
    const cfg = new MikroORMConfig(params)
    await cfg.init()
    const em = cfg.getEntityManager()
    const inst = await em.findOneOrFail(entity, where as any)
    await em.removeAndFlush(inst)
  }
}

/**
 * Map a supported driver string to the MikroORM driver class.
 */
function getDriverClass(name: SupportedDriver) {
  switch (name) {
    case 'postgresql':
      return PostgreSqlDriver
    case 'mysql':
      return MySqlDriver
    case 'mariadb':
      return MariaDbDriver
    case 'sqlite':
      return SqliteDriver
    case 'better-sqlite':
      return BetterSqliteDriver
    case 'libsql':
      return LibSqlDriver
    case 'mongodb':
      return MongoDriver
    case 'mssql':
      return MsSqlDriver
    default:
      throw new Error(`Unsupported driver: ${name}`)
  }
}
