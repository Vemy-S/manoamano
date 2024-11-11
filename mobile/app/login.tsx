import { View, TextInput, TouchableOpacity } from 'react-native'
import { Eye, EyeOff } from 'lucide-react-native'
import Divider from '../components/Divider'
import BackButton from '../components/BackButton'
import AuthRedirect from '../components/AuthRedirect'
import PrimaryButton from '../components/PrimaryButton'
import AuthImage from '../components/AuthImage'
import { useLogin } from '../hooks/useLogin'
import { Link } from 'expo-router'

export default function login() {
  
  const { 
    handleSubmit,
    handleInputChange,
    formValues, 
    showPassword,
    setShowPassword
  } = useLogin()



  return (
    <View className="flex-1 bg-white">

      <BackButton
        href='/'
      />

      
      <View className="px-6 pt-4">
 
        <AuthImage/>


        <View className="space-y-4 gap-3">

          <TextInput
            className="bg-gray-50 rounded-xl px-4 py-3 text-gray-900"
            placeholder="Correo electrónico"
            keyboardType="email-address"
            autoCapitalize="none"
            value={formValues.email}
            onChangeText={value => handleInputChange('email', value)}
          />

          <View className="relative">
            <TextInput
              className="bg-gray-50 rounded-xl px-4 py-3 text-gray-900 pr-12"
              placeholder="Contraseña"
              secureTextEntry={!showPassword}
              value={formValues.password}
              onChangeText={value => handleInputChange('password', value)}
            />
            <TouchableOpacity 
              className="absolute right-4 top-3"
              onPress={() => setShowPassword(!showPassword)}
            >
              {showPassword ? (
                <EyeOff size={20} color="#666" />
              ) : (
                <Eye size={20} color="#666" />
              )}
            </TouchableOpacity>
            
          </View>

        </View>

        <PrimaryButton
          handleSubmit={handleSubmit}
          text='Inicia Sesion'
          
        />

        <Divider/>

        <AuthRedirect
          message='No tienes cuenta?'
          href='/RegisterScreen'
          linkText='Registrate'
        />

        <Link href='/ModalProfile'>Probnado algo</Link>
        
      </View>
    </View>
  )
}



{/* <Link href="/register">Ir a registrarse</Link>
      <Link href="/createPost">Ir a crear post</Link>
      <Link href="/reviews">reviews</Link>
      <Link href="/Feed">Inicio</Link>
      <Link href="/CreatePostModal">Modal</Link>
      <Link href="/RegisterScreen">prueba</Link> */}