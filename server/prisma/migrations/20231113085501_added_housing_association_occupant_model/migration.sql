BEGIN TRY

BEGIN TRAN;

-- CreateTable
CREATE TABLE [dbo].[HousingAssociation_Occupant] (
    [housingAssociationOccupant_ID] INT NOT NULL,
    [housingAssociationOccupant_occupantID] INT NOT NULL,
    [housingAssociationOccupant_associationID] INT NOT NULL,
    CONSTRAINT [HousingAssociation_Occupant_pkey] PRIMARY KEY CLUSTERED ([housingAssociationOccupant_ID]),
    CONSTRAINT [HousingAssociation_Occupant_housingAssociationOccupant_ID_key] UNIQUE NONCLUSTERED ([housingAssociationOccupant_ID])
);

-- AddForeignKey
ALTER TABLE [dbo].[HousingAssociation_Occupant] ADD CONSTRAINT [HousingAssociation_Occupant_housingAssociationOccupant_occupantID_fkey] FOREIGN KEY ([housingAssociationOccupant_occupantID]) REFERENCES [dbo].[Users]([users_ID]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[HousingAssociation_Occupant] ADD CONSTRAINT [HousingAssociation_Occupant_housingAssociationOccupant_associationID_fkey] FOREIGN KEY ([housingAssociationOccupant_associationID]) REFERENCES [dbo].[Users]([users_ID]) ON DELETE NO ACTION ON UPDATE NO ACTION;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
