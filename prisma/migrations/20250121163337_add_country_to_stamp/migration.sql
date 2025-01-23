-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Stamp" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "yearIssued" INTEGER NOT NULL,
    "user" TEXT NOT NULL,
    "image" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "country" TEXT NOT NULL DEFAULT 'Unknown',
    "collectionId" INTEGER,
    CONSTRAINT "Stamp_collectionId_fkey" FOREIGN KEY ("collectionId") REFERENCES "Collection" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Stamp" ("collectionId", "createdAt", "description", "id", "image", "name", "user", "yearIssued") SELECT "collectionId", "createdAt", "description", "id", "image", "name", "user", "yearIssued" FROM "Stamp";
DROP TABLE "Stamp";
ALTER TABLE "new_Stamp" RENAME TO "Stamp";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
