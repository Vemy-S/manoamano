import { usePostStore } from "../zustand/usePostStore"
import { useState, useEffect } from "react"

export const useFeed = () => {
    const setPost = usePostStore(state => state.setPosts)

    const [refreshing, setRefreshing] = useState(false)

    const fetchPost = () => {
        setPost()
    }

    useEffect(() => {
        fetchPost()
    }, [setPost])

    const onRefresh = () => {
        setRefreshing(true)
        fetchPost()
        setRefreshing(false)
        console.log('pasa algo o no q onda??????????? REFRESCA LOCO PORFAVOR')
    }

    return {
        refreshing,
        onRefresh,
        fetchPost,
        setRefreshing
    }
}