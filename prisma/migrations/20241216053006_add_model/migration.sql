-- CreateTable
CREATE TABLE "businessReq" (
    "id" SERIAL NOT NULL,
    "companyName" TEXT NOT NULL,
    "phoneNum" TEXT NOT NULL,
    "validate" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "filePath" TEXT[],
    "agree" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "businessReq_pkey" PRIMARY KEY ("id")
);
