import { View, Text, Alert, TextInput, Button } from 'react-native'
import { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRegister } from '../hooks/useRegister';
import { Link } from 'expo-router';


export default function register() {

    const {handleInputChange, formValues, handleSubmit} = useRegister()

    return (
    <SafeAreaView className='flex-1 '>
        <Text>aca puede ir imagenes o algo, etc.</Text>
      <View className="flex-1 items-center bg-white p-4">
        <Text className="text-2xl font-bold mb-4">Registro</Text>
  
        <TextInput
        className="border border-gray-300 rounded p-2 mb-4 w-full"
        placeholder="Nombre completo"
        value={formValues.fullname}
        onChangeText={value => handleInputChange('fullname', value)}
      />

      <TextInput
        className="border border-gray-300 rounded p-2 mb-4 w-full"
        placeholder="Correo electrónico"
        value={formValues.email}
        onChangeText={value => handleInputChange('email', value)}
        keyboardType="email-address"
      />

      <TextInput
        className="border border-gray-300 rounded p-2 mb-4 w-full"
        placeholder="Contraseña"
        value={formValues.password}
        onChangeText={value => handleInputChange('password', value)}
        secureTextEntry
      />

      <TextInput
        className="border border-gray-300 rounded p-2 mb-4 w-full"
        placeholder="Teléfono"
        value={formValues.phone}
        onChangeText={value => handleInputChange('phone', value)}
        keyboardType="numeric"
      />
  
        <Button title="Registrarse" onPress={handleSubmit}/>
        <Link href="login">Ir a Login</Link>
      </View>
    </SafeAreaView>
    )
}