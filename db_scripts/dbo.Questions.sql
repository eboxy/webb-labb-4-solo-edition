CREATE TABLE [dbo].[Questions] (
    [Id]          INT            IDENTITY (1, 1) NOT NULL,
    [Answer1]     NVARCHAR (MAX) NULL,
    [Answer2]     NVARCHAR (MAX) NULL,
    [Answer3]     NVARCHAR (MAX) NULL,
    [QuizId]      INT            NULL,
    [RightAnswer] NVARCHAR (MAX) NULL,
    [_question]   NVARCHAR (MAX) NULL,
    CONSTRAINT [PK_Questions] PRIMARY KEY CLUSTERED ([Id] ASC),
    CONSTRAINT [FK_Questions_Quiz_QuizId] FOREIGN KEY ([QuizId]) REFERENCES [dbo].[Quiz] ([Id])
);


GO
CREATE NONCLUSTERED INDEX [IX_Questions_QuizId]
    ON [dbo].[Questions]([QuizId] ASC);

