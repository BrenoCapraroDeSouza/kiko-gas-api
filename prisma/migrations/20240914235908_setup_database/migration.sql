-- CreateTable
CREATE TABLE "addresses" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "idClient" TEXT,
    "idResale" TEXT,
    "state" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "neighborhood" TEXT NOT NULL,
    "publicPlace" TEXT NOT NULL,
    "number" TEXT NOT NULL,
    "ie" TEXT,
    CONSTRAINT "addresses_idClient_fkey" FOREIGN KEY ("idClient") REFERENCES "clients" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "clients" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "cpfcnpj" TEXT NOT NULL,
    "resaleId" TEXT,
    CONSTRAINT "clients_resaleId_fkey" FOREIGN KEY ("resaleId") REFERENCES "resales" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "devices" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "idClient" TEXT NOT NULL,
    "idResale" TEXT NOT NULL,
    "tare" REAL NOT NULL,
    "weight" REAL NOT NULL,
    "gas" REAL NOT NULL,
    CONSTRAINT "devices_idClient_fkey" FOREIGN KEY ("idClient") REFERENCES "clients" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "devices_idResale_fkey" FOREIGN KEY ("idResale") REFERENCES "resales" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "resales" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "cpfcnpj" TEXT NOT NULL,
    "addressId" TEXT NOT NULL,
    CONSTRAINT "resales_addressId_fkey" FOREIGN KEY ("addressId") REFERENCES "addresses" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "signals" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "idDevice" TEXT NOT NULL,
    "date" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "isFinished" BOOLEAN NOT NULL,
    CONSTRAINT "signals_idDevice_fkey" FOREIGN KEY ("idDevice") REFERENCES "devices" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "resales_addressId_key" ON "resales"("addressId");
