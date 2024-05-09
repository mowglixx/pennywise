export const dynamic = 'force-dynamic' // defaults to auto

export async function GET(request) {
  
  const { searchParams } = new URL(request.url)
    let query = {}
    // get key value pairs in an array and add the new kv pairs
    {[...searchParams.keys()].forEach(k => (query = {[k]: searchParams.get(k), ... query}))}

    return Response.json({message: "Welcome to my API, thank you for your query!", query})
}
