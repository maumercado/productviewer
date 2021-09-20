import fp from 'fastify-plugin'
import nodeFetch from 'node-fetch'
import assert from 'assert'

async function currencyAPI (fastify, opts) {
  async function getConversion (currentCurrency = 'USD', price) {
    const validCurrencies = ['USD', 'GBP', 'CAD', 'EUR']
    const currency = currentCurrency.toUpperCase()
    assert(validCurrencies.includes(currency), `Method valid currency conversion arguments are ${validCurrencies.join(', ')}`)
    if (currentCurrency === 'USD') {
      return price
    }

    const response = await nodeFetch(fastify.config.CURRENCY_API_URL)
    if (!response.ok) throw new Error(`Unexpected response ${response.statusText}`)
    const data = await response.json()


    const transformTo = `USD${currency}`

    fastify.log.info({data, transformTo}, 'updating price')

    return data.quotes[transformTo] ? (data.quotes[transformTo] * price).toFixed(2) : price
  }

  fastify.decorate('currency', { getConversion })
}

export default fp(currencyAPI, { name: 'currencyAPI', dependencies: ['env'] })
