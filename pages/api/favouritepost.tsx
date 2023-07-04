import prisma from "@/app/libs/prismadb"
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handle(req: NextApiRequest, res: NextApiResponse) {
  let postId:string | string[] | undefined;
  let currentUser;

  if (req.method === 'POST') {
    postId = req.body.postId;
    currentUser = req.body.currentUser;
  } else if (req.method === 'DELETE') {
    postId = req.query.postId;
    currentUser = req.query.currentUser;
  }

  if (!postId || !currentUser) {
    return res.status(400).json({ message: "Missing postId or currentUser" });
  }

  if (req.method === 'POST') {
    const updatedUser = await prisma.user.update({
      where: { id: currentUser },
      data: {
        favoriteIds: { push: postId },
      },
    });
    return res.json(updatedUser);
  } else if (req.method === 'DELETE') {
    const user = await prisma.user.findUnique({ where: { id: currentUser } });
    const updatedUser = await prisma.user.update({
      where: { id: currentUser },
      data: {
        favoriteIds: { set: user?.favoriteIds.filter((id) => id !== postId) },
      },
    });
    return res.json(updatedUser);
  } else {
    return res.status(405).json({ message: "Method not allowed" });
  }
}