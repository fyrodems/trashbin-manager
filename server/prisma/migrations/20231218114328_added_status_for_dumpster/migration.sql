BEGIN TRY

BEGIN TRAN;

-- DropForeignKey
ALTER TABLE [dbo].[Card_Dumpsters] DROP CONSTRAINT [Card_Dumpsters_cardDumpsters_cardID_fkey];

-- DropForeignKey
ALTER TABLE [dbo].[Dumpster_Contract] DROP CONSTRAINT [Dumpster_Contract_dumpsterContract_dumpsterID_fkey];

-- DropForeignKey
ALTER TABLE [dbo].[Dumpster_Owners] DROP CONSTRAINT [Dumpster_Owners_dumpsterOwners_dumpsterID_fkey];

-- DropForeignKey
ALTER TABLE [dbo].[Dumpsters_Applications] DROP CONSTRAINT [Dumpsters_Applications_dumpstersApplications_dumpsterID_fkey];

-- AlterTable
ALTER TABLE [dbo].[Dumpster] ADD [dumpster_statusID] INT NOT NULL CONSTRAINT [Dumpster_dumpster_statusID_df] DEFAULT 27;

-- AddForeignKey
ALTER TABLE [dbo].[Dumpster] ADD CONSTRAINT [Dumpster_dumpster_statusID_fkey] FOREIGN KEY ([dumpster_statusID]) REFERENCES [dbo].[Status]([status_ID]) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[Card_Dumpsters] ADD CONSTRAINT [Card_Dumpsters_cardDumpsters_cardID_fkey] FOREIGN KEY ([cardDumpsters_cardID]) REFERENCES [dbo].[Users_Cards]([usersCards_ID]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[Dumpsters_Applications] ADD CONSTRAINT [Dumpsters_Applications_dumpstersApplications_dumpsterID_fkey] FOREIGN KEY ([dumpstersApplications_dumpsterID]) REFERENCES [dbo].[Dumpster]([dumpster_ID]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[Dumpster_Contract] ADD CONSTRAINT [Dumpster_Contract_dumpsterContract_dumpsterID_fkey] FOREIGN KEY ([dumpsterContract_dumpsterID]) REFERENCES [dbo].[Dumpster]([dumpster_ID]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[Dumpster_Owners] ADD CONSTRAINT [Dumpster_Owners_dumpsterOwners_dumpsterID_fkey] FOREIGN KEY ([dumpsterOwners_dumpsterID]) REFERENCES [dbo].[Dumpster]([dumpster_ID]) ON DELETE NO ACTION ON UPDATE NO ACTION;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
