export interface DraftUser {
    fullname: string;
    email: string;
    phone: string;
    password: string;
}

export interface User extends DraftUser {
    readonly user_id: number | null
}

type PostType = "OFFER" | "REQUEST"

export interface DraftPost {
    title: string
    type: PostType
    description: string 
}

export interface Post extends DraftPost {
    readonly user_id: number
}

  