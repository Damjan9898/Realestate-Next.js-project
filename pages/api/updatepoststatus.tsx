import prisma from "@/app/libs/prismadb"
import { NextApiRequest, NextApiResponse } from 'next';


export default async function handle(req: NextApiRequest, res: NextApiResponse) {
  const { id, status } = req.body;

  if (req.method === 'PUT') {
    try {
      const post = await prisma.post.update({
        where: {
          id: id,
        },
        data: {
          status: status,
        },
      });
      res.json(post);
    } catch (error) {
      res.status(500).json({ error: 'Update operation failed' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}