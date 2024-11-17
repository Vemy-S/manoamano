export interface DraftUser {
    fullname: string
    email: string
    phone: string
    password: string
}

export interface User extends DraftUser {
    readonly user_id: number | null
    photo: string | null
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

export type PostulationDetail = {
    postulation_id: number
    user_id: number
    post_id: number
    status: string
    createdAt: string
    updatedAt: string
    post: {
      post_id: number
      title: string
      description: string
      type: string
      post_status: string
      user_id: number
      number_of_postulations: number
      max_postulations: number
      tags: string
      createdAt: string
      updatedAt: string
      user: { // Creador del post
        user_id: number
        fullname: string
        email: string
        phone: string
        role: string
        photo: string
        status: string
      }
    }
    user: { // Postulador del post
      user_id: number
      fullname: string
      email: string
      phone: string
      role: string
      photo: string
      status: string
    }
  }
  