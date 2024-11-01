import { useState } from "react"
import { register } from "../services/auth"

export const useRegister = () => {

    const [formValues, setFormValues] = useState({
      fullname: '',
      email: '',
      phone: '',
      password: ''
    })

    const handleInputChange = (field: keyof typeof formValues, value: string) => {
      setFormValues(prev => ({
        ...prev,
        [field]: value
      }))
    }

    const handleSubmit =  () => {
        console.log(formValues)
        register(formValues)
    }

    return {
        handleInputChange,
        formValues,
        handleSubmit
    }
}