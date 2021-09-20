import fp from 'fastify-plugin'
import pg from 'fastify-postgres'

async function pgConfig (fastify, opts) {
  const {
    PGDATABASE: database,
    PGPORT: port,
    PGUSER: user,
    PGHOST: host,
    PGPASSWORD: password
  } = fastify.config

  const config = {
    host,
    port,
    database,
    user,
    password
  }

  fastify.register(pg, config)
}

export default fp(pgConfig, { name: 'pg', dependencies: ['env'] })
