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
};