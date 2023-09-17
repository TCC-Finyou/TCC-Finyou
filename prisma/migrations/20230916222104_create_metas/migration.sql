-- CreateTable
CREATE TABLE `Meta` (
    `id` VARCHAR(191) NOT NULL,
    `user_id` VARCHAR(191) NOT NULL,
    `imagem_meta` LONGBLOB NULL,
    `tipo_imagem` VARCHAR(191) NULL,
    `nome_meta` VARCHAR(120) NOT NULL,
    `valor_meta` DOUBLE NOT NULL,
    `valor_destinado` DOUBLE NOT NULL,
    `periodo_deposito` VARCHAR(191) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Meta` ADD CONSTRAINT `Meta_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `Usuario`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
