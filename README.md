# Project-2

Welcome to the coin-collection app, Coin Sharing Collection! With this app, you
can post all of your nifty coins to share them with others (sharing to come
later, though).

Using MongoDB, express, mongoose, embedded javascript, and sessions, any updates,
new additions, and deletions the user makes will be saved to a database and
rendered appropriately when the user wants to see their collection, or more
specific features of any specific coin in their collection.
Currently, a user can only view their own collection.

This app uses two models, Coin and User. Each user has their own set of coins,
and while there is no current functionality for it, the user can decide whether
their collection can be viewed publicly or not.

In future updates, I'd like to allow anyone to view any collection a user has
allowed to be viewed publicly; of course, they won't be able to edit, add to, or
delete from any collection other than their own. I'd also like to allow a user
to add photos directly from whichever device they may be using, rather than
needing them to first transform that photo into a valid picture url link.
