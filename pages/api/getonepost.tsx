import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from "@/app/libs/prismadb"

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;

  try {
    const post = await prisma.post.findUnique({
      where: {
        id: String(id),
      },
    });

    if (!post) {
      res.status(404).json({ error: "Post not found" });
      return;
    }

    res.status(200).json(post);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "An error occurred while fetching the post" });
  }
}