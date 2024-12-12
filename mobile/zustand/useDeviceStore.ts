import { create } from "zustand"
import { Device } from "../types"


type useDeviceStore = {
    userDevices: Device[],
    setUserDevices: (devices: Device[]) => void
}

export const useDeviceStore = create<useDeviceStore>((set)=> ({
    userDevices: [],
    setUserDevices: (devices) => set({ userDevices: devices })
})) 