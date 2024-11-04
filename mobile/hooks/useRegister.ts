import { useState } from "react"
import { register } from "../services/auth"

export const useRegister = () => {
  const [showPassword, setShowPassword] = useState(false)

    const [formValues, setFormValues] = useState({
      fullname: '',
      email: '',
      phone: '',
      password: ''
    })

    const handleInputChange = (field: keyof typeof formValues, value: string) => {
      setFormValues(prev => ({
        ...prev,
        [field]: field === 'email' ? value.toLowerCase() : value
      }))
    }

    const handleSubmit =  () => {
      register(formValues)
    }

    return {
        formValues,
        showPassword,
        handleInputChange,
        handleSubmit,
        setShowPassword
    }
}