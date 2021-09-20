import Postgrator from 'postgrator'
import assert from 'assert'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

const {
  PGDATABASE,
  PGHOST,
  PGPORT = 5432,
  PGUSER,
  PGPASSWORD
} = process.env

assert(PGDATABASE, 'Environment variable POSTGRES_DB must not be undefined')
assert(PGHOST, 'Environment variable POSTGRES_HOST must not be undefined')
assert(PGUSER, 'Environment variable POSTGRES_USERNAME must not be undefined')
assert(PGPASSWORD, 'Environment variable POSTGRES_PASSWORD must not be undefined')

const postgrator = new Postgrator({
  migrationDirectory: path.join(__dirname, '..', 'migrations'),
  driver: 'pg',
  host: PGHOST,
  port: PGPORT,
  database: PGDATABASE,
  username: PGUSER,
  password: PGPASSWORD
})

postgrator
  .migrate()
  .then((appliedMigrations) => {
    console.log('Migrations applied succesfully', appliedMigrations)
  })
  .catch((err) => {
    console.error('Error applying migrations', err.appliedMigrations)
    console.error(err)
  })
