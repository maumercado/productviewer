## Requirements

1. A postgreSQL instance
2. NodeJS 16 or older.

---

## Executing

Asumming the following variables are set on your system properly
* PGUSER
* PGHOST
* PGPORT
* PGDATABASE
* PGPASSWORD
* NODE_ENV

Make sure the database is empty as this project will create all the tables required, in order to do so go into the project in your terminal of preference, make sure that the db is reachable and type `node bin/migrate`

Add as many products as you want following the product schema.

Example:

```sql
INSERT INTO products (name, price) VALUES ('pineapple', 10)
```

### Routes

GET /products

Show all the products of the database.

GET /products/:productId?currency=<[CAD,USD,GBP,EUR] <- one of>

The `currency` query is optional, and it takes a string as shown above.
When you visit a product specifically it updates the views immediatly.


When a single product is requested, all fields of that product are returned and the view-count for that product is incremented. The request can optionally specify a currency, in which case the price should be converted to the requested currency before being returned. We need to support the following currencies:
*	USD (default)
*	CAD
*	EUR
*	GBP

#### Tests

To my shame pending.

Will be using node-tap, with a test instance of postgreSQL and nock for 3rd party API mocks