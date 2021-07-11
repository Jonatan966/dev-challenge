-- CreateTable
CREATE TABLE "challenges" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "iconURL" TEXT NOT NULL,
    "difficultyId" TEXT NOT NULL,

    PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "challenges" ADD FOREIGN KEY ("difficultyId") REFERENCES "difficulties"("id") ON DELETE CASCADE ON UPDATE CASCADE;
