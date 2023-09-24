/*
  Warnings:

  - You are about to drop the column `imagem_meta` on the `meta` table. All the data in the column will be lost.
  - You are about to drop the column `tipo_imagem` on the `meta` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `meta` DROP FOREIGN KEY `Meta_user_id_fkey`;

-- DropForeignKey
ALTER TABLE `token` DROP FOREIGN KEY `Token_user_email_fkey`;

-- AlterTable
ALTER TABLE `meta` DROP COLUMN `imagem_meta`,
    DROP COLUMN `tipo_imagem`;

-- CreateTable
CREATE TABLE `Historico_Meta` (
    `id` VARCHAR(191) NOT NULL,
    `meta_id` VARCHAR(191) NOT NULL,
    `valor_depositado` DOUBLE NOT NULL,
    `periodo_cumprido` TINYINT NOT NULL DEFAULT 1,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Token` ADD CONSTRAINT `Token_user_email_fkey` FOREIGN KEY (`user_email`) REFERENCES `Usuario`(`email`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Meta` ADD CONSTRAINT `Meta_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `Usuario`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Historico_Meta` ADD CONSTRAINT `Historico_Meta_meta_id_fkey` FOREIGN KEY (`meta_id`) REFERENCES `Meta`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
