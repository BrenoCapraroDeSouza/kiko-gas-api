/*
  Warnings:

  - Added the required column `email` to the `resales` table without a default value. This is not possible if the table is not empty.
  - Added the required column `password` to the `resales` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_resales" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "cpfcnpj" TEXT NOT NULL,
    "addressId" TEXT NOT NULL,
    CONSTRAINT "resales_addressId_fkey" FOREIGN KEY ("addressId") REFERENCES "addresses" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_resales" ("addressId", "cpfcnpj", "id", "name", "phone") SELECT "addressId", "cpfcnpj", "id", "name", "phone" FROM "resales";
DROP TABLE "resales";
ALTER TABLE "new_resales" RENAME TO "resales";
CREATE UNIQUE INDEX "resales_addressId_key" ON "resales"("addressId");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
