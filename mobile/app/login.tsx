import { View, Text, TextInput, Button } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useLogin } from '../hooks/useLogin'
import { Link } from 'expo-router'


const login = () => {

  const { formValues, handleSubmit, handleInputChange } = useLogin()

  return (
    <SafeAreaView className='flex-1'>
      <Text>Aca puede tener imagen o la guea k sea</Text>
      <View className="flex-1 items-center bg-white p-4">
      <TextInput
        className="border border-gray-300 rounded p-2 mb-4 w-full"
        placeholder="Correo electrónico"
        value={formValues.email}
        onChangeText={value => handleInputChange('email', value)}
        keyboardType="email-address"
      />

        <TextInput
        className="border border-gray-300 rounded p-2 mb-4 w-full"
          placeholder='Contrasenia'
          value={formValues.password}
          onChangeText={value => handleInputChange('password', value)}
        />  

      <Button title="Iniciar sesión" onPress={handleSubmit}/>
      <Link href="/register">Ir a registrarse</Link>
      <Link href="/createPost">Ir a crear post</Link>
      <Link href="/feed">Feed</Link>

      </View>
    </SafeAreaView>
  )
}

export default login