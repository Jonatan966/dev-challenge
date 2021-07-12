-- AlterTable
ALTER TABLE "question_orders" ALTER COLUMN "hasSkipped" SET DEFAULT false,
ALTER COLUMN "answerId" DROP NOT NULL;
