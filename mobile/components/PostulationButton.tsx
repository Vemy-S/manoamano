import { View, Text, TouchableOpacity } from 'react-native'
import { UserPlus } from 'lucide-react-native'
import { Post } from '../types'

type PostulationButtonProps = {
    applications: number
    maxPostulations: Post['maxPostulations']
    post_id: Post['post_id']
    handlePostulation: (post_id: Post['post_id']) => void
}

export default function PostulationButton({
    applications,
    maxPostulations,
    post_id,
    handlePostulation,
    } : PostulationButtonProps) {
  return (
    <TouchableOpacity 
      onPress={()=> handlePostulation(post_id)}
      className={`flex-row items-center justify-center px-3 py-2 rounded-full ${
        applications >= maxPostulations ? 'bg-gray-200' : 'bg-purple-100'
      }`}
      disabled={applications >= maxPostulations}
    >
      <UserPlus size={16} color={applications >= maxPostulations ? '#666' : '#8B5CF6'} />
      <Text className={`ml-2 font-semibold ${
        applications >= maxPostulations ? 'text-gray-500' : 'text-purple-600'
      }`}>
        {applications >= maxPostulations ? 'Completo' : `Postular (${applications}/${maxPostulations})`}
      </Text>
    </TouchableOpacity>
  )
}