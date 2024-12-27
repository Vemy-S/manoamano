import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Image,
  TouchableOpacity,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { useAuthStore } from '../zustand/useAuthStore'
import { useNavigation } from "@react-navigation/native";

const ProfileScreen = () => {
  const user = useAuthStore((state) => state.user);
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [email, setEmail] = useState(user.email);
  const [phone, setPhone] = useState(user.phone);
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({ email: "", phone: "" });
  const [isDataModified, setIsDataModified] = useState(false); 
  const navigation = useNavigation();

  
  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      setProfileImage(result.assets[0].uri);
      setIsDataModified(true); 
    }
  };

 
  const validateEmail = (email: string): string => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email) ? "" : "El email no tiene formato válido.";
  };

  
  const validatePhone = (phone: string): string => {
    const phoneRegex = /^\d{9}$/;
    return phoneRegex.test(phone) ? "" : "El teléfono debe contener 9 dígitos.";
  };

  
  const handleEmailChange = (value: string) => {
    setEmail(value);
    const error = validateEmail(value);
    setErrors((prevErrors) => ({ ...prevErrors, email: error }));
    setIsDataModified(true); 
  };

  
  const handlePhoneChange = (value: string) => {
   
    const phoneValue = value.replace(/[^0-9]/g, ''); 
    setPhone(phoneValue);
    const error = validatePhone(phoneValue);
    setErrors((prevErrors) => ({ ...prevErrors, phone: error }));
    setIsDataModified(true);
  };

 
  const handlePasswordChange = (value: string) => {
    setPassword(value);
    setIsDataModified(true); 
  };

  
  const handleSave = () => {
    if (!errors.email && !errors.phone) {
      if (isDataModified) {
        
        setIsDataModified(false); 
      } else {
        setIsDataModified(false); 
      }
    } else {
      setIsDataModified(false);
    }
  };

 
  const handleCancel = () => {
    setProfileImage(null);
    setEmail(user.email);
    setPhone(user.phone);
    setPassword("");
    setErrors({ email: "", phone: "" });
    setIsDataModified(false); 
    navigation.goBack();
  };

  return (
    <View className="flex-1 bg-white items-center p-5">
      <Text className="text-2xl font-bold text-indigo-600 mb-5">Editar Perfil</Text>

      {}
      <TouchableOpacity onPress={pickImage} className="items-center mb-5">
        {profileImage ? (
          <Image
            source={{ uri: profileImage }}
            className="w-28 h-28 rounded-full bg-gray-300"
          />
        ) : (
          <View className="w-28 h-28 rounded-full bg-gray-200 items-center justify-center">
            <Text className="text-4xl font-bold text-indigo-600">
              {user.fullname[0].toUpperCase()}
            </Text>
          </View>
        )}
        <Text className="text-indigo-600 underline mt-2">Cambiar Foto</Text>
      </TouchableOpacity>

      {}
      <TextInput
        placeholder="Correo Electrónico"
        value={email}
        onChangeText={handleEmailChange}
        className="w-full p-3 border border-indigo-600 rounded-lg mb-5 bg-white text-black"
        placeholderTextColor="#aaa"
        keyboardType="email-address"
      />
      {errors.email ? (
        <Text className="text-red-500 text-sm mb-3">{errors.email}</Text>
      ) : null}

      <TextInput
        placeholder="Teléfono"
        value={phone}
        onChangeText={handlePhoneChange}
        className="w-full p-3 border border-indigo-600 rounded-lg mb-5 bg-white text-black"
        placeholderTextColor="#aaa"
        keyboardType="phone-pad"
      />
      {errors.phone ? (
        <Text className="text-red-500 text-sm mb-3">{errors.phone}</Text>
      ) : null}

      <TextInput
        placeholder="Contraseña"
        value={password}
        onChangeText={handlePasswordChange}
        secureTextEntry
        className="w-full p-3 border border-indigo-600 rounded-lg mb-5 bg-white text-black"
        placeholderTextColor="#aaa"
      />

      {}
      
      {}
      <View className="flex-row justify-between w-full">
        <TouchableOpacity
          onPress={handleSave}
          className="bg-indigo-700 p-4 rounded-lg w-[48%] items-center"
        >
          <Text className="text-white text-lg font-bold">Guardar</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={handleCancel}
          className="bg-gray-400 p-4 rounded-lg w-[48%] items-center"
        >
          <Text className="text-white text-lg font-bold">Cancelar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ProfileScreen;



