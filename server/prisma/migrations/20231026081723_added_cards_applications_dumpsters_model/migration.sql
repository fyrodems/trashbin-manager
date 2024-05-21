BEGIN TRY

BEGIN TRAN;

-- CreateTable
CREATE TABLE [dbo].[CardsApplications_Dumpsters] (
    [cardsApplicationsDumpsters_ID] INT NOT NULL,
    [cardsApplications_applicationID] INT NOT NULL,
    [cardsApplications_dumpsterID] INT NOT NULL,
    CONSTRAINT [CardsApplications_Dumpsters_pkey] PRIMARY KEY CLUSTERED ([cardsApplicationsDumpsters_ID]),
    CONSTRAINT [CardsApplications_Dumpsters_cardsApplicationsDumpsters_ID_key] UNIQUE NONCLUSTERED ([cardsApplicationsDumpsters_ID])
);

-- AddForeignKey
ALTER TABLE [dbo].[CardsApplications_Dumpsters] ADD CONSTRAINT [CardsApplications_Dumpsters_cardsApplications_applicationID_fkey] FOREIGN KEY ([cardsApplications_applicationID]) REFERENCES [dbo].[Cards_Applications]([cardsApplications_ID]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[CardsApplications_Dumpsters] ADD CONSTRAINT [CardsApplications_Dumpsters_cardsApplications_dumpsterID_fkey] FOREIGN KEY ([cardsApplications_dumpsterID]) REFERENCES [dbo].[Dumpster]([dumpster_ID]) ON DELETE NO ACTION ON UPDATE CASCADE;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
