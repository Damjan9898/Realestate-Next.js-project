import { NextApiRequest, NextApiResponse } from 'next'
import prisma from "@/app/libs/prismadb"

export default async function getAllPosts(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'GET') {
    
        try {
              const posts = await prisma.post.findMany();
            
              if(!posts){
                    return res.status(404).json({ message: 'No posts found' });
              }
            
                    return res.status(200).json(posts)
            
                } catch (error: any) {
                    console.error("An error occurred: ", error);
                    return res.status(500).json({ message: 'An error occurred' });
                } finally {
                    await prisma.$disconnect()
                }
    }
}