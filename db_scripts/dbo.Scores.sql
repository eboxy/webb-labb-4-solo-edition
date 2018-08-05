CREATE TABLE [dbo].[Scores] (
    [Id]     INT            IDENTITY (1, 1) NOT NULL,
    [Player] NVARCHAR (MAX) NULL,
    [Points] INT            NOT NULL,
    [QuizId] INT            NULL,
    CONSTRAINT [PK_Scores] PRIMARY KEY CLUSTERED ([Id] ASC),
    CONSTRAINT [FK_Scores_Quiz_QuizId] FOREIGN KEY ([QuizId]) REFERENCES [dbo].[Quiz] ([Id])
);


GO
CREATE NONCLUSTERED INDEX [IX_Scores_QuizId]
    ON [dbo].[Scores]([QuizId] ASC);

