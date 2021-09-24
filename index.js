import { handleSiteRequest } from './utils/handleSiteRequest.js'
import { handleAPIRequest } from './utils/handleAPIRequest.js'

console.log('======================================')
addEventListener('fetch', event => {
  event.respondWith(handleRequest(event))
})

async function handleRequest(event) {
  const request = event.request
  console.log('event.request      ', JSON.stringify(event.request, null, 2))
  const searchParams = new URL(event.request.url).searchParams
  console.log('searchParams', JSON.stringify(searchParams, null, 2))

  let url = searchParams.get('url')
  const id = searchParams.get('id')
  console.log('url      ', url)
  console.log('id       ', id)

  if (!url) {
    return handleSiteRequest(request)
  }

  return handleAPIRequest({ url, id })

  /*

  const cacheURL = new URL(url)
  // console.log('cacheURL           ', cacheURL)
  console.log('cacheURL STRING    ', cacheURL.toString())

  // Construct the cache key from the cache URL
  const cacheKey = new Request(cacheURL.toString(), event.request)
  const cache = caches.default

  console.log('-------------------')
  console.log('cacheKey           ', cacheKey)
  console.log('cache              ', cache)

  // Check whether the value is already available in the cache
  // if not, you will need to fetch it from origin, and store it in the cache
  // for future access
  let response = await cache.match(cacheKey)
  console.log('response cache     ', response)

  if (!response) {
    const { pathname } = cacheURL
    const res = await fetch(
      `https://cchain.explorer.avax.network/address/${
        pathname.split('/')[3]
      }/contracts`,
    )
    const dataHTML = await res.text()

    let json = JSON.stringify(
      {
        hello: dataHTML,
      },
      null,
      2,
    )

    // Must use Response constructor to inherit all of response's fields
    response = new Response(json, {
      headers: {
        'content-type': 'application/json;charset=UTF-8',
      },
    })

    console.log('response to json   ', response)

    // Cache API respects Cache-Control headers. Setting s-max-age to 10
    // will limit the response to be in cache for 10 seconds max

    // Any changes made to the response here will be reflected in the cached value
    response.headers.append('Cache-Control', 's-maxage=10')

    // Store the fetched response as cacheKey
    // Use waitUntil so you can return the response without blocking on
    // writing to cache
    event.waitUntil(cache.put(cacheKey, response.clone()))
  }
  return response
  */
}
