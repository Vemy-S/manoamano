import { useState } from "react"
import { login } from "../services/auth"
import { useAuthStore } from "../zustand/useAuthStore"
import { useRouter } from "expo-router"

export const useLogin = () => {
    const setUser = useAuthStore(state => state.setUser)

    const router = useRouter()

    const [formValues, setFormValues] = useState({
        email: '',
        password: ''
    })

    const handleInputChange = (field: keyof typeof formValues, value: string) => {
        setFormValues(prev => ({
            ...prev,
            [field]: value
        }))
    }

    const handleSubmit = async () => {
        const result = await login(formValues.email, formValues.password)
        console.log('Probando el result po', result)
        setUser(result)
        router.push('/createPost')
        
    }

    return {
        formValues,
        handleSubmit,
        handleInputChange
    }
}