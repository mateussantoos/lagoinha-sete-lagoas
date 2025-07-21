/*
  Warnings:

  - You are about to drop the column `leaderName` on the `GC` table. All the data in the column will be lost.
  - Added the required column `date` to the `GC` table without a default value. This is not possible if the table is not empty.
  - Added the required column `time` to the `GC` table without a default value. This is not possible if the table is not empty.

*/
-- CreateTable
CREATE TABLE "GCLeader" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "gcId" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "GCLeader_gcId_fkey" FOREIGN KEY ("gcId") REFERENCES "GC" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_GC" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "image" TEXT,
    "name" TEXT NOT NULL,
    "date" DATETIME NOT NULL,
    "time" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "description" TEXT,
    "targetAudience" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
INSERT INTO "new_GC" ("address", "createdAt", "description", "id", "name", "targetAudience", "updatedAt") SELECT "address", "createdAt", "description", "id", "name", "targetAudience", "updatedAt" FROM "GC";
DROP TABLE "GC";
ALTER TABLE "new_GC" RENAME TO "GC";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
