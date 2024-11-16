import prisma from "../config/prismaconfig";
import { customRequest } from "../middleware/authenticate";
import { Response } from "express";

export const createReview = async (req: customRequest, res: Response) => {
    const { post_id, comment, calification } = req.body
    const { usuario_id } = req.user
    try {

        if(!post_id || !comment || !calification){
            res.json({
                error: "Missing required fields"
            })
            return
        }

        if (calification < 1 || calification > 5) {
            res.status(400).json({ error: "Invalid calification" })
            return
        }

        const newReview = await prisma.resena.create({
            data: {
                usuario_id,
                publicacion_id: post_id,
                calificacion: calification,
                comentario: comment
            }
        })

        res.status(201).json({
            message: "Review created successfully",
            review: newReview
        })
    } catch (error) {
        console.error(error)
        res.json({
            error: "Internal server error"
        })
    }
}