/*
  Warnings:

  - You are about to drop the column `cardsApplications_numberPIN` on the `Cards_Applications` table. All the data in the column will be lost.
  - Added the required column `garbage_cardID` to the `Garbage` table without a default value. This is not possible if the table is not empty.

*/
BEGIN TRY

BEGIN TRAN;

-- AlterTable
ALTER TABLE [dbo].[Cards_Applications] DROP COLUMN [cardsApplications_numberPIN];

-- AlterTable
ALTER TABLE [dbo].[Garbage] ADD [garbage_cardID] INT NOT NULL;

-- AddForeignKey
ALTER TABLE [dbo].[Garbage] ADD CONSTRAINT [Garbage_garbage_cardID_fkey] FOREIGN KEY ([garbage_cardID]) REFERENCES [dbo].[Users_Cards]([usersCards_ID]) ON DELETE NO ACTION ON UPDATE NO ACTION;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
