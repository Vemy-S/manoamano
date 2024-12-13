const convertDevice = (device_type: number) => {
    let device_name = ''
    switch(device_type){
        case 0:
            device_name = 'UNKNOWN'
            break
        case 1:
            device_name = 'PHONE'
            break
        case 2:
            device_name = 'TABLET'
            break
        case 3:
            device_name = 'DESKTOP'
            break
        case 4:
            device_name = 'TV'
            break
        default:
            device_name = 'UNKNOWN'
            break
    }
    return device_name
}

export default convertDevice