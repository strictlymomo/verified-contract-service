import contentTypes from './content-types.js'

const formatJSON = obj => JSON.stringify(obj, null, 2)

const generateJSONResponse = obj => {
  return new Response(formatJSON(obj), {
    headers: {
      'content-type': contentTypes.json,
      'Access-Control-Allow-Origin': '*',
    },
  })
}

const generateErrorJSONResponse = error => {
  return generateJSONResponse(
    {
      error: typeof error === 'string' ? error : error.message,
    },
    true,
  )
}

export { generateJSONResponse, generateErrorJSONResponse }
