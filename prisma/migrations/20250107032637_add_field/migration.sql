/*
  Warnings:

  - Added the required column `detail` to the `WorkBoard` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "WorkBoard" ADD COLUMN     "detail" TEXT NOT NULL;
