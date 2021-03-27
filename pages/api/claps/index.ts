import { NextApiRequest, NextApiResponse } from 'next'

const handler = async (_req: NextApiRequest, res: NextApiResponse) => {
  try {
    const resApi = await fetch('http://localhost:3333/articles/claps', {
      headers: {
        'Content-Type': 'application/json'
      },
      method: 'GET'
    })
    console.log(resApi);
    
    const result = await resApi.json()
    res.status(200).json(result);
  
  } catch (err) {
    res.status(500).json({ statusCode: 500, message: err.message })
  }
}

export default handler
