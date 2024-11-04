import prisma from '../config/prismaconfig';
import { Response } from 'express';
import { customRequest } from '../middleware/authenticate';


export const createPost = async (req: customRequest, res: Response) => {
    const { title, description, type } = req.body
    const { user_id } = req.user
    try {
        console.log(user_id)
        console.log(title, description, type)
        if (!title || !description || !type) {
            res.status(400).json({ error: 'Title, description, and type are required' });
            return 
        }

        const newPost = await prisma.post.create({
            data: {
                user_id,
                title,
                description,
                type
            },
        })    

        res.status(201).json(newPost)
    } catch (error) {
        res.status(500).json({ error: 'Error creating post' })
    }
}

export const getPosts = async (req: customRequest, res: Response) => {
    try {
        const posts = await prisma.post.findMany({
            include: {
                user: true,
                reviews: true,
                postulations: true,
            
            },
            orderBy: {
                createdAt: 'desc'
            }
        });

        const sanitizedPosts = posts.map(post => {
            const { password, ...userWithoutPassword } = post.user; 
            return {
                ...post,
                user: userWithoutPassword,
            };
        });

        res.status(200).json(sanitizedPosts);
    } catch (error) {
        res.status(500).json({ error: 'Error retrieving posts' })
    }
}