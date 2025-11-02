-- CreateTable
CREATE TABLE "Display" (
    "id" SERIAL NOT NULL,
    "currentAlbumId" INTEGER,
    "currentImageId" INTEGER,

    CONSTRAINT "Display_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Display" ADD CONSTRAINT "Display_currentAlbumId_fkey" FOREIGN KEY ("currentAlbumId") REFERENCES "Album"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Display" ADD CONSTRAINT "Display_currentImageId_fkey" FOREIGN KEY ("currentImageId") REFERENCES "Image"("id") ON DELETE SET NULL ON UPDATE CASCADE;
