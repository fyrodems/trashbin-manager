BEGIN TRY

BEGIN TRAN;

-- AlterTable
ALTER TABLE [dbo].[HousingAssociation_Occupant] ADD [housingAssociationOccupant_statusID] INT NOT NULL CONSTRAINT [HousingAssociation_Occupant_housingAssociationOccupant_statusID_df] DEFAULT 1;

-- AddForeignKey
ALTER TABLE [dbo].[HousingAssociation_Occupant] ADD CONSTRAINT [HousingAssociation_Occupant_housingAssociationOccupant_statusID_fkey] FOREIGN KEY ([housingAssociationOccupant_statusID]) REFERENCES [dbo].[Status]([status_ID]) ON DELETE NO ACTION ON UPDATE CASCADE;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
