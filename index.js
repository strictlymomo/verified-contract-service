addEventListener("fetch", (event) => {
  event.respondWith(
    handleRequest(event.request).catch(
      (err) => new Response(err.stack, { status: 500 })
    )
  );
});

function buildURL(url) {
  return `https://cchain.explorer.avax.network/address/${url}/contracts`
}

async function handleRequest(request) {
  const { pathname } = new URL(request.url);
  
  if (pathname.startsWith("/api/metadata")) {    
    const blahs = pathname.split("/")    
        
    const dataResponse = await fetch(buildURL(blahs[3]))
    const dataHTML = await dataResponse.text()
    console.log(dataHTML)

    const data = {
      hello: dataHTML
    }
  
    const json = JSON.stringify(data, null, 2)
  
    return new Response(json, {
        headers: {
          "content-type": "application/json;charset=UTF-8"
        }
      })
        
  } else {
    return fetch("https://welcome.developers.workers.dev");
  }
}