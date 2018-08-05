CREATE TABLE [dbo].[Quiz] (
    [Id]    INT            IDENTITY (1, 1) NOT NULL,
    [Round] NVARCHAR (MAX) NULL,
    CONSTRAINT [PK_Quiz] PRIMARY KEY CLUSTERED ([Id] ASC)
);

