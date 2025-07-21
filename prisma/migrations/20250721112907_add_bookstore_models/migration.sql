-- CreateTable
CREATE TABLE "Produto" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "sku" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "price" DECIMAL NOT NULL,
    "isOnSale" BOOLEAN NOT NULL DEFAULT false,
    "discountPercentage" INTEGER,
    "stock" INTEGER NOT NULL DEFAULT 0,
    "imageSrc" TEXT,
    "isPublished" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "CategoriaProduto" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "description" TEXT
);

-- CreateTable
CREATE TABLE "Encomenda" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "customerName" TEXT NOT NULL,
    "customerPhone" TEXT NOT NULL,
    "customerEmail" TEXT,
    "status" TEXT NOT NULL DEFAULT 'PENDENTE',
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "ItemEncomenda" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "quantity" INTEGER NOT NULL DEFAULT 1,
    "encomendaId" TEXT NOT NULL,
    "produtoId" TEXT NOT NULL,
    CONSTRAINT "ItemEncomenda_encomendaId_fkey" FOREIGN KEY ("encomendaId") REFERENCES "Encomenda" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "ItemEncomenda_produtoId_fkey" FOREIGN KEY ("produtoId") REFERENCES "Produto" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "_CategoriaProdutoToProduto" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,
    CONSTRAINT "_CategoriaProdutoToProduto_A_fkey" FOREIGN KEY ("A") REFERENCES "CategoriaProduto" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_CategoriaProdutoToProduto_B_fkey" FOREIGN KEY ("B") REFERENCES "Produto" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "Produto_sku_key" ON "Produto"("sku");

-- CreateIndex
CREATE UNIQUE INDEX "CategoriaProduto_name_key" ON "CategoriaProduto"("name");

-- CreateIndex
CREATE UNIQUE INDEX "_CategoriaProdutoToProduto_AB_unique" ON "_CategoriaProdutoToProduto"("A", "B");

-- CreateIndex
CREATE INDEX "_CategoriaProdutoToProduto_B_index" ON "_CategoriaProdutoToProduto"("B");
