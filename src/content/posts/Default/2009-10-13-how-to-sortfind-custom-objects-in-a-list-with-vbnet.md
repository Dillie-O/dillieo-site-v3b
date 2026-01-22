---
title: How To Sortfind Custom Objects In A List With Vbnet
description: How To Sortfind Custom Objects In A List With Vbnet
published: 2009-10-13
category: Default
tags: [net, coding, list, object, searching, sorting]
---

_Oddly enough there is nothing really new here. However, most of the documentation I've been sifting through has all been C# related. Since I had to code this up using vb.net at work, I thought it would be helpful to have a reference available for others out there in vb.net land._

Lately I've really fallen in love with the power that generics, List(Of T) and the like, provide for my day to day operations. _\[Yes, I know this came out in .Net 2.0 but things run a little slow over here...]_ What I especially like to do is create my own custom objects and maintain them in a List collection for easy iteration and retrieval. Recently I created user information object that I use for somebody logged in as part of the data model. I created a List(Of UserInfo) and could add/remove/list these users without hassle. However, I also needed to sort this list from time to time. In addition, I would need to find an individual user to display particular data about them on a page. Doing this took a small amount more work, but is quick and easy once you know what to do.

**UserInfo Object**

For starters, here is the object I've created to store user information (property/method information has been removed for brevity):

Public Class UserInfo

' Private Members Private m_UserId As String Private m_FirstName As String Private m_LastName As String Private m_SecurityLevel As Integer Private m_Roles As List(Of String)

' Public Properties

Public Property UserId() As String Get Return m_UserId End Get Set(ByVal value As String) value = m_UserId End Set End Property

Public Property FirstName() As String Get Return m_FirstName End Get Set(ByVal value As String) m_FirstName = value End Set End Property

Public Property LastName() As String Get Return m_LastName End Get Set(ByVal value As String) m_LastName = value End Set End Property

Public Property SecurityLevel() As Integer Get Return m_SecurityLevel End Get Set(ByVal value As Integer) m_SecurityLevel = value End Set End Property

Public Property Roles() As List(Of String) Get Return m_Roles End Get Set(ByVal value As List(Of String)) m_Roles = value End Set End Property

' Constructors

Public Sub New()

m_Roles = New List(Of String)

End Sub

Public Sub New(ByVal UserId As String, ByVal SecurityLevel As Integer)

m_UserId = UserId m_SecurityLevel = SecurityLevel

End Sub

Public Sub New(ByVal UserId As String, ByVal Roles As List(Of String))

m_UserId = UserId m_Roles = Roles

End Sub

Public Sub New(ByVal UserId As String, ByVal FirstName As String, \_ ByVal LastName As String, ByVal SecurityLevel As Integer, \_ ByVal Roles As List(Of String))

m_UserId = UserId m_FirstName = FirstName m_LastName = LastName m_SecurityLevel = SecurityLevel m_Roles = Roles

End Sub

' Public methods

Public Sub AddUserRole(ByVal RoleName As String)

If Not m_Roles.Contains(RoleName) Then

m_Roles.Add(RoleName)

End If

End Sub

Public Sub RemoveUserRole(ByVal RoleName As String)

If m_Roles.Contains(RoleName) Then

m_Roles.Remove(RoleName)

End If

End Sub

End Class

All of this is pretty straightforward. You can easily work with a UserInfo object to modify details and add it into a List collection without a problem.

But what happens if you need to find a given user within the list, or sort the list after adding several users to it? In the past you've had to essentially write your own collection type object, but thanks to existing interfaces and generics, we simply have to implement two features to make this possible.

**IComparer(Of T)**

The IComparer interface provides an interface for comparing one object to another. With the advent of generics, we can take the comparer one step further and specify the type of item we are comparing to, which eliminates the need to additional type casting within the method itself.

With out existing UserInfo object, simply add the following line to the class declaration:

Then within our method, we need to implement the proper Comparer signature that the interface is looking for:

Public Function Compare(ByVal x As UserInfo, ByVal y As UserInfo) \_ As Integer \_ Implements System.Collections.Generic.IComparer(Of UserInfo).Compare

Return String.Compare(x.UserId, y.UserId)

End Function

In our case, we are going to use the UserId as the item to sort with since we know the usernames are going o be unique. The String.Compare() method returns the proper integer comparison (-1 for less than, 0 for equal, 1 for greater than) that the compare method uses when sorting a collection. You can easily wire this method up however you'd like based on what you want to compare. You can even write up multiple comparison type operators, and then feed a given comparison into the sort method of a collection to sort according to your needs.

**Predicate Methods**

In order to find a given user within the collection, we leverage a feature called the Predicate to make this happen. Again, in the old way of doing things you'd have to iterate through your custom object and manually look for the item you wanted. While the predicates are essentially doing the same thing, you can define them in ways that will allow you to return more than a single item. So you can do things like find all items in the collection where the last name is like "son" or something to that effect. I'm no expert on predicates, I'm just learning to use them myself, but there is a nice MSDN article on them [here](http://msdn.microsoft.com/en-us/magazine/cc163550.aspx).

In our case, we want two simple predicates. One to find a given UserInfo object, and one to find a given UserInfo object based on the user Id (since that is our "primary key") without having to create the entire object. Defining these methods looks like this:

Public Shared Function FindPredicate(ByVal User As UserInfo) \_ As Predicate(Of UserInfo)

Return Function(User2 As UserInfo) User.UserId = User2.UserId

End Function

Public Shared Function FindPredicateByUserId(ByVal User As String) \_ As Predicate(Of UserInfo)

Return Function(User2 As UserInfo) User = User2.UserId

End Function

That's all there is to it. When you're ready to use this object with a collection, you can do simple stuff like this:

Dim UserList As New List(Of UserInfo) Dim LoadUser As UserInfo Dim LostUser As UserInfo Dim FoundUser AS UserInfo

LoadUser = New UserInfo("Sammy", 25) UserList.Add(LoadUser) LoadUser = New UserInfo("Hobart", 50) UserList.Add(LoadUser) LoadUser = New UserInfo("Fester", 10) UserList.Add(LoadUser) LoadUser = New UserInfo("Kozaky", 25) UserList.Add(LoadUser)

UserList.Sort()

LostUser = New UserInfo("Hobart", 50) FoundUser = UserList.Find(LostUser)

FoundUser = UserList.Find(UserInfo.FindPredicateByUserId \_ (User.Identity.Name))

There you have it! Simple and plain and effective. I'm working on redoing the class so you can see it looks like when the interface and predicate functions are added. Stay tuned.