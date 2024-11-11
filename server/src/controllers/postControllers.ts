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
        })
        res.status(200).json(sanitizedPosts);
    } catch (error) {
        res.status(500).json({ error: 'Error retrieving posts' })
    }
}

export const favoritePost = async (req:customRequest, res:Response) => {
    const { user_id } = req.user
    const { id } = req.params
    try {
        const post_id = Number(id)
        if(!post_id){
            res.status(400).json({
                error: "Error not post id"
            })
            return
        }
        const existingFavorite = await prisma.favorite.findUnique({
            where: { user_id_post_id: {user_id, post_id} }
        })

        if(existingFavorite){
            res.status(400).json({
                error: "Already exists post in favorites"
            })
        }

        const favorite = await prisma.favorite.create({
            data: {
                user_id,
                post_id
            }
        })
        res.json(favorite)
    } catch (error) {
        res.status(500).json({
            error: "Error favorite post"
        })
        console.error(error)
    }
}

export const postulationPost = async (req:customRequest, res:Response) => {
    const { user_id } = req.user
    const { id } = req.params
    try {
        const post_id = Number(id)

        if(!post_id){
            res.status(400).json({
                error: "Error: no post ID provided"
            })
            return
        }

        const existPostulation = await prisma.postulation.findFirst({
            where: { user_id, post_id }
        })

        if(existPostulation){
            res.status(400).json({
                error: "User has already applied to this post"
            })
            return
        }

        const post = await prisma.post.findUnique({
            where: { post_id }
        })

        if(!post){
            res.status(404).json({
                error: "Post not found"
            })
            return
        }

        const currentPostulationCount = await prisma.postulation.count({
            where: { post_id }
        })

        if(currentPostulationCount >= post.maxPostulations) {
            res.status(400).json({
                error: "Max postulations reached for this post"
            })
            return
        }

        const postulation = await prisma.postulation.create({
            data:{
                user_id,
                post_id,
            }
        })

        await prisma.post.update({
            where: { post_id },
            data: {
                postulation_count: { increment: 1 }
            }
        })

        res.status(200).json(postulation)
    } catch (error) {
        console.error(error)
        res.status(500).json({
            error: "Error applying to the post"
        })
    }
}

