interface JwtPayload {
    user_id: number
    role: string
    email: string
    createdAt: Date
}

interface User {
    user_id: number
    fullname: string
    email: string
    password: string
    phone?: number
    role: string
    createdAt: Date
}

interface UserWithPost extends User {
    
}




