BEGIN TRY

BEGIN TRAN;

-- CreateTable
CREATE TABLE [dbo].[Dumpster_Bin] (
    [dumpsterBin_ID] INT NOT NULL,
    [dumpsterBin_dumpsterID] INT NOT NULL,
    [dumpsterBin_isFull] BIT NOT NULL CONSTRAINT [Dumpster_Bin_dumpsterBin_isFull_df] DEFAULT 0,
    [dumpsterBin_garbageType] INT NOT NULL,
    CONSTRAINT [Dumpster_Bin_pkey] PRIMARY KEY CLUSTERED ([dumpsterBin_ID]),
    CONSTRAINT [Dumpster_Bin_dumpsterBin_ID_key] UNIQUE NONCLUSTERED ([dumpsterBin_ID])
);

-- AddForeignKey
ALTER TABLE [dbo].[Dumpster_Bin] ADD CONSTRAINT [Dumpster_Bin_dumpsterBin_dumpsterID_fkey] FOREIGN KEY ([dumpsterBin_dumpsterID]) REFERENCES [dbo].[Dumpster]([dumpster_ID]) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[Dumpster_Bin] ADD CONSTRAINT [Dumpster_Bin_dumpsterBin_garbageType_fkey] FOREIGN KEY ([dumpsterBin_garbageType]) REFERENCES [dbo].[Type]([type_ID]) ON DELETE NO ACTION ON UPDATE CASCADE;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
