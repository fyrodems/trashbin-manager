/*
  Warnings:

  - You are about to drop the column `personalDataApplications_firstName` on the `PersonalData_Applications` table. All the data in the column will be lost.
  - You are about to drop the column `personalDataApplications_lastName` on the `PersonalData_Applications` table. All the data in the column will be lost.
  - You are about to drop the column `users_firstName` on the `Users` table. All the data in the column will be lost.
  - You are about to drop the column `users_lastName` on the `Users` table. All the data in the column will be lost.
  - Added the required column `personalDataApplications_name` to the `PersonalData_Applications` table without a default value. This is not possible if the table is not empty.

*/
BEGIN TRY

BEGIN TRAN;

-- AlterTable
ALTER TABLE [dbo].[PersonalData_Applications] DROP COLUMN [personalDataApplications_firstName],
[personalDataApplications_lastName];
ALTER TABLE [dbo].[PersonalData_Applications] ADD [personalDataApplications_name] NVARCHAR(1000) NOT NULL;

-- AlterTable
ALTER TABLE [dbo].[Users] DROP COLUMN [users_firstName],
[users_lastName];
ALTER TABLE [dbo].[Users] ADD [users_name] NVARCHAR(1000) NOT NULL CONSTRAINT [Users_users_name_df] DEFAULT '';

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
