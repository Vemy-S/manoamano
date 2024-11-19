export interface DraftUser {
    fullname: string
    email: string
    phone: string
    password: string
}

export interface User extends DraftUser {
    readonly user_id: number | null
    photo: string | null
    status: string
}

type PostType = "OFFER" | "REQUEST"

export interface DraftPost {
    title: string
    type: PostType
    description: string 
}

export interface Post extends DraftPost {
    readonly user_id: number
    readonly post_id: number
    status: string
    postulation_count: number
    maxPostulations: number
    tags: any[]
    createdAt: Date
    updatedAt: Date
    user: {
      readonly user_id: number
      fullname: string
      email: string
      phone: string
      role: string
      favorites: any[]
      photo: string
      status: string
    }
    reviews: any[]
    postulations: []
}

interface Review {
    review_id: number
    user_id: number
    calification: number
    comment: string
    createdAt: Date
    updatedAt: Date
}

  interface Postulation {
    postulacion_id: number
    usuario_id: number
    publicacion_id: number
    estado: string
    fechaCreacion: Date
    fechaActualizacion: Date
  }
  
export interface PostDetails {
    post_id: number
    title: string
    type: string
    description: string
    user_id: number
    status: string
    postulation_count: number
    maxPostulations: number
    tags: string[]
    createdAt: Date
    updatedAt: Date
    user: User
    review: any[]
    postulations: Postulation[]
}

  