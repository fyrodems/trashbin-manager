/*
  Warnings:

  - You are about to drop the column `token_creationDate` on the `Session` table. All the data in the column will be lost.
  - You are about to drop the column `token_expirationDate` on the `Session` table. All the data in the column will be lost.

*/
BEGIN TRY

BEGIN TRAN;

-- AlterTable
ALTER TABLE [dbo].[Session] DROP COLUMN [token_creationDate],
[token_expirationDate];

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
