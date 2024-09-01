-- CreateTable
CREATE TABLE "ViewedArticle" (
    "id" SERIAL NOT NULL,
    "userUuid" TEXT NOT NULL,
    "arcticleId" INTEGER NOT NULL,

    CONSTRAINT "ViewedArticle_pkey" PRIMARY KEY ("id")
);
