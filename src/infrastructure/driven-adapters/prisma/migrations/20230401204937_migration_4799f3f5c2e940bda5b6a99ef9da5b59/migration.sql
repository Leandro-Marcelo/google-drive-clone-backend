/*
  Warnings:

  - You are about to alter the column `name` on the `User` table. The data in that column could be lost. The data in that column will be cast from `VarChar(120)` to `VarChar(100)`.

*/
-- AlterTable
ALTER TABLE `User` MODIFY `name` VARCHAR(100) NOT NULL;
