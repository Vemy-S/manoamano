import { CorsOptions } from "cors";

const corsOptions: CorsOptions = {
    origin: (origin, callback) => {
        console.log(origin)
        if(origin === process.env.FRONTEND_URL){
            console.log(origin)
            callback(null, true)
        } else {
            console.log(origin)
            callback(new Error('CORS'))
        }
    },
    credentials: true
}

export default corsOptions