---
title: Sql 2005 Crud Templates
description: Sql 2005 Crud Templates
published: 2011-05-16
image: images/posts/sql_2005_crud_templates.webp
imageAlt: Sql 2005 Crud Templates
category: Default
tags: [coding, sql, t-sql, template]
---

Sometimes it just handy to have a set of templates to use when you're cranking out new stored procedures in your database. Here are a set of "templates" I've developed over time to make my life easier, and leverage a few tricks and features.

<!--more-->

_Note: These scripts work on most databases, but a few things (such as table variables) are SQL 2005 specific. You may have to modify a few things if you're going to use these elsewhere._

These templates will query against a basic table called "Team" here's the script to create the table below:

Notice we have a standard auto-incrementing Id and a nice little value called "IsActive" that will allow us to prevent a team from being visible in say a dropdown list, but also keep foreign key integrity. The other thing to notice are the last 4 columns. We use those columns for auditing purposes. You can keep dibs on when a record is created, and by putting in the proper code, you can track when a record was last updated. We default these values to the current date and current user logged in to make sure we have a value, even if none is specified in the stored procedures.

On to the procedures. First up is a simple insert:

( @vchName varchar(100), @vchDescription varchar(500), @vchEmail As varchar(100), @bitIsActive As bit, @vchCreatedBy varchar(50) ) AS SET NOCOUNT ON SET XACT_ABORT ON

BEGIN TRAN

IF @vchCreatedBy IS NULL SET @vchCreatedBy = suser_sname()

INSERT INTO \[dbo].\[Team] (\[Name], \[Description], \[Email], \[IsActive], \[CreatedBy], \[UpdatedBy]) VALUES (@vchName, @vchDescription, @vchEmail, @bitIsActive, @vchCreatedBy, @vchCreatedBy)

SELECT \[Id] FROM \[dbo].\[Team] WHERE \[Id] = SCOPE_IDENTITY()

COMMIT TRAN GO GRANT EXECUTE ON \[dbo].\[usp_insTeam] TO \[AppUser]; GO

Pretty straight forward. You can potentially modify who is inserting the record, or let impersonation do its things. Notice I've also granted an imaginary user (AppUser) execute on this procedure.

Next up is the update:

( @intId int, @vchName varchar(100), @vchDescription varchar(500), @vchEmail As varchar(100), @bitIsActive bit, @vchUpdatedBy varchar(50), @dtmUpdatedDate datetime ) AS DECLARE @dtmOriginalUpdatedDate datetime

SET NOCOUNT ON SET XACT_ABORT ON

BEGIN TRAN

IF @vchUpdatedBy IS NULL SET @vchUpdatedBy = suser_sname()

SELECT @dtmOriginalUpdatedDate = \[UpdatedDate] FROM \[dbo].\[Team] WHERE \[Id] = @intId

IF @dtmOriginalUpdatedDate IS NULL BEGIN RAISERROR('CONCURRENCY ERROR: Original and Current UpdatedDate values do not match.', 16, 1) RETURN END

IF DATEDIFF(s, @dtmOriginalUpdatedDate, @dtmUpdatedDate) > 1 OR DATEDIFF(s, @dtmOriginalUpdatedDate, @dtmUpdatedDate) &lt; -1 BEGIN RAISERROR('CONCURRENCY ERROR: Original and Current UpdatedDate values do not match.', 16, 1) RETURN END ELSE BEGIN UPDATE \[dbo].\[Team] SET \[Name] = @vchName, \[Description] = @vchDescription, \[Email] = @vchEmail, \[IsActive] = @bitIsActive, \[UpdatedBy] = @vchUpdatedBy, \[UpdatedDate] = @dtmUpdatedDate WHERE \[Id] = @intId

SELECT \[Id], \[Name], \[Description], \[Email], \[IsActive], \[CreatedBy], \[CreatedDate], \[UpdatedBy], \[UpdatedDate] FROM \[dbo].\[Team] WHERE \[Id] = @intId END

COMMIT TRAN GO GRANT EXECUTE ON \[dbo].\[usp_updTeam] TO \[AppUser]; GO

Here we leverage the UpdateDate parameter to do a concurrency check. Ideally you'll have the entire record, or at least the UpdateDate and Id of the record you're modifying presented to the user. When you submit an update request, you pass the UpdateDate you currently have, if somebody has modified the record since you last loaded it, the UpdateDate fields won't match, and you'll get the error.

Here's our delete procedure:

SET ANSI_NULLS ON; GO SET QUOTED_IDENTIFIER ON; GO --============================================================================= -- Author: Sean Patterson -- Created: 4/11/2011 -- Purpose: Sample App -- Details: This stored procedure removes a team record from the Team table. -- A concurrency check is performed to make sure the record has not -- been updated since the user last saw it. -- Example: exec dbo.usp_delTeam 42, '5/1/2011' -- -- Modifications (Date - Author: Details) --============================================================================= CREATE PROCEDURE dbo.usp_delTeam ( @intId int, @dtmUpdatedDate datetime ) AS DECLARE @dtmOriginalUpdatedDate datetime

SET NOCOUNT ON SET XACT_ABORT ON

BEGIN TRAN

SELECT @dtmOriginalUpdatedDate = \[UpdatedDate] FROM \[dbo].\[Team] WHERE \[Id] = @intId

IF @dtmOriginalUpdatedDate IS NULL BEGIN RAISERROR('CONCURRENCY ERROR: Original and Current UpdatedDate values do not match.', 16, 1) RETURN END

IF DATEDIFF(s, @dtmOriginalUpdatedDate, @dtmUpdatedDate) > 1 OR DATEDIFF(s, @dtmOriginalUpdatedDate, @dtmUpdatedDate) &lt; -1 BEGIN RAISERROR('CONCURRENCY ERROR: Original and Current UpdatedDate values do not match.', 16, 1) RETURN END ELSE BEGIN DELETE FROM \[dbo].\[Team] WHERE \[Id] = @intId END

COMMIT TRAN GO GRANT EXECUTE ON \[dbo].\[usp_delTeam] TO \[AppUser]; GO

Again we use the concurrency check feature when removing a record. We might not want to remove the record if an update has been made, or if it's already been removed.

The final two queries in our templates are selecting and searching. The select is standard:

SET ANSI_NULLS ON; GO SET QUOTED_IDENTIFIER ON; GO --============================================================================= -- Author: Sean Patterson -- Created: 4/11/2011 -- Purpose: Sample App -- Details: This stored procedure retrieves a single team record or all team -- records from the Team table based onthe Id specified. -- Example: exec dbo.usp_selTeam 42 -- -- Modifications (Date - Author: Details) --============================================================================= CREATE PROCEDURE dbo.usp_selTeam ( @intId int )

AS SET NOCOUNT ON SET XACT_ABORT ON

BEGIN TRAN

SELECT \[Id], \[Name], \[Description], \[Email], \[IsActive], \[CreatedBy], \[CreatedDate], \[UpdatedBy], \[UpdatedDate] FROM \[dbo].\[Team] WHERE ( \[Id] = @intId OR @intId IS NULL )

COMMIT TRAN GO GRANT EXECUTE ON \[dbo].\[usp_selTeam] TO \[AppUser]; GO

We can pull all of our records or just a single one depending on what you need.

The final query is the search query, and my personal favorite, partially because it has taken a few apps to really get this one to work smoothly:

SET ANSI_NULLS ON; GO SET QUOTED_IDENTIFIER ON; GO --============================================================================= -- Author: Sean Patterson -- Created: 04/12/2011 -- Purpose: Sample App -- Details: This stored procedure retrieves a team record from the Team -- table that matches the search parameters specified. The -- procedure also allows for a list of Ids to be provided as a -- search parameter. -- Example: exec dbo.usp_selTeamSearch NULL, NULL, 'Programmer', NULL, NULL -- -- Modifications (Date - Author: Details) --============================================================================= CREATE PROCEDURE dbo.usp_selTeamSearch ( @vchTeamIdList varchar(MAX), @vchName varchar(100), @vchDescription varchar(500), @vchEmail varchar(100), @bitIsActive bit ) AS

SET NOCOUNT ON SET XACT_ABORT ON

\-- Create temporary table to parse the list of team Ids. DECLARE @tblTeamId table ( TeamId int )

DECLARE @bitTeamList bit DECLARE @vchTeamId varchar(MAX) DECLARE @intCharIndex int

\-- Allow the user to specify an empty string as a search parameter, but -- sanitize this to NULL for proper search results IF @vchTeamIdList = '' SET @vchTeamIdList = NULL IF @vchName = '' SET @vchName = NULL IF @vchDescription = '' SET @vchDescription = NULL IF @vchEmail = '' SET @vchEmail = NULL

\-- Parse TeamId list into a table if any Ids have been specified. SET @bitTeamList = 0

IF @vchTeamIdList IS NOT NULL BEGIN SET @bitTeamList = 1 SET @vchTeamIdList = LTRIM(RTRIM(@vchTeamIdList))+ ',' SET @intCharIndex = CHARINDEX(',', @vchTeamIdList, 1)

IF REPLACE(@vchTeamIdList, ',', '') &lt;> '' BEGIN WHILE @intCharIndex > 0 BEGIN SET @vchTeamId = LTRIM(RTRIM(LEFT(@vchTeamIdList, @intCharIndex - 1)))

IF @vchTeamId &lt;> '' BEGIN INSERT INTO @tblTeamId ( TeamId ) VALUES ( CAST(@vchTeamId AS int) ) END

SET @vchTeamIdList = RIGHT(@vchTeamIdList, LEN(@vchTeamIdList) - @intCharIndex) SET @intCharIndex = CHARINDEX(',', @vchTeamIdList, 1) END END END

BEGIN TRAN

IF @bitTeamList = 1 -- Retrieve final results, joining the table of parsed Ids SELECT \[Id], \[Name], \[Description], \[Email], \[IsActive], \[CreatedBy], \[CreatedDate], \[UpdatedBy], \[UpdatedDate] FROM \[dbo].\[Team] INNER JOIN @tblTeamId tblTeam ON dbo.Team.Id = tblTeam.TeamId WHERE (@vchName IS NULL OR \[Name] = @vchName) AND (@vchDescription IS NULL OR \[Description] = @vchDescription) AND (@vchEmail IS NULL OR \[Email] = @vchEmail) AND (@bitIsActive IS NULL OR \[IsActive] = @bitIsActive) ELSE SELECT \[Id], \[Name], \[Description], \[Email], \[IsActive], \[CreatedBy], \[CreatedDate], \[UpdatedBy], \[UpdatedDate] FROM \[dbo].\[Team] WHERE (@vchName IS NULL OR \[Name] = @vchName) AND (@vchDescription IS NULL OR \[Description] = @vchDescription) AND (@vchEmail IS NULL OR \[Email] = @vchEmail) AND (@bitIsActive IS NULL OR \[IsActive] = @bitIsActive)

COMMIT TRAN

SET NOCOUNT OFF GO GRANT EXECUTE ON \[dbo].\[usp_selTeamSearch] TO \[AppUser]; GO

The first feature of this search is that you can pass in a comma delimited list of Ids in order to return. This comes in handy if you need to pull a subset of selected records for display/modification for the user without having to make multiple calls to the usp_selTeam procedure. The second feature of this search is that it allows you to optionally search columns. If you don't want to apply the search to a column, simply specify NULL or an empty string when calling the procedure. This makes the procedure quite versatile in many situations.

A couple of downsides to the search is that it doesn't allow you to search for a NULL value in a given field. In addition, the search performs an "inclusive" search, which requires a matching record to match ALL of the parameters specified in order to come back in the results. Generally speaking, I think these two cases are more on the fringe for your day to day apps. In addition, it is easy enough to create a second procedure that changes all of the AND clauses and make them OR instead.

I hope these templates makes your coding a little easier, or gives you some ideas on your next project. Enjoy!

If you want all of them for your reference, you can download them [here](http://dl.dropbox.com/u/5720926/SQL2005_CRUD_Templates.7z). (Requires [7-zip](http://7-zip.org/) to extract).