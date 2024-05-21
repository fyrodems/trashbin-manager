BEGIN TRY

BEGIN TRAN;

-- AlterTable
ALTER TABLE [dbo].[Users_Address] ADD [usersAddress_statusID] INT NOT NULL CONSTRAINT [Users_Address_usersAddress_statusID_df] DEFAULT 3;

-- CreateTable
CREATE TABLE [dbo].[Cards_Applications] (
    [cardsApplications_ID] INT NOT NULL,
    [cardsApplications_dateAdded] DATETIME2 NOT NULL,
    [cardsApplications_dateReviewed] DATETIME2,
    [cardsApplications_changeType] INT NOT NULL,
    [cardsApplications_reviewedBy] INT NOT NULL,
    [cardsApplications_cardID] INT NOT NULL,
    [cardsApplications_userID] INT NOT NULL,
    [cardsApplications_statusID] INT NOT NULL,
    [cardsApplications_number] NVARCHAR(1000),
    [cardsApplications_numberPIN] NVARCHAR(1000),
    CONSTRAINT [Cards_Applications_pkey] PRIMARY KEY CLUSTERED ([cardsApplications_ID]),
    CONSTRAINT [Cards_Applications_cardsApplications_ID_key] UNIQUE NONCLUSTERED ([cardsApplications_ID])
);

-- CreateTable
CREATE TABLE [dbo].[Address_Applications] (
    [addressApplications_ID] INT NOT NULL,
    [addressApplications_dateAdded] DATETIME2 NOT NULL,
    [addressApplications_dateReviewed] DATETIME2,
    [addressApplications_changeType] INT NOT NULL,
    [addressApplications_reviewedBy] INT NOT NULL,
    [addressApplications_addressID] INT NOT NULL,
    [addressApplications_userID] INT NOT NULL,
    [addressApplications_statusID] INT NOT NULL,
    [usersAddress_userID] INT NOT NULL,
    [addressApplications_street] NVARCHAR(1000) NOT NULL,
    [addressApplications_houseNumber] NVARCHAR(1000) NOT NULL,
    [addressApplications_apartamentNumber] NVARCHAR(1000),
    [addressApplications_postCode] NVARCHAR(1000) NOT NULL,
    [addressApplicationss_city] NVARCHAR(1000) NOT NULL,
    [addressApplications_typeID] INT NOT NULL,
    [addressApplications_communityID] INT NOT NULL,
    CONSTRAINT [Address_Applications_pkey] PRIMARY KEY CLUSTERED ([addressApplications_ID]),
    CONSTRAINT [Address_Applications_addressApplications_ID_key] UNIQUE NONCLUSTERED ([addressApplications_ID])
);

-- CreateTable
CREATE TABLE [dbo].[Dumpsters_Applications] (
    [dumpstersApplications_ID] INT NOT NULL,
    [dumpstersApplications_dateAdded] DATETIME2 NOT NULL,
    [dumpstersApplications_dateReviewed] DATETIME2,
    [dumpsterApplications_changeType] INT NOT NULL,
    [dumpstersApplications_reviewedBy] INT NOT NULL,
    [dumpstersApplications_userID] INT NOT NULL,
    [dumpstersApplications_dumpsterID] INT NOT NULL,
    CONSTRAINT [Dumpsters_Applications_pkey] PRIMARY KEY CLUSTERED ([dumpstersApplications_ID]),
    CONSTRAINT [Dumpsters_Applications_dumpstersApplications_ID_key] UNIQUE NONCLUSTERED ([dumpstersApplications_ID])
);

-- AddForeignKey
ALTER TABLE [dbo].[Users_Address] ADD CONSTRAINT [Users_Address_usersAddress_statusID_fkey] FOREIGN KEY ([usersAddress_statusID]) REFERENCES [dbo].[Status]([status_ID]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[Cards_Applications] ADD CONSTRAINT [Cards_Applications_cardsApplications_changeType_fkey] FOREIGN KEY ([cardsApplications_changeType]) REFERENCES [dbo].[Type]([type_ID]) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[Cards_Applications] ADD CONSTRAINT [Cards_Applications_cardsApplications_reviewedBy_fkey] FOREIGN KEY ([cardsApplications_reviewedBy]) REFERENCES [dbo].[Users]([users_ID]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[Cards_Applications] ADD CONSTRAINT [Cards_Applications_cardsApplications_cardID_fkey] FOREIGN KEY ([cardsApplications_cardID]) REFERENCES [dbo].[Users_Cards]([usersCards_ID]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[Cards_Applications] ADD CONSTRAINT [Cards_Applications_cardsApplications_userID_fkey] FOREIGN KEY ([cardsApplications_userID]) REFERENCES [dbo].[Users]([users_ID]) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[Cards_Applications] ADD CONSTRAINT [Cards_Applications_cardsApplications_statusID_fkey] FOREIGN KEY ([cardsApplications_statusID]) REFERENCES [dbo].[Status]([status_ID]) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[Address_Applications] ADD CONSTRAINT [Address_Applications_addressApplications_changeType_fkey] FOREIGN KEY ([addressApplications_changeType]) REFERENCES [dbo].[Type]([type_ID]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[Address_Applications] ADD CONSTRAINT [Address_Applications_addressApplications_reviewedBy_fkey] FOREIGN KEY ([addressApplications_reviewedBy]) REFERENCES [dbo].[Users]([users_ID]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[Address_Applications] ADD CONSTRAINT [Address_Applications_addressApplications_addressID_fkey] FOREIGN KEY ([addressApplications_addressID]) REFERENCES [dbo].[Users_Address]([usersAddress_ID]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[Address_Applications] ADD CONSTRAINT [Address_Applications_addressApplications_userID_fkey] FOREIGN KEY ([addressApplications_userID]) REFERENCES [dbo].[Users]([users_ID]) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[Address_Applications] ADD CONSTRAINT [Address_Applications_addressApplications_statusID_fkey] FOREIGN KEY ([addressApplications_statusID]) REFERENCES [dbo].[Status]([status_ID]) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[Address_Applications] ADD CONSTRAINT [Address_Applications_addressApplications_typeID_fkey] FOREIGN KEY ([addressApplications_typeID]) REFERENCES [dbo].[Type]([type_ID]) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[Address_Applications] ADD CONSTRAINT [Address_Applications_addressApplications_communityID_fkey] FOREIGN KEY ([addressApplications_communityID]) REFERENCES [dbo].[Community]([community_ID]) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[Dumpsters_Applications] ADD CONSTRAINT [Dumpsters_Applications_dumpsterApplications_changeType_fkey] FOREIGN KEY ([dumpsterApplications_changeType]) REFERENCES [dbo].[Type]([type_ID]) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[Dumpsters_Applications] ADD CONSTRAINT [Dumpsters_Applications_dumpstersApplications_reviewedBy_fkey] FOREIGN KEY ([dumpstersApplications_reviewedBy]) REFERENCES [dbo].[Users]([users_ID]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[Dumpsters_Applications] ADD CONSTRAINT [Dumpsters_Applications_dumpstersApplications_userID_fkey] FOREIGN KEY ([dumpstersApplications_userID]) REFERENCES [dbo].[Users]([users_ID]) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[Dumpsters_Applications] ADD CONSTRAINT [Dumpsters_Applications_dumpstersApplications_dumpsterID_fkey] FOREIGN KEY ([dumpstersApplications_dumpsterID]) REFERENCES [dbo].[Dumpster]([dumpster_ID]) ON DELETE NO ACTION ON UPDATE CASCADE;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
