import { usePostStore } from "../zustand/usePostStore"
import { useState, useEffect, useCallback } from "react"
import { postulation } from "../services/posts"
import { Alert } from "react-native"
import { Post } from "../types"

export const useFeed = () => {
    const setPost = usePostStore(state => state.setPosts)
    const getUserPostulations = usePostStore(state => state.getUserPostulations)

    const [refreshing, setRefreshing] = useState(false)

    const fetchPost = useCallback(() => {
        setPost()
    }, [setPost])

    useEffect(() => {
        fetchPost()
    }, [fetchPost])

    const onRefresh = async () => {
        setRefreshing(true)
        fetchPost()
        getUserPostulations()
        setRefreshing(false)
        console.log('Refrescar')
    }

    const handlePostulation = async (post_id: Post['post_id']) => {
        try {
            const response = await postulation(post_id)
            console.log(response.data.error)
            if (response.status === 200) {
                Alert.alert('Postulación realizada')
                onRefresh()
            } else if (response.data.error === 'User has already applied to this post') {
                const errorMsg = 'Ya te has postulado en esta publicación'
                Alert.alert('Error', errorMsg)
            } else if (response.data.error === 'You already have the maximum number of publications') {
                const errorMsg = "Alcanzaste el maximo de postulaciones activas"
                Alert.alert('Error', errorMsg)
            } else {
                Alert.alert('Error', 'Ocurrió un problema inesperado. Inténtalo más tarde.')
            }
        } catch (error) {
            console.error(error)
            Alert.alert('Error', 'No se pudo completar la postulación. Inténtalo más tarde.')
        }
    };

    return {
        refreshing,
        onRefresh,
        fetchPost,
        setRefreshing,
        handlePostulation
    };
};
