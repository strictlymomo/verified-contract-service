import Scraper from './scraper.js'
import {
  generateJSONResponse,
  generateErrorJSONResponse,
} from './json-response.js'

// curl 'http://127.0.0.1:8787/?url=avax&id=0x1b72CFde16E5a33a36eAAFbf2eb9CDEd02B09577'
export async function handleAPIRequest({ url, id }) {
  let scraper, result

  let decoded = {
    address: id,
    name: null,
    constructorArgs: null,
    sourcecode: null,
    abi: null,
    deployedBytecode: null,
  }

  try {
    scraper = await new Scraper().fetch(
      `https://cchain.explorer.${url}.network/address/${id}/contracts`,
    )
    console.log('scraper      ', JSON.stringify(scraper, null, 2))
  } catch (error) {
    return generateErrorJSONResponse(error)
  }

  try {
    // CONTRACT NAME
    let HTMLquery = await scraper
      .querySelector('strong.mr-4.mb-2.text-dark')
      .getText(true)
    if (HTMLquery) {
      decoded.name = HTMLquery[selTitle][0]
    }

    // QUERIES
    let selQuery = '.d-flex.justify-content-between.align-items-baseline'
    let HTMLqueries = await scraper.querySelector(selQuery)
    console.log('HTMLqueries', HTMLqueries)
  } catch (error) {
    return generateErrorJSONResponse(error)
  }

  console.log('decoded', JSON.stringify(decoded, null, 2))
  return generateJSONResponse({ decoded })
}
