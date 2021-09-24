export async function handleSiteRequest(request) {
  const url = new URL(request.url)

  if (url.pathname === '/' || url.pathname === '') {
    return new Response('no params')
  }

  return new Response('Not found', { status: 404 })
}
