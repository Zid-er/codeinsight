-- CreateTable
CREATE TABLE "image" (
    "id" SERIAL NOT NULL,
    "url" TEXT NOT NULL,
    "order" INTEGER,
    "postId" INTEGER,

    CONSTRAINT "image_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "image" ADD CONSTRAINT "image_postId_fkey" FOREIGN KEY ("postId") REFERENCES "post"("id") ON DELETE SET NULL ON UPDATE CASCADE;
