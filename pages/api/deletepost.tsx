import prisma from "@/app/libs/prismadb"
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handle(req: NextApiRequest, res: NextApiResponse) {
  const postId = Array.isArray(req.query.id) ? req.query.id[0] : req.query.id;

  if (typeof postId === 'undefined') {
    res.status(400).json({ error: 'No post id provided' });
    return;
  }

  if (req.method === 'DELETE') {
    try {
      await prisma.post.delete({
        where: {
          id: postId,
        },
      });
      res.json({ success: true });
    } catch (error) {
      res.status(500).json({ error: 'Delete operation failed' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}