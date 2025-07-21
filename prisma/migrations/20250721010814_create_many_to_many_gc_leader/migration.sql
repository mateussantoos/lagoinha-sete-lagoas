/*
  Warnings:

  - You are about to drop the column `gcId` on the `GCLeader` table. All the data in the column will be lost.

*/
-- CreateTable
CREATE TABLE "_GCToGCLeader" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,
    CONSTRAINT "_GCToGCLeader_A_fkey" FOREIGN KEY ("A") REFERENCES "GC" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_GCToGCLeader_B_fkey" FOREIGN KEY ("B") REFERENCES "GCLeader" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

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

-- CreateIndex
CREATE UNIQUE INDEX "_GCToGCLeader_AB_unique" ON "_GCToGCLeader"("A", "B");

-- CreateIndex
CREATE INDEX "_GCToGCLeader_B_index" ON "_GCToGCLeader"("B");
