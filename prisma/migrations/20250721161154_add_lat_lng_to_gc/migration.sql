/*
  Warnings:

  - You are about to drop the column `latitude` on the `GCLeader` table. All the data in the column will be lost.
  - You are about to drop the column `longitude` on the `GCLeader` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "GC" ADD COLUMN "latitude" REAL;
ALTER TABLE "GC" ADD COLUMN "longitude" REAL;

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_GCLeader" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
INSERT INTO "new_GCLeader" ("createdAt", "id", "name", "phone", "updatedAt") SELECT "createdAt", "id", "name", "phone", "updatedAt" FROM "GCLeader";
DROP TABLE "GCLeader";
ALTER TABLE "new_GCLeader" RENAME TO "GCLeader";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
