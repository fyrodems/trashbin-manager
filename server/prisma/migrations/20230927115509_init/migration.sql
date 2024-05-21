BEGIN TRY

BEGIN TRAN;

-- CreateTable
CREATE TABLE [dbo].[Users] (
    [users_ID] INT NOT NULL,
    [users_login] NVARCHAR(1000) NOT NULL,
    [users_password] NVARCHAR(1000) NOT NULL,
    [users_firstName] NVARCHAR(1000) NOT NULL,
    [users_lastName] NVARCHAR(1000) NOT NULL,
    [users_typeID] INT NOT NULL CONSTRAINT [Users_users_typeID_df] DEFAULT 4,
    [users_statusID] INT NOT NULL CONSTRAINT [Users_users_statusID_df] DEFAULT 3,
    [users_identificationNumber] NVARCHAR(1000) NOT NULL,
    [users_phoneNumber] NVARCHAR(1000) NOT NULL,
    [users_communityID] INT,
    CONSTRAINT [Users_pkey] PRIMARY KEY CLUSTERED ([users_ID]),
    CONSTRAINT [Users_users_ID_key] UNIQUE NONCLUSTERED ([users_ID]),
    CONSTRAINT [Users_users_login_key] UNIQUE NONCLUSTERED ([users_login]),
    CONSTRAINT [Users_users_identificationNumber_key] UNIQUE NONCLUSTERED ([users_identificationNumber])
);

-- CreateTable
CREATE TABLE [dbo].[Session] (
    [id] NVARCHAR(1000) NOT NULL,
    [userId] INT NOT NULL,
    CONSTRAINT [Session_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [dbo].[Users_Address] (
    [usersAddress_ID] INT NOT NULL,
    [usersAddress_userID] INT NOT NULL,
    [usersAddress_street] NVARCHAR(1000) NOT NULL,
    [usersAddress_houseNumber] NVARCHAR(1000) NOT NULL,
    [usersAddress_apartamentNumber] NVARCHAR(1000),
    [usersAddress_postCode] NVARCHAR(1000) NOT NULL,
    [usersAddress_city] NVARCHAR(1000) NOT NULL,
    [usersAddress_typeID] INT NOT NULL,
    [usersAddress_communityID] INT NOT NULL,
    CONSTRAINT [Users_Address_pkey] PRIMARY KEY CLUSTERED ([usersAddress_ID]),
    CONSTRAINT [Users_Address_usersAddress_ID_key] UNIQUE NONCLUSTERED ([usersAddress_ID])
);

-- CreateTable
CREATE TABLE [dbo].[Users_Cards] (
    [usersCards_ID] INT NOT NULL,
    [usersCards_userID] INT NOT NULL,
    [usersCards_statusID] INT NOT NULL,
    [usersCards_number] NVARCHAR(1000) NOT NULL,
    [usersCards_numberPIN] NVARCHAR(1000),
    CONSTRAINT [Users_Cards_pkey] PRIMARY KEY CLUSTERED ([usersCards_ID]),
    CONSTRAINT [Users_Cards_usersCards_ID_key] UNIQUE NONCLUSTERED ([usersCards_ID])
);

-- CreateTable
CREATE TABLE [dbo].[Users_Contract] (
    [usersContract_ID] INT NOT NULL,
    [usersContract_usersID] INT NOT NULL,
    [usersContract_number] NVARCHAR(1000) NOT NULL,
    [usersContract_dateFrom] DATETIME2 NOT NULL,
    [usersContract_dateTo] DATETIME2 NOT NULL,
    [usersContract_statusID] INT NOT NULL,
    [usersContract_communityID] INT NOT NULL,
    CONSTRAINT [Users_Contract_pkey] PRIMARY KEY CLUSTERED ([usersContract_ID]),
    CONSTRAINT [Users_Contract_usersContract_ID_key] UNIQUE NONCLUSTERED ([usersContract_ID])
);

-- CreateTable
CREATE TABLE [dbo].[Users_Logs] (
    [usersLogs_ID] INT NOT NULL,
    [usersLogs_userChangerID] INT NOT NULL,
    [usersLogs_userReceiverID] INT NOT NULL,
    [usersLogs_changeDate] DATETIME2 NOT NULL,
    [usersLogs_changeSQL] NVARCHAR(1000) NOT NULL,
    CONSTRAINT [Users_Logs_pkey] PRIMARY KEY CLUSTERED ([usersLogs_ID]),
    CONSTRAINT [Users_Logs_usersLogs_ID_key] UNIQUE NONCLUSTERED ([usersLogs_ID])
);

-- CreateTable
CREATE TABLE [dbo].[User_Changer] (
    [userChanger_ID] INT NOT NULL,
    [userChanger_userID] INT NOT NULL,
    CONSTRAINT [User_Changer_pkey] PRIMARY KEY CLUSTERED ([userChanger_ID]),
    CONSTRAINT [User_Changer_userChanger_ID_key] UNIQUE NONCLUSTERED ([userChanger_ID])
);

-- CreateTable
CREATE TABLE [dbo].[User_Receiver] (
    [userReceiver_ID] INT NOT NULL,
    [userReceiver_userID] INT NOT NULL,
    CONSTRAINT [User_Receiver_pkey] PRIMARY KEY CLUSTERED ([userReceiver_ID]),
    CONSTRAINT [User_Receiver_userReceiver_ID_key] UNIQUE NONCLUSTERED ([userReceiver_ID])
);

-- CreateTable
CREATE TABLE [dbo].[Dumpster] (
    [dumpster_ID] INT NOT NULL,
    [dumpster_name] NVARCHAR(1000) NOT NULL,
    [dumpster_description] NVARCHAR(1000),
    [dumpster_street] NVARCHAR(1000) NOT NULL,
    [dumpster_city] NVARCHAR(1000) NOT NULL,
    [dumpster_postCode] NVARCHAR(1000) NOT NULL,
    [dumpster_communityID] INT NOT NULL,
    [dumpster_houseNumbers] NVARCHAR(1000) NOT NULL,
    CONSTRAINT [Dumpster_pkey] PRIMARY KEY CLUSTERED ([dumpster_ID]),
    CONSTRAINT [Dumpster_dumpster_ID_key] UNIQUE NONCLUSTERED ([dumpster_ID]),
    CONSTRAINT [Dumpster_dumpster_name_key] UNIQUE NONCLUSTERED ([dumpster_name])
);

-- CreateTable
CREATE TABLE [dbo].[Dumpster_Logs] (
    [dumpsterLogs_ID] INT NOT NULL,
    [dumpsterLogs_dumpsterID] INT NOT NULL,
    [dumpsterLogs_changeIDUser] INT NOT NULL,
    [dumpsterLogs_changeDate] DATETIME2 NOT NULL,
    [dumpsterLogs_changeSQL] NVARCHAR(1000) NOT NULL,
    CONSTRAINT [Dumpster_Logs_pkey] PRIMARY KEY CLUSTERED ([dumpsterLogs_ID]),
    CONSTRAINT [Dumpster_Logs_dumpsterLogs_ID_key] UNIQUE NONCLUSTERED ([dumpsterLogs_ID])
);

-- CreateTable
CREATE TABLE [dbo].[Garbage] (
    [garbage_ID] INT NOT NULL,
    [garbage_usersID] INT NOT NULL,
    [garbage_dumpsterID] INT NOT NULL,
    [garbage_typeID] INT NOT NULL,
    [garbage_weight] FLOAT(53) NOT NULL,
    [garbage_date] DATETIME2 NOT NULL,
    CONSTRAINT [Garbage_pkey] PRIMARY KEY CLUSTERED ([garbage_ID]),
    CONSTRAINT [Garbage_garbage_ID_key] UNIQUE NONCLUSTERED ([garbage_ID])
);

-- CreateTable
CREATE TABLE [dbo].[Rate] (
    [rate_ID] INT NOT NULL,
    [rate_usersID] INT NOT NULL,
    [rate_typeGarbageID] INT NOT NULL,
    [rate_usersContractID] INT NOT NULL,
    [rate_dateFrom] DATETIME2 NOT NULL,
    [rate_dateTo] DATETIME2 NOT NULL,
    [rate_value] FLOAT(53) NOT NULL,
    CONSTRAINT [Rate_pkey] PRIMARY KEY CLUSTERED ([rate_ID]),
    CONSTRAINT [Rate_rate_ID_key] UNIQUE NONCLUSTERED ([rate_ID])
);

-- CreateTable
CREATE TABLE [dbo].[Rate_Logs] (
    [rateLogs_ID] INT NOT NULL,
    [rateLogs_rateID] INT NOT NULL,
    [rateLogs_changeIDUser] INT NOT NULL,
    [rateLogs_changeDate] DATETIME2 NOT NULL,
    [rateLogs_changeSQL] NVARCHAR(1000) NOT NULL,
    CONSTRAINT [Rate_Logs_pkey] PRIMARY KEY CLUSTERED ([rateLogs_ID]),
    CONSTRAINT [Rate_Logs_rateLogs_ID_key] UNIQUE NONCLUSTERED ([rateLogs_ID])
);

-- CreateTable
CREATE TABLE [dbo].[Type] (
    [type_ID] INT NOT NULL,
    [type_name] NVARCHAR(1000) NOT NULL,
    [type_description] NVARCHAR(1000),
    [type_type] NVARCHAR(1000) NOT NULL,
    CONSTRAINT [Type_pkey] PRIMARY KEY CLUSTERED ([type_ID]),
    CONSTRAINT [Type_type_ID_key] UNIQUE NONCLUSTERED ([type_ID])
);

-- CreateTable
CREATE TABLE [dbo].[Status] (
    [status_ID] INT NOT NULL,
    [status_name] NVARCHAR(1000) NOT NULL,
    [status_description] NVARCHAR(1000),
    [status_type] NVARCHAR(1000) NOT NULL,
    CONSTRAINT [Status_pkey] PRIMARY KEY CLUSTERED ([status_ID]),
    CONSTRAINT [Status_status_ID_key] UNIQUE NONCLUSTERED ([status_ID])
);

-- CreateTable
CREATE TABLE [dbo].[Community] (
    [community_ID] INT NOT NULL,
    [community_name] NVARCHAR(1000) NOT NULL,
    [community_description] NVARCHAR(1000) NOT NULL,
    [community_municipalityID] INT NOT NULL,
    [community_voivodeshipID] INT NOT NULL,
    CONSTRAINT [Community_pkey] PRIMARY KEY CLUSTERED ([community_ID]),
    CONSTRAINT [Community_community_ID_key] UNIQUE NONCLUSTERED ([community_ID])
);

-- CreateTable
CREATE TABLE [dbo].[Municipality] (
    [municipality_ID] INT NOT NULL,
    [municipality_name] NVARCHAR(1000) NOT NULL,
    [municipality_description] NVARCHAR(1000) NOT NULL,
    [municipality_voivodeshipID] INT NOT NULL,
    CONSTRAINT [Municipality_pkey] PRIMARY KEY CLUSTERED ([municipality_ID]),
    CONSTRAINT [Municipality_municipality_ID_key] UNIQUE NONCLUSTERED ([municipality_ID])
);

-- CreateTable
CREATE TABLE [dbo].[Voivodeship] (
    [voivodeship_ID] INT NOT NULL,
    [voivodeship_name] NVARCHAR(1000) NOT NULL,
    [voivodeship_description] NVARCHAR(1000),
    CONSTRAINT [Voivodeship_pkey] PRIMARY KEY CLUSTERED ([voivodeship_ID]),
    CONSTRAINT [Voivodeship_voivodeship_ID_key] UNIQUE NONCLUSTERED ([voivodeship_ID])
);

-- CreateTable
CREATE TABLE [dbo].[Card_Dumpsters] (
    [cardDumpsters_ID] INT NOT NULL,
    [cardDumpsters_cardID] INT NOT NULL,
    [cardDumpsters_dumpsterID] INT NOT NULL,
    CONSTRAINT [Card_Dumpsters_pkey] PRIMARY KEY CLUSTERED ([cardDumpsters_ID])
);

-- AddForeignKey
ALTER TABLE [dbo].[Users] ADD CONSTRAINT [Users_users_typeID_fkey] FOREIGN KEY ([users_typeID]) REFERENCES [dbo].[Type]([type_ID]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[Users] ADD CONSTRAINT [Users_users_statusID_fkey] FOREIGN KEY ([users_statusID]) REFERENCES [dbo].[Status]([status_ID]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[Session] ADD CONSTRAINT [Session_userId_fkey] FOREIGN KEY ([userId]) REFERENCES [dbo].[Users]([users_ID]) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[Users_Address] ADD CONSTRAINT [Users_Address_usersAddress_userID_fkey] FOREIGN KEY ([usersAddress_userID]) REFERENCES [dbo].[Users]([users_ID]) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[Users_Address] ADD CONSTRAINT [Users_Address_usersAddress_typeID_fkey] FOREIGN KEY ([usersAddress_typeID]) REFERENCES [dbo].[Type]([type_ID]) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[Users_Address] ADD CONSTRAINT [Users_Address_usersAddress_communityID_fkey] FOREIGN KEY ([usersAddress_communityID]) REFERENCES [dbo].[Community]([community_ID]) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[Users_Cards] ADD CONSTRAINT [Users_Cards_usersCards_userID_fkey] FOREIGN KEY ([usersCards_userID]) REFERENCES [dbo].[Users]([users_ID]) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[Users_Cards] ADD CONSTRAINT [Users_Cards_usersCards_statusID_fkey] FOREIGN KEY ([usersCards_statusID]) REFERENCES [dbo].[Status]([status_ID]) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[Users_Contract] ADD CONSTRAINT [Users_Contract_usersContract_usersID_fkey] FOREIGN KEY ([usersContract_usersID]) REFERENCES [dbo].[Users]([users_ID]) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[Users_Contract] ADD CONSTRAINT [Users_Contract_usersContract_statusID_fkey] FOREIGN KEY ([usersContract_statusID]) REFERENCES [dbo].[Status]([status_ID]) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[Users_Contract] ADD CONSTRAINT [Users_Contract_usersContract_communityID_fkey] FOREIGN KEY ([usersContract_communityID]) REFERENCES [dbo].[Community]([community_ID]) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[Users_Logs] ADD CONSTRAINT [Users_Logs_usersLogs_userChangerID_fkey] FOREIGN KEY ([usersLogs_userChangerID]) REFERENCES [dbo].[User_Changer]([userChanger_ID]) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[Users_Logs] ADD CONSTRAINT [Users_Logs_usersLogs_userReceiverID_fkey] FOREIGN KEY ([usersLogs_userReceiverID]) REFERENCES [dbo].[User_Receiver]([userReceiver_ID]) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[User_Changer] ADD CONSTRAINT [User_Changer_userChanger_userID_fkey] FOREIGN KEY ([userChanger_userID]) REFERENCES [dbo].[Users]([users_ID]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[User_Receiver] ADD CONSTRAINT [User_Receiver_userReceiver_userID_fkey] FOREIGN KEY ([userReceiver_userID]) REFERENCES [dbo].[Users]([users_ID]) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[Dumpster] ADD CONSTRAINT [Dumpster_dumpster_communityID_fkey] FOREIGN KEY ([dumpster_communityID]) REFERENCES [dbo].[Community]([community_ID]) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[Dumpster_Logs] ADD CONSTRAINT [Dumpster_Logs_dumpsterLogs_dumpsterID_fkey] FOREIGN KEY ([dumpsterLogs_dumpsterID]) REFERENCES [dbo].[Dumpster]([dumpster_ID]) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[Dumpster_Logs] ADD CONSTRAINT [Dumpster_Logs_dumpsterLogs_changeIDUser_fkey] FOREIGN KEY ([dumpsterLogs_changeIDUser]) REFERENCES [dbo].[Users]([users_ID]) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[Garbage] ADD CONSTRAINT [Garbage_garbage_usersID_fkey] FOREIGN KEY ([garbage_usersID]) REFERENCES [dbo].[Users]([users_ID]) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[Garbage] ADD CONSTRAINT [Garbage_garbage_dumpsterID_fkey] FOREIGN KEY ([garbage_dumpsterID]) REFERENCES [dbo].[Dumpster]([dumpster_ID]) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[Garbage] ADD CONSTRAINT [Garbage_garbage_typeID_fkey] FOREIGN KEY ([garbage_typeID]) REFERENCES [dbo].[Type]([type_ID]) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[Rate] ADD CONSTRAINT [Rate_rate_usersID_fkey] FOREIGN KEY ([rate_usersID]) REFERENCES [dbo].[Users]([users_ID]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[Rate] ADD CONSTRAINT [Rate_rate_typeGarbageID_fkey] FOREIGN KEY ([rate_typeGarbageID]) REFERENCES [dbo].[Type]([type_ID]) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[Rate] ADD CONSTRAINT [Rate_rate_usersContractID_fkey] FOREIGN KEY ([rate_usersContractID]) REFERENCES [dbo].[Users_Contract]([usersContract_ID]) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[Rate_Logs] ADD CONSTRAINT [Rate_Logs_rateLogs_rateID_fkey] FOREIGN KEY ([rateLogs_rateID]) REFERENCES [dbo].[Rate]([rate_ID]) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[Rate_Logs] ADD CONSTRAINT [Rate_Logs_rateLogs_changeIDUser_fkey] FOREIGN KEY ([rateLogs_changeIDUser]) REFERENCES [dbo].[Users]([users_ID]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[Community] ADD CONSTRAINT [Community_community_municipalityID_fkey] FOREIGN KEY ([community_municipalityID]) REFERENCES [dbo].[Municipality]([municipality_ID]) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[Community] ADD CONSTRAINT [Community_community_voivodeshipID_fkey] FOREIGN KEY ([community_voivodeshipID]) REFERENCES [dbo].[Voivodeship]([voivodeship_ID]) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[Municipality] ADD CONSTRAINT [Municipality_municipality_voivodeshipID_fkey] FOREIGN KEY ([municipality_voivodeshipID]) REFERENCES [dbo].[Voivodeship]([voivodeship_ID]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[Card_Dumpsters] ADD CONSTRAINT [Card_Dumpsters_cardDumpsters_cardID_fkey] FOREIGN KEY ([cardDumpsters_cardID]) REFERENCES [dbo].[Users_Cards]([usersCards_ID]) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[Card_Dumpsters] ADD CONSTRAINT [Card_Dumpsters_cardDumpsters_dumpsterID_fkey] FOREIGN KEY ([cardDumpsters_dumpsterID]) REFERENCES [dbo].[Dumpster]([dumpster_ID]) ON DELETE NO ACTION ON UPDATE CASCADE;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
