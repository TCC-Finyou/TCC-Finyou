-- CreateTable
CREATE TABLE `Transacao` (
    `id` VARCHAR(191) NOT NULL,
    `nome_transacao` VARCHAR(191) NOT NULL,
    `valor_transacao` DOUBLE NOT NULL,
    `tag_id` VARCHAR(191) NOT NULL,
    `user_id` VARCHAR(191) NOT NULL,
    `tipo_transacao` VARCHAR(191) NOT NULL,
    `meio_transacao` VARCHAR(191) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Transacao` ADD CONSTRAINT `Transacao_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `Usuario`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Transacao` ADD CONSTRAINT `Transacao_tag_id_fkey` FOREIGN KEY (`tag_id`) REFERENCES `Tag`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
