import { useState } from "react"
import { login } from "../services/auth"
import { useAuthStore } from "../zustand/useAuthStore"
import { useRouter } from "expo-router"

export const useLogin = () => {
    const setUser = useAuthStore(state => state.setUser)

    const router = useRouter()

    const [showPassword, setShowPassword] = useState(false)
    const [formValues, setFormValues] = useState({
        email: '',
        password: ''
    })

    const handleInputChange = (field: keyof typeof formValues, value: string) => {
        setFormValues(prev => ({
            ...prev,
            [field]: field === 'email' ? value.toLowerCase() : value
        }))
    }

    const handleSubmit = async () => {
        const result = await login(formValues.email, formValues.password)
        if(result?.status !== 200) return
        console.log('Probando el result po', result.status)
        setUser(result.data)
        router.push('/feed')
        
    }

    return {
        formValues,
        showPassword,
        handleSubmit,
        handleInputChange,
        setShowPassword
    }
}