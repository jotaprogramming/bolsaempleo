/*
  Warnings:

  - Added the required column `stf_ced` to the `staff` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `staff` ADD COLUMN `stf_ced` INTEGER NOT NULL,
    MODIFY `stf_id` INTEGER NOT NULL AUTO_INCREMENT;
