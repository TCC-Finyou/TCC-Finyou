-- AlterTable
ALTER TABLE `Usuario` ADD COLUMN `bloqueado` TINYINT NOT NULL DEFAULT 0,
    MODIFY `cargo` VARCHAR(191) NOT NULL DEFAULT 'user';
