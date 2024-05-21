/*
  Warnings:

  - You are about to drop the column `dumpster_ownerTypeID` on the `Dumpster` table. All the data in the column will be lost.

*/
BEGIN TRY

BEGIN TRAN;

-- DropForeignKey
ALTER TABLE [dbo].[Dumpster] DROP CONSTRAINT [Dumpster_dumpster_ownerTypeID_fkey];

-- AlterTable
ALTER TABLE [dbo].[Dumpster] DROP COLUMN [dumpster_ownerTypeID];

-- CreateTable
CREATE TABLE [dbo].[Dumpster_Owners] (
    [dumpsterOwners_ID] INT NOT NULL,
    [dumpsterOwners_ownerID] INT NOT NULL,
    [dumpsterOwners_dumpsterID] INT NOT NULL,
    CONSTRAINT [Dumpster_Owners_pkey] PRIMARY KEY CLUSTERED ([dumpsterOwners_ID]),
    CONSTRAINT [Dumpster_Owners_dumpsterOwners_ID_key] UNIQUE NONCLUSTERED ([dumpsterOwners_ID])
);

-- AddForeignKey
ALTER TABLE [dbo].[Dumpster_Owners] ADD CONSTRAINT [Dumpster_Owners_dumpsterOwners_ownerID_fkey] FOREIGN KEY ([dumpsterOwners_ownerID]) REFERENCES [dbo].[Users]([users_ID]) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[Dumpster_Owners] ADD CONSTRAINT [Dumpster_Owners_dumpsterOwners_dumpsterID_fkey] FOREIGN KEY ([dumpsterOwners_dumpsterID]) REFERENCES [dbo].[Dumpster]([dumpster_ID]) ON DELETE NO ACTION ON UPDATE CASCADE;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
