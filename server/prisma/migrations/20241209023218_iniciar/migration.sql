-- CreateTable
CREATE TABLE "Dispositivo" (
    "dispositivo_id" INTEGER NOT NULL,
    "usuario_id" INTEGER NOT NULL,
    "identificador_dispositivo" TEXT NOT NULL,
    "plataforma" TEXT NOT NULL,
    "fechaCreacion" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Dispositivo_pkey" PRIMARY KEY ("dispositivo_id")
);

-- AddForeignKey
ALTER TABLE "Dispositivo" ADD CONSTRAINT "Dispositivo_usuario_id_fkey" FOREIGN KEY ("usuario_id") REFERENCES "Usuario"("usuario_id") ON DELETE RESTRICT ON UPDATE CASCADE;
