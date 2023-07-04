import { NextApiRequest, NextApiResponse } from 'next'
import prisma from "@/app/libs/prismadb"

export default async function getAllPosts(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'GET') {
        
        // Inicijalni poziv ka postovima prilikom ucitavanja stranice
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



    } else if (req.method === 'POST') {

        //Poziv API-a kad se unesu filteri
        const { min_price, max_price, min_surface, max_surface, location, posttype  } = req.body;

        console.log(req.body)
        
        try {
            
            
            const posts = await prisma.post.findMany({
                where: {
                    AND: [
                      {
                        location: location === 'All' || location === '' ? undefined : { equals: location }
                      },
                      {
                        price: {
                            gte: min_price ? min_price : undefined,
                            lte: max_price ? max_price : undefined
                        }
                      },
                      {
                        surface: {
                            gte: min_surface ? min_surface : undefined,
                            lte: max_surface ? max_surface : undefined
                        }
                      },
                      {
                        posttype: posttype === 'Both' || posttype === '' ? undefined : posttype === 'Rent' ? 'RENT' : 'SALE'
                      }
                    ]
                  }
            });

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
    } else {
        return res.status(405).json({ message: 'Method not allowed' });
    }
}