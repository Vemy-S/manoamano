import { View, Text, TextInput, TouchableOpacity, Image } from 'react-native'
import { Eye, EyeOff } from 'lucide-react-native'
import Divider from '../components/Divider'
import { useRegister } from '../hooks/useRegister'
import BackButton from '../components/BackButton'
import AuthRedirect from '../components/AuthRedirect'
import PrimaryButton from '../components/PrimaryButton'
import AuthImage from '../components/AuthImage'

export default function RegistrationScreen() {
  
  const { 
    handleSubmit,
    handleInputChange,
    formValues, 
    showPassword,
    setShowPassword
  } = useRegister()



  return (
    <View className="flex-1 bg-white">
      
      <BackButton
        href='/login'
      />
    
      <View className="px-6 pt-4">

        <Text className='text-center text-4xl tracking-[4px] text-amber-900'>Mano a Mano</Text>
        
        <AuthImage/>

        <View className="space-y-4 gap-3">
          <TextInput
            className="bg-gray-50 rounded-xl px-4 py-3 text-gray-900"
            placeholder="Nombre completo"
            value={formValues.fullname}
            onChangeText={(value) => handleInputChange('fullname', value)}
          />

          <TextInput
            className="bg-gray-50 rounded-xl px-4 py-3 text-gray-900"
            placeholder="Correo electrónico"
            keyboardType="email-address"
            autoCapitalize="none"
            value={formValues.email}
            onChangeText={value => handleInputChange('email', value)}
          />

     

          <TextInput
            className="bg-gray-50 rounded-xl px-4 py-3 text-gray-900"
            placeholder="Teléfono"
            keyboardType="phone-pad"
            value={formValues.phone}
            onChangeText={(value) => handleInputChange('phone', value) }
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
          text='Registrarse'
        />

        <Divider/>

        <AuthRedirect
          message='Ya tienes cuenta?'
          href='/login'
          linkText='Inicia sesion'
        />      
      
      </View>
    </View>
  )
}