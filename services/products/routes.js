import fp from 'fastify-plugin'
import { AssertionError } from 'assert'

export default async function productRoutes (fastify, opts) {
  fastify.get('/products/:productId', async (request) => {
    const product = await fastify.Product.getProductByIdAndIncrementViews(request.params.productId)
    const { currency } = request.query

    if (!product) {
      throw fastify.httpErrors.notFound('Product not found')
    }
    if (!currency) {
      return { product }
    }

    try {
      const newPrice = await fastify.currency.getConversion(currency, product.price)
      return { ...product, price: newPrice }
    } catch (err) {
      if (err instanceof AssertionError) {
        return { ...product, message: `Could not convert price to ${currency}` }
      }
      throw err
    }
  })

  fastify.get('/products', async () => {
    const products = await fastify.Product.getProducts()
    return { products }
  })
}

fp(productRoutes, { dependencies: ['productService'] })
