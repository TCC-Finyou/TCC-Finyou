/*
  Warnings:

  - Added the required column `termos_condicoes` to the `Usuario` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Usuario` ADD COLUMN `termos_condicoes` TINYINT NOT NULL;
