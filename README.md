# Simple 'n Easy Full Stack App for CSC424
[![FOSSA Status](https://app.fossa.com/api/projects/git%2Bgithub.com%2FReddieHal%2FBasicFullStack.svg?type=shield)](https://app.fossa.com/projects/git%2Bgithub.com%2FReddieHal%2FBasicFullStack?ref=badge_shield)


Hi! I'm Gabriel and this is the submission for the start of csc424.


# READ BEFORE RUNNING

**RUN NPM INSTALL AFTER CLONING**
I have a habit of not uploading the node_modules or atleast trying not to. So please run npm install to run the packages needed before running the website front and backend
OH AND A .ENV FILE IS REQUIRED FOR KEYS AND CONNECTING TO MONGODB - CHECK ERRORS FOR TOKEN NAMES

**Implemented Features**
-Implemented MONGODB Backend for users and pwds
-Utilizing JSON Webtokens to secure sessions and make sure people have right access for api searches in backend
-Hardening/encrypting certain bits of data
-Enabling https
-Directory

 - Login and Registration Pages
	 - Login page checks with accounts/login api to check if user exists
	 - Registration checks password on backend if good and adds a new user to the active table on accounts/register
 - Sign in button redirects to Login page or switches to a log-out button when it detects that user has logged in
 - check list of users with GET /users
	 - filter user if you pass the username in the body i.e {username: "bj"}


## License
[![FOSSA Status](https://app.fossa.com/api/projects/git%2Bgithub.com%2FReddieHal%2FBasicFullStack.svg?type=large)](https://app.fossa.com/projects/git%2Bgithub.com%2FReddieHal%2FBasicFullStack?ref=badge_large)