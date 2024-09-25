/*
  Warnings:

  - You are about to drop the column `email` on the `resales` table. All the data in the column will be lost.
  - You are about to drop the column `password` on the `resales` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[idClient]` on the table `addresses` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[idResale]` on the table `addresses` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `userId` to the `clients` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `resales` table without a default value. This is not possible if the table is not empty.

*/
-- CreateTable
CREATE TABLE "users" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "userType" TEXT NOT NULL
);

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_clients" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "resaleId" TEXT,
    "userId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "cpfcnpj" TEXT NOT NULL,
    CONSTRAINT "clients_resaleId_fkey" FOREIGN KEY ("resaleId") REFERENCES "resales" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "clients_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_clients" ("cpfcnpj", "id", "name", "phone", "resaleId") SELECT "cpfcnpj", "id", "name", "phone", "resaleId" FROM "clients";
DROP TABLE "clients";
ALTER TABLE "new_clients" RENAME TO "clients";
CREATE UNIQUE INDEX "clients_resaleId_key" ON "clients"("resaleId");
CREATE UNIQUE INDEX "clients_userId_key" ON "clients"("userId");
CREATE TABLE "new_resales" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT NOT NULL,
    "addressId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "cpfcnpj" TEXT NOT NULL,
    CONSTRAINT "resales_addressId_fkey" FOREIGN KEY ("addressId") REFERENCES "addresses" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "resales_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_resales" ("addressId", "cpfcnpj", "id", "name", "phone") SELECT "addressId", "cpfcnpj", "id", "name", "phone" FROM "resales";
DROP TABLE "resales";
ALTER TABLE "new_resales" RENAME TO "resales";
CREATE UNIQUE INDEX "resales_userId_key" ON "resales"("userId");
CREATE UNIQUE INDEX "resales_addressId_key" ON "resales"("addressId");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "addresses_idClient_key" ON "addresses"("idClient");

-- CreateIndex
CREATE UNIQUE INDEX "addresses_idResale_key" ON "addresses"("idResale");
