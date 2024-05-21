BEGIN TRY

BEGIN TRAN;

-- DropForeignKey
ALTER TABLE [dbo].[Rate] DROP CONSTRAINT [Rate_rate_dumpsterContractID_fkey];

-- AlterTable
ALTER TABLE [dbo].[Rate] ALTER COLUMN [rate_dumpsterContractID] INT NULL;
ALTER TABLE [dbo].[Rate] ADD [rate_userContractID] INT;

-- CreateTable
CREATE TABLE [dbo].[Contract_Applications] (
    [contractApplications_ID] INT NOT NULL,
    [contractApplications_dateAdded] DATETIME2 NOT NULL,
    [contractApplications_dateReviewed] DATETIME2,
    [contractApplications_changeType] INT NOT NULL,
    [contractApplications_reviewedBy] INT,
    [contractApplications_userID] INT NOT NULL,
    [contractApplications_number] NVARCHAR(1000) NOT NULL,
    [contractApplications_dateFrom] DATETIME2 NOT NULL,
    [contractApplications_dateTo] DATETIME2 NOT NULL,
    [contractApplications_statusID] INT NOT NULL,
    [contractApplications_communityID] INT NOT NULL,
    CONSTRAINT [Contract_Applications_pkey] PRIMARY KEY CLUSTERED ([contractApplications_ID]),
    CONSTRAINT [Contract_Applications_contractApplications_ID_key] UNIQUE NONCLUSTERED ([contractApplications_ID])
);

-- AddForeignKey
ALTER TABLE [dbo].[Contract_Applications] ADD CONSTRAINT [Contract_Applications_contractApplications_changeType_fkey] FOREIGN KEY ([contractApplications_changeType]) REFERENCES [dbo].[Type]([type_ID]) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[Contract_Applications] ADD CONSTRAINT [Contract_Applications_contractApplications_reviewedBy_fkey] FOREIGN KEY ([contractApplications_reviewedBy]) REFERENCES [dbo].[Users]([users_ID]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[Contract_Applications] ADD CONSTRAINT [Contract_Applications_contractApplications_userID_fkey] FOREIGN KEY ([contractApplications_userID]) REFERENCES [dbo].[Users]([users_ID]) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[Contract_Applications] ADD CONSTRAINT [Contract_Applications_contractApplications_statusID_fkey] FOREIGN KEY ([contractApplications_statusID]) REFERENCES [dbo].[Status]([status_ID]) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[Contract_Applications] ADD CONSTRAINT [Contract_Applications_contractApplications_communityID_fkey] FOREIGN KEY ([contractApplications_communityID]) REFERENCES [dbo].[Community]([community_ID]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[Rate] ADD CONSTRAINT [Rate_rate_dumpsterContractID_fkey] FOREIGN KEY ([rate_dumpsterContractID]) REFERENCES [dbo].[Dumpster_Contract]([dumpsterContract_ID]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[Rate] ADD CONSTRAINT [Rate_rate_userContractID_fkey] FOREIGN KEY ([rate_userContractID]) REFERENCES [dbo].[Users_Contract]([usersContract_ID]) ON DELETE SET NULL ON UPDATE CASCADE;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
