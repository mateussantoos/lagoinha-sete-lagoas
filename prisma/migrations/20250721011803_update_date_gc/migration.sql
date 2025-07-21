-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_GC" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "image" TEXT,
    "name" TEXT NOT NULL,
    "date" TEXT,
    "time" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "description" TEXT,
    "targetAudience" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
INSERT INTO "new_GC" ("address", "createdAt", "date", "description", "id", "image", "name", "targetAudience", "time", "updatedAt") SELECT "address", "createdAt", "date", "description", "id", "image", "name", "targetAudience", "time", "updatedAt" FROM "GC";
DROP TABLE "GC";
ALTER TABLE "new_GC" RENAME TO "GC";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
