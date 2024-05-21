/*
  Warnings:

  - Added the required column `cardsBulkOrder_orderDate` to the `CardsBulk_Order` table without a default value. This is not possible if the table is not empty.

*/
BEGIN TRY

BEGIN TRAN;

-- AlterTable
ALTER TABLE [dbo].[CardsBulk_Order] ADD [cardsBulkOrder_orderDate] DATETIME2 NOT NULL;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
