BEGIN TRY

BEGIN TRAN;

-- CreateTable
CREATE TABLE [dbo].[PersonalData_Applications] (
    [personalDataApplications_ID] INT NOT NULL,
    [personalDataApplications_dateAdded] DATETIME2 NOT NULL,
    [personalDataApplications_dateReviewed] DATETIME2,
    [personalDataApplications_changeType] INT NOT NULL,
    [personalDataApplications_reviewedBy] INT,
    [personalDataApplications_userID] INT NOT NULL,
    [personalDataApplications_statusID] INT NOT NULL,
    [personalDataApplications_firstName] NVARCHAR(1000) NOT NULL,
    [personalDataApplications_lastName] NVARCHAR(1000) NOT NULL,
    CONSTRAINT [PersonalData_Applications_pkey] PRIMARY KEY CLUSTERED ([personalDataApplications_ID]),
    CONSTRAINT [PersonalData_Applications_personalDataApplications_ID_key] UNIQUE NONCLUSTERED ([personalDataApplications_ID])
);

-- AddForeignKey
ALTER TABLE [dbo].[PersonalData_Applications] ADD CONSTRAINT [PersonalData_Applications_personalDataApplications_changeType_fkey] FOREIGN KEY ([personalDataApplications_changeType]) REFERENCES [dbo].[Type]([type_ID]) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[PersonalData_Applications] ADD CONSTRAINT [PersonalData_Applications_personalDataApplications_reviewedBy_fkey] FOREIGN KEY ([personalDataApplications_reviewedBy]) REFERENCES [dbo].[Users]([users_ID]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[PersonalData_Applications] ADD CONSTRAINT [PersonalData_Applications_personalDataApplications_userID_fkey] FOREIGN KEY ([personalDataApplications_userID]) REFERENCES [dbo].[Users]([users_ID]) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[PersonalData_Applications] ADD CONSTRAINT [PersonalData_Applications_personalDataApplications_statusID_fkey] FOREIGN KEY ([personalDataApplications_statusID]) REFERENCES [dbo].[Status]([status_ID]) ON DELETE NO ACTION ON UPDATE CASCADE;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
