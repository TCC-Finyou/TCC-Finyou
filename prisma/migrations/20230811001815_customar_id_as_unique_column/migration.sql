/*
  Warnings:

  - A unique constraint covering the columns `[customer_id]` on the table `Usuario` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `Usuario_customer_id_key` ON `Usuario`(`customer_id`);
