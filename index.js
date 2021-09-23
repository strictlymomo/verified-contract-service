import { ElementHandler } from './utils/ElementHandler.js'

console.log('ElementHandler', ElementHandler)

addEventListener('fetch', event => {
  console.log('event', event)

  event.respondWith(
    handleRequest(event.request).catch(
      err => new Response(err.stack, { status: 500 }),
    ),
  )
})

const hr = new HTMLRewriter().on(
  'strong.mr-4.mb-2.text-dark',
  new ElementHandler(),
)

// https://github.com/adamschwartz/web.scraper.workers.dev
async function handleRequest(req) {
  const { pathname } = new URL(req.url)

  if (pathname.startsWith('/api/metadata')) {
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

    return new Response(json, {
      headers: {
        'content-type': 'application/json;charset=UTF-8',
      },
    })
  } else {
    return fetch('https://welcome.developers.workers.dev')
  }
}
