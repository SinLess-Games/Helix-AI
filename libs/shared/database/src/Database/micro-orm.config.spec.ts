import MikroORMConfig, { CreateOptionsParams } from './mikro-orm.config'
import { EntityManager } from '@mikro-orm/core'

// libs/shared/database/src/Database/mikro-orm.config.test.ts

jest.mock('@mikro-orm/core', () => ({
  MikroORM: {
    init: jest.fn().mockResolvedValue({
      em: {
        findOneOrFail: jest.fn(),
        removeAndFlush: jest.fn(),
      },
    }),
  },
  EntityManager: jest.fn(),
}))

describe('MikroORMConfig.delete', () => {
  const mockParams: CreateOptionsParams = {
    connection: {
      driver: 'postgresql',
      host: 'localhost',
      port: 5432,
      user: 'test_user',
      password: 'test_password',
      dbName: 'test_db',
    },
  }

  const mockEntity = { id: 1, name: 'Test Entity' }

  it('should delete an entity successfully', async () => {
    const mockFindOneOrFail = jest.fn().mockResolvedValue(mockEntity)
    const mockRemoveAndFlush = jest.fn().mockResolvedValue(undefined)

    ;(EntityManager as jest.Mock).mockImplementation(() => ({
      findOneOrFail: mockFindOneOrFail,
      removeAndFlush: mockRemoveAndFlush,
    }))

    await MikroORMConfig.delete(mockParams, 'TestEntity', 1)

    expect(mockFindOneOrFail).toHaveBeenCalledWith('TestEntity', 1)
    expect(mockRemoveAndFlush).toHaveBeenCalledWith(mockEntity)
  })

  it('should throw an error if the entity is not found', async () => {
    const mockFindOneOrFail = jest
      .fn()
      .mockRejectedValue(new Error('Entity not found'))

    ;(EntityManager as jest.Mock).mockImplementation(() => ({
      findOneOrFail: mockFindOneOrFail,
      removeAndFlush: jest.fn(),
    }))

    await expect(
      MikroORMConfig.delete(mockParams, 'TestEntity', 1),
    ).rejects.toThrow('Entity not found')

    expect(mockFindOneOrFail).toHaveBeenCalledWith('TestEntity', 1)
  })
})
