import { useState } from "react"
import { register } from "../services/auth"
import { Alert } from "react-native"

export const useRegister = () => {
    const [showPassword, setShowPassword] = useState(false)
    const [error, setError] = useState('')
    const [responseMessage, setResponseMessage] = useState('')
    const [formValues, setFormValues] = useState({
      fullname: '',
      email: '',
      phone: '',
      password: ''
    })

    const handleInputChange = (field: keyof typeof formValues, value: string) => {
      setFormValues(prev => ({
        ...prev,
        [field]: field === 'fullname'
          ? value.replace(/[^a-zA-ZáéíóúÁÉÍÓÚ\s]/g, '')
          : field === 'phone'
          ? value.replace(/[^0-9]/g, '')
          : field === 'email'
          ? value.toLocaleLowerCase()
          : value 
      }))
    }

    const validateForm = () => {
      let valid = true
      let newError = ''
      const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/

      if(formValues.fullname.trim() === ''){
        valid = false
        newError = 'Ingresa tu nombre completo'
      }
  
      if (!emailRegex.test(formValues.email)) {
        valid = false
        newError = 'El email no tiene formato válido'
      }
  
      if (formValues.phone.length < 9 || formValues.phone.length > 9 ) { 
        valid = false
        newError = 'El teléfono debe contener 9 números'
      }
  
      if (formValues.password.length < 6) {
        valid = false
        newError = 'La contraseña debe tener al menos 6 caracteres'
      }
      setError(newError)
      return valid
    }

    const handleSubmit = async () => {
      let newError = ''
      if (validateForm()) {
        const response = await register(formValues)
        if (response?.data.error === 'User already exists') {
          newError = 'El correo ya fue utilizado'
          setResponseMessage(newError)
        } else {
          Alert.alert('Cuenta creada con éxito')
        }
      }
    }

    return {
        formValues,
        showPassword,
        error,
        responseMessage,
        handleInputChange,
        handleSubmit,
        setShowPassword
    }
}