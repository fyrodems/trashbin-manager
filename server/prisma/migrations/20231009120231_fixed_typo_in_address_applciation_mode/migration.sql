/*
  Warnings:

  - You are about to drop the column `addressApplicationss_city` on the `Address_Applications` table. All the data in the column will be lost.
  - Added the required column `addressApplications_city` to the `Address_Applications` table without a default value. This is not possible if the table is not empty.

*/
BEGIN TRY

BEGIN TRAN;

-- AlterTable
ALTER TABLE [dbo].[Address_Applications] DROP COLUMN [addressApplicationss_city];
ALTER TABLE [dbo].[Address_Applications] ADD [addressApplications_city] NVARCHAR(1000) NOT NULL;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
