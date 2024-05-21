BEGIN TRY

BEGIN TRAN;

-- CreateTable
CREATE TABLE [dbo].[CardsBulk_Order] (
    [cardsBulkOrder_ID] INT NOT NULL,
    [cardsBulkOrder_userID] INT NOT NULL,
    [cardsBulkOrder_numOfCards] INT NOT NULL,
    [cardsBulkOrder_statusID] INT NOT NULL,
    CONSTRAINT [CardsBulk_Order_pkey] PRIMARY KEY CLUSTERED ([cardsBulkOrder_ID]),
    CONSTRAINT [CardsBulk_Order_cardsBulkOrder_ID_key] UNIQUE NONCLUSTERED ([cardsBulkOrder_ID])
);

-- AddForeignKey
ALTER TABLE [dbo].[CardsBulk_Order] ADD CONSTRAINT [CardsBulk_Order_cardsBulkOrder_userID_fkey] FOREIGN KEY ([cardsBulkOrder_userID]) REFERENCES [dbo].[Users]([users_ID]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[CardsBulk_Order] ADD CONSTRAINT [CardsBulk_Order_cardsBulkOrder_statusID_fkey] FOREIGN KEY ([cardsBulkOrder_statusID]) REFERENCES [dbo].[Status]([status_ID]) ON DELETE NO ACTION ON UPDATE CASCADE;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
