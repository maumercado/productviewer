import fp from 'fastify-plugin'
import Env from 'fastify-env'

async function Config (app, opts) {
  const schema = {
    type: 'object',
    required: [
      'CURRENCY_API_KEY',
      'PGUSER',
      'PGHOST',
      'PGPORT',
      'PGDATABASE',
      'PGPASSWORD',
      'NODE_ENV'
    ],
    properties: {
      CURRENCY_API_URL: {
        type: 'string',
        default: 'https://currency-api-mock.highbond-s3.com/live'
      },
      CURRENCY_API_KEY: {
        type: 'string',
        default: ''
      },
      PGUSER: {
        type: 'string'
      },
      PGHOST: {
        type: 'string'
      },
      PGPORT: {
        type: 'number',
        default: 5432
      },
      PGDATABASE: {
        type: 'string'
      },
      PGPASSWORD: {
        type: 'string'
      },
      NODE_ENV: {
        type: 'string',
        default: 'development'
      }
    }
  }

  app.register(Env, { schema })
}

export default fp(Config, { name: 'env' })
