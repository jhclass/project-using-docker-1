/*
  Warnings:

  - You are about to drop the `businessReq` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "businessReq";

-- CreateTable
CREATE TABLE "businessAccountReq" (
    "id" SERIAL NOT NULL,
    "companyName" TEXT NOT NULL,
    "phoneNum" TEXT NOT NULL,
    "validate" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "filePath" TEXT[],
    "agree" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "businessAccountReq_pkey" PRIMARY KEY ("id")
);
