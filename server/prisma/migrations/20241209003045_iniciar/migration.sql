-- AlterTable
ALTER TABLE "Usuario" ADD COLUMN     "postulacionesActivas" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "publicacionesActivas" INTEGER NOT NULL DEFAULT 0;
