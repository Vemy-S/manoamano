/*
  Warnings:

  - You are about to drop the column `fechaCreacion` on the `Dispositivo` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Dispositivo" DROP COLUMN "fechaCreacion",
ADD COLUMN     "fechaInicioSesion" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;
