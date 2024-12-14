export const getDeviceIcon = (platform: string) => {
    switch (platform.toUpperCase()) {
      case 'PHONE':
        return 'cellphone'
      case 'TABLET':
        return 'tablet'
      case 'TV':
        return 'television'
      case 'DESKTOP':
        return 'desktop-tower-monitor'
      default:
        return 'devices'
    }
  }