-- AlterTable
ALTER TABLE "Dispositivo" ADD COLUMN     "tipo_dispositivo" TEXT NOT NULL DEFAULT 'UNKNOWN',
ADD COLUMN     "version_dispositivo" TEXT NOT NULL DEFAULT '1.0.0';
