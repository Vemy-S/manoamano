-- CreateEnum
CREATE TYPE "Rol" AS ENUM ('USUARIO', 'ADMINISTRADOR');

-- CreateEnum
CREATE TYPE "TipoPublicacion" AS ENUM ('OFERTA', 'SOLICITUD');

-- CreateEnum
CREATE TYPE "EstadoPublicacion" AS ENUM ('ABIERTA', 'COMPLETADA');

-- CreateEnum
CREATE TYPE "EstadoUsuario" AS ENUM ('ACTIVO', 'INACTIVO', 'BANEADO');

-- CreateEnum
CREATE TYPE "EstadoPostulacion" AS ENUM ('PENDIENTE', 'ACEPTADA', 'RECHAZADA', 'EN_PROGRESO', 'COMPLETADA');

-- CreateTable
CREATE TABLE "Usuario" (
    "usuario_id" SERIAL NOT NULL,
    "nombre_completo" TEXT NOT NULL,
    "correo" TEXT NOT NULL,
    "contrasena" TEXT NOT NULL,
    "telefono" TEXT NOT NULL,
    "rol" "Rol" NOT NULL DEFAULT 'USUARIO',
    "foto" TEXT,
    "estado" "EstadoUsuario" NOT NULL DEFAULT 'ACTIVO',
    "fechaCreacion" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "fechaActualizacion" TIMESTAMP(3) NOT NULL,
    "ultimoInicio" TIMESTAMP(3),
    "publicacionesActivas" INTEGER NOT NULL DEFAULT 0,
    "postulacionesActivas" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "Usuario_pkey" PRIMARY KEY ("usuario_id")
);

-- CreateTable
CREATE TABLE "Dispositivo" (
    "dispositivo_id" SERIAL NOT NULL,
    "usuario_id" INTEGER NOT NULL,
    "identificador_dispositivo" TEXT NOT NULL,
    "plataforma" TEXT NOT NULL,
    "tipo_dispositivo" TEXT NOT NULL DEFAULT 'UNKNOWN',
    "version_dispositivo" TEXT NOT NULL DEFAULT '1.0.0',
    "fechaCreacion" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "token_dispositivo" TEXT NOT NULL DEFAULT '',

    CONSTRAINT "Dispositivo_pkey" PRIMARY KEY ("dispositivo_id")
);

-- CreateTable
CREATE TABLE "Publicacion" (
    "publicacion_id" SERIAL NOT NULL,
    "titulo" TEXT NOT NULL,
    "descripcion" TEXT NOT NULL,
    "tipo" "TipoPublicacion" NOT NULL,
    "estado" "EstadoPublicacion" NOT NULL DEFAULT 'ABIERTA',
    "usuario_id" INTEGER NOT NULL,
    "cantidad_postulaciones" INTEGER NOT NULL DEFAULT 0,
    "maximo_postulaciones" INTEGER NOT NULL DEFAULT 5,
    "etiquetas" TEXT[],
    "fechaCreacion" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "fechaActualizacion" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Publicacion_pkey" PRIMARY KEY ("publicacion_id")
);

-- CreateTable
CREATE TABLE "Favorito" (
    "favorito_id" SERIAL NOT NULL,
    "usuario_id" INTEGER NOT NULL,
    "publicacion_id" INTEGER NOT NULL,
    "fechaCreacion" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Favorito_pkey" PRIMARY KEY ("favorito_id")
);

-- CreateTable
CREATE TABLE "Resena" (
    "resena_id" SERIAL NOT NULL,
    "calificacion" INTEGER NOT NULL,
    "comentario" TEXT NOT NULL,
    "usuario_id" INTEGER NOT NULL,
    "publicacion_id" INTEGER NOT NULL,
    "fechaCreacion" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "fechaActualizacion" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Resena_pkey" PRIMARY KEY ("resena_id")
);

-- CreateTable
CREATE TABLE "Notificacion" (
    "notificacion_id" SERIAL NOT NULL,
    "usuario_id" INTEGER NOT NULL,
    "mensaje" TEXT NOT NULL,
    "publicacionId" INTEGER,
    "fechaCreacion" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "fechaActualizacion" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Notificacion_pkey" PRIMARY KEY ("notificacion_id")
);

-- CreateTable
CREATE TABLE "Postulacion" (
    "postulacion_id" SERIAL NOT NULL,
    "usuario_id" INTEGER NOT NULL,
    "publicacion_id" INTEGER NOT NULL,
    "estado" "EstadoPostulacion" NOT NULL DEFAULT 'PENDIENTE',
    "fechaCreacion" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "fechaActualizacion" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Postulacion_pkey" PRIMARY KEY ("postulacion_id")
);

-- CreateTable
CREATE TABLE "Mensaje" (
    "mensaje_id" SERIAL NOT NULL,
    "remitenteId" INTEGER NOT NULL,
    "receptorId" INTEGER NOT NULL,
    "contenido" TEXT NOT NULL,
    "fechaCreacion" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "fechaActualizacion" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Mensaje_pkey" PRIMARY KEY ("mensaje_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Usuario_correo_key" ON "Usuario"("correo");

-- CreateIndex
CREATE UNIQUE INDEX "Dispositivo_token_dispositivo_key" ON "Dispositivo"("token_dispositivo");

-- CreateIndex
CREATE UNIQUE INDEX "Favorito_usuario_id_publicacion_id_key" ON "Favorito"("usuario_id", "publicacion_id");

-- AddForeignKey
ALTER TABLE "Dispositivo" ADD CONSTRAINT "Dispositivo_usuario_id_fkey" FOREIGN KEY ("usuario_id") REFERENCES "Usuario"("usuario_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Publicacion" ADD CONSTRAINT "Publicacion_usuario_id_fkey" FOREIGN KEY ("usuario_id") REFERENCES "Usuario"("usuario_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Favorito" ADD CONSTRAINT "Favorito_usuario_id_fkey" FOREIGN KEY ("usuario_id") REFERENCES "Usuario"("usuario_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Favorito" ADD CONSTRAINT "Favorito_publicacion_id_fkey" FOREIGN KEY ("publicacion_id") REFERENCES "Publicacion"("publicacion_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Resena" ADD CONSTRAINT "Resena_usuario_id_fkey" FOREIGN KEY ("usuario_id") REFERENCES "Usuario"("usuario_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Resena" ADD CONSTRAINT "Resena_publicacion_id_fkey" FOREIGN KEY ("publicacion_id") REFERENCES "Publicacion"("publicacion_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Notificacion" ADD CONSTRAINT "Notificacion_usuario_id_fkey" FOREIGN KEY ("usuario_id") REFERENCES "Usuario"("usuario_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Postulacion" ADD CONSTRAINT "Postulacion_usuario_id_fkey" FOREIGN KEY ("usuario_id") REFERENCES "Usuario"("usuario_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Postulacion" ADD CONSTRAINT "Postulacion_publicacion_id_fkey" FOREIGN KEY ("publicacion_id") REFERENCES "Publicacion"("publicacion_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Mensaje" ADD CONSTRAINT "Mensaje_remitenteId_fkey" FOREIGN KEY ("remitenteId") REFERENCES "Usuario"("usuario_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Mensaje" ADD CONSTRAINT "Mensaje_receptorId_fkey" FOREIGN KEY ("receptorId") REFERENCES "Usuario"("usuario_id") ON DELETE RESTRICT ON UPDATE CASCADE;
