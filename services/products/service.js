import fp from 'fastify-plugin'

async function ProductServices (fastify, opts) {
  async function getProducts () {
    const pgClient = await fastify.pg.connect()
    try {
      const getProds = {
        text: 'SELECT * FROM products ORDER BY created_at DESC'
      }
      const { rows } = await pgClient.query(getProds)
      return rows
    } catch (err) {
      fastify.log.error(err, 'Error getting products from DB')
      throw err
    } finally {
      pgClient.release()
    }
  }

  async function getProductByIdAndIncrementViews (productId) {
    const pgClient = await fastify.pg.connect()
    try {
      const updateProdViews = {
        text: 'UPDATE products SET views = views + 1 WHERE id = $1 RETURNING *',
        values: [productId]
      }
      const { rows: [product] } = await pgClient.query(updateProdViews)
      fastify.log.info({ product }, 'Updated product')
      return product
    } catch (err) {
      fastify.log.error(err, 'Error getting product from DB')
      throw err
    } finally {
      pgClient.release()
    }
  }

  fastify.decorate('Product', { getProductByIdAndIncrementViews, getProducts })
}

export default fp(ProductServices, { name: 'productService', dependencies: ['env', 'pg', 'currencyAPI'] })
