BEGIN TRY

BEGIN TRAN;

-- DropForeignKey
ALTER TABLE [dbo].[Dumpster_Bin] DROP CONSTRAINT [Dumpster_Bin_dumpsterBin_dumpsterID_fkey];

-- DropForeignKey
ALTER TABLE [dbo].[Dumpsters_Applications] DROP CONSTRAINT [Dumpsters_Applications_dumpstersApplications_changeType_fkey];

-- DropForeignKey
ALTER TABLE [dbo].[Garbage] DROP CONSTRAINT [Garbage_garbage_dumpsterID_fkey];

-- DropForeignKey
ALTER TABLE [dbo].[Rate] DROP CONSTRAINT [Rate_rate_typeID_fkey];

-- AlterTable
ALTER TABLE [dbo].[Dumpster] ADD [dumpster_hasError] BIT NOT NULL CONSTRAINT [Dumpster_dumpster_hasError_df] DEFAULT 0,
[dumpster_ownerTypeID] INT NOT NULL CONSTRAINT [Dumpster_dumpster_ownerTypeID_df] DEFAULT 19;

-- AddForeignKey
ALTER TABLE [dbo].[Dumpster] ADD CONSTRAINT [Dumpster_dumpster_ownerTypeID_fkey] FOREIGN KEY ([dumpster_ownerTypeID]) REFERENCES [dbo].[Type]([type_ID]) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[Garbage] ADD CONSTRAINT [Garbage_garbage_dumpsterID_fkey] FOREIGN KEY ([garbage_dumpsterID]) REFERENCES [dbo].[Dumpster]([dumpster_ID]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[Dumpsters_Applications] ADD CONSTRAINT [Dumpsters_Applications_dumpstersApplications_changeType_fkey] FOREIGN KEY ([dumpstersApplications_changeType]) REFERENCES [dbo].[Type]([type_ID]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[Rate] ADD CONSTRAINT [Rate_rate_typeID_fkey] FOREIGN KEY ([rate_typeID]) REFERENCES [dbo].[Type]([type_ID]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[Dumpster_Bin] ADD CONSTRAINT [Dumpster_Bin_dumpsterBin_dumpsterID_fkey] FOREIGN KEY ([dumpsterBin_dumpsterID]) REFERENCES [dbo].[Dumpster]([dumpster_ID]) ON DELETE NO ACTION ON UPDATE NO ACTION;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
