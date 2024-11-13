import axios from "axios";
import { Platform } from "react-native";

const baseURL = Platform.OS === 'android' ? 'http://10.0.2.2:3000/api' : 'http://localhost:3000/api'

const api = axios.create({
    baseURL
})

export default api