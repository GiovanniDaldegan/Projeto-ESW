-- CreateTable
CREATE TABLE "Usuario" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nome" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "senha" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Projeto" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nome" TEXT NOT NULL,
    "idUsuario" INTEGER NOT NULL,
    CONSTRAINT "Projeto_idUsuario_fkey" FOREIGN KEY ("idUsuario") REFERENCES "Usuario" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Backlog" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "idProjeto" INTEGER NOT NULL,
    "nome" TEXT NOT NULL,
    "sprint" BOOLEAN NOT NULL DEFAULT false,
    "init" DATETIME,
    "finish" DATETIME,
    CONSTRAINT "Backlog_idProjeto_fkey" FOREIGN KEY ("idProjeto") REFERENCES "Projeto" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Epico" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "idProjeto" INTEGER NOT NULL,
    "nome" TEXT NOT NULL,
    CONSTRAINT "Epico_idProjeto_fkey" FOREIGN KEY ("idProjeto") REFERENCES "Projeto" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "HistoriaUsuario" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "id_epico" INTEGER,
    "id_backlog" INTEGER NOT NULL,
    "historia" TEXT NOT NULL,
    "mscw" TEXT,
    "storyPoints" REAL,
    "reach" REAL,
    "impact" REAL,
    "confidence" REAL,
    "rice" REAL,
    CONSTRAINT "HistoriaUsuario_id_epico_fkey" FOREIGN KEY ("id_epico") REFERENCES "Epico" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "HistoriaUsuario_id_backlog_fkey" FOREIGN KEY ("id_backlog") REFERENCES "Backlog" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "CriterioAceitacao" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "id_hu" INTEGER NOT NULL,
    "dado" TEXT NOT NULL,
    "quando" TEXT NOT NULL,
    "entao" TEXT NOT NULL,
    CONSTRAINT "CriterioAceitacao_id_hu_fkey" FOREIGN KEY ("id_hu") REFERENCES "HistoriaUsuario" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "Usuario_email_key" ON "Usuario"("email");
