import prisma from "../config/prismaconfig"
import { customRequest } from "../middleware/authenticate"
import { Response } from "express"

export const createReview = async (req: customRequest, res: Response) => {
    const { comment, calification } = req.body
    const { usuario_id } = req.user
    const { id } = req.params

    try {
        const post_id = Number(id)

        if (!post_id || !comment || calification == null) {
            res.status(400).json({ error: "Missing required fields" })
            return
        }

        if (calification < 1 || calification > 5) {
            res.status(400).json({ error: "Invalid calification" })
            return
        }

        const postOwner = await prisma.publicacion.findUnique({
            where: { publicacion_id: post_id },
            select: { usuario_id: true },
        })

        if (!postOwner) {
            res.status(404).json({ error: "Post not found" })
            return
        }

        const newReview = await prisma.resena.create({
            data: {
                usuario_id,
                publicacion_id: post_id,
                calificacion: Number(calification),
                comentario: comment,
            },
        })

        res.status(201).json({
            message: "Review created successfully",
            review: newReview,
        })
    } catch (error) {
        console.error("Error creating review:", error)
        res.status(500).json({ error: "Internal server error" })
    }
}

export const getUserReviews = async (req: customRequest, res: Response) => {
    const { id } = req.params
    try {
        const user_id = Number(id)

        const posts = await prisma.publicacion.findMany({
            where: { usuario_id: Number(user_id) },
            select: { publicacion_id: true }
        })

        if (!posts || posts.length === 0) {
            res.status(404).json({ error: "No posts found for this user" })
            return 
        }

        const reviews = await prisma.resena.findMany({
            where: {
                publicacion_id: {
                    in: posts.map(post => post.publicacion_id)
                }
            },
            select: {
                calificacion: true,
                comentario: true,
                fechaCreacion: true,
                usuario: { select: { nombre_completo: true } },
                publicacion: { select: { titulo: true } }
            }
        })

        const formattedReviews = reviews.map(review => ({
            rating: review.calificacion,
            comment: review.comentario,
            userName: review.usuario.nombre_completo,
            publicationTitle: review.publicacion.titulo,
            date: review.fechaCreacion.toISOString().split('T')[0]
        }))

        res.status(200).json(formattedReviews)
    } catch (error) {
        console.error(error)
        res.status(500).json({ error: "Internal server error" })
    }
}
