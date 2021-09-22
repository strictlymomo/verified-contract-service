addEventListener("fetch", (event) => {
  event.respondWith(
    handleRequest(event.request).catch(
      (err) => new Response(err.stack, { status: 500 })
    )
  );
});

const hr = new HTMLRewriter()
  .on("strong.mr-4.mb-2.text-dark", new ElementHandler().element())  

  // https://github.com/adamschwartz/web.scraper.workers.dev
  class ElementHandler {
    element(element) {
      // An incoming element, such as `div`
      console.log(`Incoming element: ${element.tagName}`)
    }
  
    comments(comment) {
      // An incoming comment
    }
  
    text(text) {
      // An incoming piece of text
    }
  } 
async function handleRequest(req) {
  const { pathname } = new URL(req.url);
  
  if (pathname.startsWith("/api/metadata")) {
    const res = await fetch(`https://cchain.explorer.avax.network/address/${(pathname.split("/"))[3]}/contracts`)
    const dataHTML = await res.text()
    
    
    

    let json = JSON.stringify({
      hello: dataHTML
    }, null, 2)
    
    return new Response(json, {
        headers: {
          "content-type": "application/json;charset=UTF-8"
        }
      })
        
  } else {
    return fetch("https://welcome.developers.workers.dev");
  }
}