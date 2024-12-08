import prisma from '../config/prismaconfig';
import { Response } from 'express';
import { customRequest } from '../middleware/authenticate';
import convertType from '../utils/convertType';
import { EstadoPostulacion } from '@prisma/client';

export const createPost = async (req: customRequest, res: Response) => {
    const { title, description, type } = req.body
    const { usuario_id } = req.user
    try {
        console.log(usuario_id)
        console.log(title, description, type)
        if (!title || !description || !type) {
            res.status(400).json({ error: 'Title, description, and type are required' });
            return 
        }

        const correctType = convertType(type)

        const newPost = await prisma.publicacion.create({
            data: {
                usuario_id,
                titulo: title,
                descripcion: description,
                tipo: correctType
            }
        })
    
        const postResponse = {
            post_id: newPost.publicacion_id,
            user_id: newPost.usuario_id,
            title: newPost.titulo,
            description: newPost.descripcion,
            type: newPost.tipo,
            createdAt: newPost.fechaCreacion
        }

        res.status(201).json(postResponse)
    } catch (error) {
        console.error(error)
        res.status(500).json({ error: 'Error creating post' })
    }
}

export const getPosts = async (req: customRequest, res: Response) => {
    try {
        const posts = await prisma.publicacion.findMany({
            include: {
                usuario: true,
                resenas: true,
                postulaciones: true,
            },
            orderBy: {
                fechaCreacion: 'desc'
            }
        })

        const sanitizedPosts = posts.map(post => {
            //const { contrasena, ...userWithoutPassword } = post.usuario

            return {
                post_id: post.publicacion_id,
                title: post.titulo,
                type: post.tipo,
                description: post.descripcion,
                user_id: post.usuario_id,
                status: post.estado,
                favorites: [],
                postulation_count: post.cantidad_postulaciones,
                maxPostulations: post.maximo_postulaciones,
                tags: post.etiquetas,
                createdAt: new Date(post.fechaCreacion),
                updatedAt: new Date(post.fechaActualizacion),
                user: {
                    user_id: post.usuario.usuario_id,
                    fullname: post.usuario.nombre_completo,
                    email: post.usuario.correo,
                    phone: post.usuario.telefono,
                    role: post.usuario.rol,
                    favorites: [],
                    photo: post.usuario.foto,
                    status: post.usuario.estado
                },
                reviews: post.resenas,
                postulations: post.postulaciones
            }
        })
        
        res.status(200).json(sanitizedPosts)
    } catch (error) {
        res.status(500).json({ error: 'Error retrieving posts' })
    }
}

export const postulationPost = async (req:customRequest, res:Response) => {
    const { usuario_id } = req.user
    const { id } = req.params
    try {
        const post_id = Number(id)

        if(!post_id){
            res.status(400).json({
                error: "Error: no post ID provided"
            })
            return
        }

        const existPostulation = await prisma.postulacion.findFirst({
            where: { usuario_id, publicacion_id: post_id }
        })

        if(existPostulation){
            res.status(400).json({
                error: "User has already applied to this post"
            })
            return
        }

        const post = await prisma.publicacion.findUnique({
            where: { publicacion_id: post_id }
        })

        if(!post){
            res.status(404).json({
                error: "Post not found"
            })
            return
        }

        const currentPostulationCount = await prisma.publicacion.count({
            where: { publicacion_id: post_id }
        })

        if(currentPostulationCount >= post.maximo_postulaciones) {
            res.status(400).json({
                error: "Max postulations reached for this post"
            })
            return
        }

        const postulation = await prisma.postulacion.create({
            data:{
                usuario_id,
                publicacion_id: post_id,
            }
        })

        await prisma.publicacion.update({
            where: { publicacion_id: post_id },
            data: {
                cantidad_postulaciones: { increment: 1 }
            }
        })

        res.status(200).json(postulation)
    } catch (error) {
        console.error(error)
        res.status(500).json({
            error: "Error applying to the post",
            details: error.message
          })
    }
}

export const getPostById = async (req: customRequest, res: Response) => {
    const { id } = req.params
    try {
        const post_id = Number(id)
    
        const post = await prisma.publicacion.findUnique({
            where: { publicacion_id: post_id },
            include: {
                resenas: true,
                usuario: true,
                postulaciones: true
            }
        })

        const postDetails = {
            post_id: post.publicacion_id,
            title: post.titulo,
            type: post.tipo,
            description: post.descripcion,
            user_id: post.usuario_id,
            status: post.estado,
            postulation_count: post.cantidad_postulaciones,
            maxPostulations: post.maximo_postulaciones,
            tags: post.etiquetas,
            createdAt: new Date(post.fechaCreacion),
            updatedAt: new Date(post.fechaActualizacion),  
            user: {
                user_id: post.usuario.usuario_id,
                fullname: post.usuario.nombre_completo,
                email: post.usuario.correo,
                phone: post.usuario.telefono,
                role: post.usuario.rol,
                photo: post.usuario.foto,
                status: post.usuario.estado
            },
            review: post.resenas.map((review) => ({
                review_id: review.resena_id,
                user_id: review.usuario_id,
                calification: review.calificacion,
                comment: review.comentario,
                createdAt: review.fechaCreacion,
                updatedAt: review.fechaActualizacion
            })),
            postulations: post.postulaciones
        }

        res.json(postDetails)
    } catch (error) {
        res.json({
            error: "Internal server error"
        })
        console.error(error)
        
    }
}

export const getUserPostulations = async (req: customRequest, res: Response) => {
    const { usuario_id } = req.user
    try {
        const postulations = await prisma.postulacion.findMany({
            where: { usuario_id }, 
            include: { 
                publicacion: { 
                    include: {
                        usuario: true, 
                    }
                },
                usuario: true  
            },
            orderBy: {
                publicacion: {
                    fechaCreacion: 'desc'
                }
            }
        })

       
        const postulationDetails = postulations.map(postulation => ({
            postulation_id: postulation.postulacion_id,
            user_id: postulation.usuario_id, 
            post_id: postulation.publicacion_id,
            status: postulation.estado,
            createdAt: postulation.fechaCreacion,
            updatedAt: postulation.fechaActualizacion,
            post: {  
                post_id: postulation.publicacion.publicacion_id,
                title: postulation.publicacion.titulo,
                description: postulation.publicacion.descripcion,
                type: postulation.publicacion.tipo,
                post_status: postulation.publicacion.estado,
                user_id: postulation.publicacion.usuario_id, 
                number_of_postulations: postulation.publicacion.cantidad_postulaciones,
                max_postulations: postulation.publicacion.maximo_postulaciones,
                tags: postulation.publicacion.etiquetas,
                createdAt: postulation.publicacion.fechaCreacion,
                updatedAt: postulation.publicacion.fechaActualizacion,
                user: { // Usuario que creo el post
                    user_id: postulation.publicacion.usuario.usuario_id,
                    fullname: postulation.publicacion.usuario.nombre_completo,
                    email: postulation.publicacion.usuario.correo,
                    phone: postulation.publicacion.usuario.telefono,
                    role: postulation.publicacion.usuario.rol,
                    photo: postulation.publicacion.usuario.foto,
                    status: postulation.publicacion.usuario.estado
                }
            },
            user: { // Usuario que postula
                user_id: postulation.usuario_id,
                fullname: postulation.usuario.nombre_completo,
                email: postulation.usuario.correo,
                phone: postulation.usuario.telefono,
                role: postulation.usuario.rol,
                photo: postulation.usuario.foto,
                status: postulation.usuario.estado
            }
        }))

        res.json(postulationDetails)
    } catch (error) {
        console.error(error)
        res.status(500).json({ error: "Internal server error" })
    }
}

export const removePostulation = async (req: customRequest, res: Response) => {
    const { usuario_id } = req.user
    const { id } = req.params
    try {
        const post_id = Number(id)

        if (!post_id) {
            res.status(400).json({ error: "Post ID is required" })
            return
        }

        const existPostulation = await prisma.postulacion.findFirst({
            where: { usuario_id, publicacion_id: post_id },
        });

        if (!existPostulation) {
            res.status(404).json({ error: "Postulation not found for this post" })
            return
        }

        await prisma.postulacion.delete({
            where: { postulacion_id: existPostulation.postulacion_id },
        })

        await prisma.publicacion.update({
            where: { publicacion_id: post_id },
            data: {
                cantidad_postulaciones: { decrement: 1 },
            },
        })

        res.status(200).json({ message: "Postulation removed successfully" })
    } catch (error) {
        console.error(error)
        res.status(500).json({
            error: "Error removing the postulation",
        })
    }
}
