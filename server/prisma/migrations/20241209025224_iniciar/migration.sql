-- AlterTable
CREATE SEQUENCE dispositivo_dispositivo_id_seq;
ALTER TABLE "Dispositivo" ALTER COLUMN "dispositivo_id" SET DEFAULT nextval('dispositivo_dispositivo_id_seq');
ALTER SEQUENCE dispositivo_dispositivo_id_seq OWNED BY "Dispositivo"."dispositivo_id";
