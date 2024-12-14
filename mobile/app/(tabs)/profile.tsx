import React, { useState } from 'react';
import { View, Text, TextInput, ScrollView, TouchableOpacity, SafeAreaView, Modal, Alert } from 'react-native';
import { ChevronRight, Settings, User2, X, MoreVertical, HandHelping, Star, Newspaper, LogOut, Smartphone } from 'lucide-react-native';
import MenuItem from '../../components/MenuItem';
import { Link, useRouter } from 'expo-router';
import { useAuthStore } from '../../zustand/useAuthStore';
import { logout } from '../../services/auth';
import { updateUser } from '../../services/user';
import { UpdateUser } from '../../types';

export default function Profile() {
  const user = useAuthStore((state) => state.user);
  const router = useRouter();

  const [modalVisible, setModalVisible] = useState(false);
  const [phone, setPhone] = useState(user.phone || '');
  const [password, setPassword] = useState('');

  const handleLogout = async () => {
    await logout();
    router.push('/login');
  };

  const handleUpdateUser = async () => {
    const updatedData: UpdateUser = {
      phone,
      password,
    };

    try {
      await updateUser(user.user_id, updatedData);
      Alert.alert('Éxito', 'Tu información ha sido actualizada.');
      setModalVisible(false);
    } catch (error) {
      Alert.alert('Error', 'No se pudo actualizar la información.');
      console.error(error);
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <ScrollView className="flex-1">
        <View className="flex-row justify-between items-center p-4">
          <Link href="/feed">
            <X color="#333" size={24} />
          </Link>
          <Text className="text-gray-900 text-xl font-bold">Perfil</Text>
          <TouchableOpacity>
            <MoreVertical color="#333" size={24} />
          </TouchableOpacity>
        </View>

        <View className="px-4 py-6">
          <View className="flex-row items-center mb-6">
            <View className="w-9 h-9 bg-purple-100 rounded-full items-center justify-center">
              <Text className="text-purple-600 font-semibold">{user.fullname[0]}</Text>
            </View>
            <View>
              <Text className="text-gray-500 text-sm">Bienvenido</Text>
              <Text className="text-gray-900 text-lg font-semibold">{user.fullname}</Text>
            </View>
          </View>

          <TouchableOpacity className="bg-[#8B5CF6] rounded-xl p-4 flex-row items-center mb-6">
            <HandHelping color="white" size={20} />
            <Text className="text-white ml-2 flex-1">Podemos ayudarte</Text>
            <ChevronRight color="white" size={20} />
          </TouchableOpacity>
        </View>

        <View className="px-4">
          <MenuItem
            icon={<User2 color="#8B5CF6" size={20} />}
            title="Cuenta"
          />
          <MenuItem
            icon={<Newspaper color="#8B5CF6" size={20} />}
            title="Mis publicaciones"
          />
          <MenuItem
            icon={<Star color="#8B5CF6" size={20} />}
            title="Favoritos"
          />

          <TouchableOpacity
            onPress={() => setModalVisible(true)}
            className="flex-row items-center py-4 border-t border-gray-200"
          >
            <Settings color="#8B5CF6" size={20} />
            <Text className="text-gray-900 ml-3 flex-1">Configuración</Text>
            <ChevronRight color="#8B5CF6" size={20} />
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => router.push('/DevicesScreen')}
            className="flex-row items-center py-4 border-t border-gray-200"
          >
            <Smartphone color="#8B5CF6" size={20} />
            <Text className="text-gray-900 ml-3 flex-1">Dispositivos conectados</Text>
            <ChevronRight color="#8B5CF6" size={20} />
          </TouchableOpacity>

          <TouchableOpacity
            onPress={handleLogout}
            className="flex-row items-center py-4 border-t border-gray-200"
          >
            <LogOut color="#8B5CF6" size={20} />
            <Text className="text-gray-900 ml-3 flex-1">Cerrar sesión</Text>
            <ChevronRight color="#8B5CF6" size={20} />
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* Modal para configuración */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View className="flex-1 justify-center bg-black bg-opacity-50 px-4">
          <View className="bg-white rounded-lg p-6">
            <Text className="text-lg font-bold mb-4">Actualizar Información</Text>

            <Text className="text-sm text-gray-600 mb-2">Teléfono</Text>
            <TextInput
              className="border border-gray-300 rounded-lg p-3 mb-4"
              placeholder="Nuevo teléfono"
              value={phone}
              onChangeText={setPhone}
            />

            <Text className="text-sm text-gray-600 mb-2">Contraseña</Text>
            <TextInput
              className="border border-gray-300 rounded-lg p-3 mb-4"
              placeholder="Nueva contraseña"
              secureTextEntry
              value={password}
              onChangeText={setPassword}
            />

            <View className="flex-row justify-end">
              <TouchableOpacity
                onPress={() => setModalVisible(false)}
                className="bg-gray-200 rounded-lg px-4 py-2 mr-2"
              >
                <Text className="text-gray-700">Cancelar</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={handleUpdateUser}
                className="bg-[#8B5CF6] rounded-lg px-4 py-2"
              >
                <Text className="text-white">Guardar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}
