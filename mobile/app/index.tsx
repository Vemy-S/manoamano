import React, { useState, useRef } from 'react'
import { View, Text, Image, TouchableOpacity, Dimensions, ScrollView } from 'react-native'
import { ChevronRight } from 'lucide-react-native'
import logoImage from '../assets/Mano-a-mano.png'
import { useRouter } from 'expo-router'

const { width, height } = Dimensions.get('window')

const slides = [
  {
    id: 1,
    title: "Encuentra tu servicio ideal",
    description: "Busca y ofrece miles de servicios y encuentra lo que necesitas",
    image: logoImage
  },
  {
    id: 2,
    title: "Conecta fácilmente",
    description: "Comunícate y coordina con cualquier persona de manera sencilla",
    image: logoImage
  },
  {
    id: 3,
    title: "Comparte y recomienda",
    description: "Comparte tus experiencias y recomienda a los mejores",
    image: logoImage
  }
]

export default function GetStarted() {
  const [activeSlide, setActiveSlide] = useState(0)
  const scrollViewRef = useRef<ScrollView>(null)
  const router = useRouter()

  const handleScroll = (event: any) => {
    const slideSize = event.nativeEvent.layoutMeasurement.width
    const offset = event.nativeEvent.contentOffset.x
    const activeIndex = Math.floor(offset / slideSize)
    setActiveSlide(activeIndex)
  }

  const handleNext = () => {
    if (activeSlide < slides.length - 1) {
      scrollViewRef.current?.scrollTo({ x: width * (activeSlide + 1), animated: true })
    }
  }

  const goTo = () => {
    router.push('/login')
  }

  return (
    <View className="flex-1 bg-white">
      <ScrollView
        ref={scrollViewRef}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={handleScroll}
        scrollEventThrottle={16}
      >
        {slides.map((slide, index) => (
          <View 
            key={slide.id} 
            style={{ width, height }}
            className="flex-1 px-6"
          >
            <View className="items-center mt-16 mb-8">
              <View className="bg-[#D97706] rounded-[60px] w-72 h-72 items-center justify-center overflow-hidden">
                <Image
                  source={slide.image}
                  className="w-96 h-96"
                  resizeMode="contain"
                />
              </View>
            </View>

            <View className="mt-20">
              <Text className="text-3xl font-bold mb-4 px-4 text-indigo-500">
                {slide.title}
              </Text>
              <Text className="text-gray-500 text-lg mb-8 px-4 leading-relaxed">
                {slide.description}
              </Text>
            </View>
          </View>
        ))}
      </ScrollView>

      <View className="absolute bottom-12 left-0 right-0 px-6">
        <View className="flex-row justify-between items-center">
          <View className="flex-row space-x-2">
            {slides.map((_, idx) => (
              <View
                key={idx}
                className={`h-2 rounded-full ${
                  idx === activeSlide 
                    ? 'w-6 bg-indigo-500' 
                    : 'w-2 bg-gray-200'
                }`}
              />
            ))}
          </View>

          {activeSlide === slides.length - 1 ? (
            <TouchableOpacity 
              className="bg-indigo-500 rounded-full px-6 py-3"
              onPress={goTo}
            >
              <Text className="text-white font-semibold text-base">
                Comenzar
              </Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity 
              className="bg-indigo-500 rounded-full w-12 h-12 items-center justify-center"
              onPress={handleNext}
            >
              <ChevronRight size={24} color="white" />
            </TouchableOpacity>
          )}
        </View>
      </View>
    </View>
  )
}