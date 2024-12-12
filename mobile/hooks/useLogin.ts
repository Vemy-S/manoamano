import { useState } from "react"
import { login } from "../services/auth"
import { useAuthStore } from "../zustand/useAuthStore"
import { useRouter } from "expo-router"

export const useLogin = () => {
    const setUser = useAuthStore(state => state.setUser)

    const router = useRouter()

    const [error, setError] = useState('')
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
        let newError = ''
        const result = await login(formValues.email, formValues.password)
        console.log(result?.data)
        if(result?.data.message === "User already logged in on another device"){
            newError = "Ya estás logeado en otro dispositivo"
            setError(newError)
            return
        }
        if(result?.status !== 200){
            newError = "Credenciales incorrectas"
            setError(newError)
        }
        if(result?.status !== 200) return
       
        setUser(result.data)
        router.push('/feed')
    }

   
    return {
        formValues,
        showPassword,
        error,
        handleSubmit,
        handleInputChange,
        setShowPassword
    }
}