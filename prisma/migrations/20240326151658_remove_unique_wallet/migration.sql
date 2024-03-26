-- DropIndex
DROP INDEX "idx_wallet";

-- DropIndex
DROP INDEX "users_wallet_key";

-- CreateIndex
CREATE INDEX "idx_wallet" ON "users"("email", "wallet");
