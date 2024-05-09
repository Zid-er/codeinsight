/*
  Warnings:

  - Added the required column `gist` to the `project` table without a default value. This is not possible if the table is not empty.
  - Added the required column `tag` to the `project` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "post" ADD COLUMN     "projectId" INTEGER;

-- AlterTable
ALTER TABLE "project" ADD COLUMN     "gist" TEXT NOT NULL,
ADD COLUMN     "tag" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "post" ADD CONSTRAINT "post_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "project"("id") ON DELETE SET NULL ON UPDATE CASCADE;
