import prisma from "@/app/libs/prismadb"
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handle(req: NextApiRequest, res: NextApiResponse) {
  const userId = req.query.userId;

  if (req.method === 'GET') {
    if (Array.isArray(userId) || !userId) {
      return res.status(400).json({ message: "Invalid userId" });
    }

    const user = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.json(user);
  } else {
    return res.status(405).json({ message: "Method not allowed" });
  }
}