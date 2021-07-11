-- CreateTable
CREATE TABLE "question_orders" (
    "subscriptionId" TEXT NOT NULL,
    "questionId" TEXT NOT NULL,
    "position" INTEGER NOT NULL,
    "hasSkipped" BOOLEAN NOT NULL,
    "answerId" TEXT NOT NULL,

    PRIMARY KEY ("subscriptionId","questionId","position")
);

-- AddForeignKey
ALTER TABLE "question_orders" ADD FOREIGN KEY ("subscriptionId") REFERENCES "challenge_subscriptions"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "question_orders" ADD FOREIGN KEY ("questionId") REFERENCES "questions"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "question_orders" ADD FOREIGN KEY ("answerId") REFERENCES "answers"("id") ON DELETE CASCADE ON UPDATE CASCADE;
