import { NextApiRequest, NextApiResponse } from 'next'

//url for localhost dev
const API_URL = 'http://localhost:3333';

//url for docker
// const API_URL = 'http://172.17.0.3:3333';

const handler = async (_req: NextApiRequest, res: NextApiResponse) => {
  try {
    const resApi = await fetch(`${API_URL}/articles/claps`, {
      headers: {
        'Content-Type': 'application/json'
      },
      method: 'GET'
    })
        
    const result = await resApi.json()
    res.status(200).json(result);
  
  } catch (err) {
    res.status(500).json({ id: 1, claps: 0, user_id: 1, article_id: 1 });
  }
}

export default handler
