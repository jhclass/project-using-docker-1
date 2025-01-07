-- CreateTable
CREATE TABLE "WorkBoard" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "writer" TEXT NOT NULL,
    "toTeam" TEXT,
    "toPerson" TEXT,
    "level" TEXT,
    "startDate" TIMESTAMP(3),
    "endDate" TIMESTAMP(3),
    "workStatus" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "filePath" TEXT,
    "branchId" INTEGER,
    "lastModifiedTime" TIMESTAMP(3),

    CONSTRAINT "WorkBoard_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "WorkBoard" ADD CONSTRAINT "WorkBoard_branchId_fkey" FOREIGN KEY ("branchId") REFERENCES "Branch"("id") ON DELETE CASCADE ON UPDATE CASCADE;
