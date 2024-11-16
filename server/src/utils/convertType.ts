enum postType {
    OFERTA = "OFERTA",
    SOLICITUD = "SOLICITUD"
  }

const convertType = (type: string): postType => {
    if (type === "OFFER") {
        return postType.OFERTA
    } else if (type === "REQUEST") {
        return postType.SOLICITUD
    } else {
        throw new Error("Invalid type") 
    }
}

export default convertType