# Simple 'n Easy Full Stack App for CSC424

Hi! I'm Gabriel and this is the submission for the start of csc424 RND 2!!

# READ BEFORE RUNNING

**RUN NPM INSTALL AFTER CLONING**
I have a habit of not uploading the node_modules or atleast trying not to. So please run npm install to run the packages needed before running the website front and backend

**3 DIFFEREN SBOMS, ONE IN EACH DIRECTORY(ROOT, FRONTEND, BACKEND) - title 'location'SBOM.json**

**Implemented Features**
- Added OAUTH - PAIN IN MY BUTT
	- Had to do something a little bit special because the redirection threw off my normal flow for auth
	- Added a new page to the route that will just take the token from the URL then insert it into the state as normal
	- Couldn't figure out how to implement it as a fetch because of CORS issues but it works?

***OLD***
 - Implemented MONGODB Backend for users and pwds
 - Utilizing JSON Webtokens to secure sessions and make sure people have right access for api searches in backend
 - Hardening/encrypting certain bits of data
 - Enabling https
 - Directory
 - Login and Registration Pages
	 - Login page checks with accounts/login api to check if user exists
	 - Registration checks password on backend if good and adds a new user to the active table on accounts/register
 - Sign in button redirects to Login page or switches to a log-out button when it detects that user has logged in
 - check list of users with GET /users
	 - filter user if you pass the username in the body i.e {username: "bj"}
