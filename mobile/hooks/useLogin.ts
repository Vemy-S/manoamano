import { useState } from "react"
import { login } from "../services/auth"

export const useLogin = () => {

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

    const handleSubmit = () => {
        login(formValues.email, formValues.password)
    }

    return {
        formValues,
        handleSubmit,
        handleInputChange
    }
}