/*
  Warnings:

  - You are about to drop the `Dumpster_Logs` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `User_Changer` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `User_Receiver` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Users_Logs` table. If the table is not empty, all the data it contains will be lost.

*/
BEGIN TRY

BEGIN TRAN;

-- DropForeignKey
ALTER TABLE [dbo].[Dumpster_Logs] DROP CONSTRAINT [Dumpster_Logs_dumpsterLogs_changeIDUser_fkey];

-- DropForeignKey
ALTER TABLE [dbo].[Dumpster_Logs] DROP CONSTRAINT [Dumpster_Logs_dumpsterLogs_dumpsterID_fkey];

-- DropForeignKey
ALTER TABLE [dbo].[User_Changer] DROP CONSTRAINT [User_Changer_userChanger_userID_fkey];

-- DropForeignKey
ALTER TABLE [dbo].[User_Receiver] DROP CONSTRAINT [User_Receiver_userReceiver_userID_fkey];

-- DropForeignKey
ALTER TABLE [dbo].[Users_Logs] DROP CONSTRAINT [Users_Logs_usersLogs_userChangerID_fkey];

-- DropForeignKey
ALTER TABLE [dbo].[Users_Logs] DROP CONSTRAINT [Users_Logs_usersLogs_userReceiverID_fkey];

-- DropTable
DROP TABLE [dbo].[Dumpster_Logs];

-- DropTable
DROP TABLE [dbo].[User_Changer];

-- DropTable
DROP TABLE [dbo].[User_Receiver];

-- DropTable
DROP TABLE [dbo].[Users_Logs];

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
