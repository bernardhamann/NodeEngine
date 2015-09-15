after getting the files in the directory 

run 

npm install

gulp

and then in another terminal npm start

this should rebuild when the files change and it should serve the static content first and then if there are no static content it will server the server generated content


visit /built two times on a clean install and see it change the second time

do a gulp clear and then gulp to see it again



////////////////////////////////////////////////////////

-------- 

old deploy code

--------

///////////////////////////////////////////////////////


This file needs to be updated


// Add the code for the project to a git repo

// login to the server
ssh root@13.656.554.443;

// cd to the directory where you want the apps to go

cd deploy

// git clone https..........

// if its a private repo enter your password


// Create a conf file on the server to run the app as a upstart service
nano /etc/init/appname.conf;

// add this to the file

/////////////////////////////////////

start on filesystem and started networking
respawn
chdir /root/deploy/appname
exec /usr/local/bin/node bin/www

////////////////////////////////////

chdir means change directory

stop appname
start appname


// now the app will be restarted every time the server restarts

// cd to the dir where the apps are and hit git pull to update the site



////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

# Generator Yebo Readme

## React 

Use react ass the basis for all the UI

Write the components in JSX and convert them to normal JS files that is stored in the build folder at build time. 

At runtime use the converted component files to render the components 

Also at build time create a bundle file with all the components needed for clientside rendering a routing 

If the client has JS enabled the client side will run the app and just send and get data from the server using the api

On the serverside use react as the view engine 
When a client visits the webside the first page is always renderd serverside only if JS is enabled on the client does the client take over. If JS is not enabled on the client then the requests are handeld by the server.

One the clientside uses react router for the views and jquery for the logic (stores)

Use the pub sub approach (AmplifyJS) on the client and the server

Some pages are static and the components fro these pages doe not need any props or state to render, these pages should also actually be rendered at build time and stored at HTML files to be served later. The components fro the

/pages/static/

Some pages are not static, these need props and or state to render. The components for these pages are stored in a layouts folder 

/pages/layouts/

[ ] Setup react as the express template engine using the components in the layouts folder
[ ] Setup the express router to render the pages from the templates based on the route params etc of the requests if the route params is 
    /:products/:category/:page
    /:slug1/:slug2/:slug3
    
    Where the slugs represents requests from the database 
    /:collection/:findlimiter1/:findlimiter2/:findlimiter3/:findlimiter4
    
    Then use the 
    
    Maybe 
    /:collection/:resultsperpage/:pagenumber 
    
    With 
    /:collection/:resultsperpage/:pagenumber?limiter1=somekeyvaluepair&limiter2=somekeyvaluepair
    
    Or have deep slugs for many sub urls and use the last two slugs for the results per page and the page
    
    use if slug2 = number {
        Use the number and get the next slug as a number and use that to
    }
    else use the slug2 as the level one key and test slug3 wheter it is a number 
    
    for the value 
    
## Important 

There is a distinction between a website and a web app. The line sometimes gets blurry becuase many websites are actually web apps. 

Without getting into details about any of this the starting point for the approach taken in this project is that for a website every way that the pages of the site can be displayed is represented by some url. 

If the website gets to point where every way the pages can look can be represented by a url then it probably time to start making some changes to the way this project is put together.

Having the above requirement helps simplify the process of universal rendering (server rendering, static files and client rendering) all working together without the need for lots of code and logic repeats.
    

## Deployment

### Deploy using Git

Add all the app code into a git repo and clone that repo on the deployment server in a root folder with the name of the app

the file path on the host server is /appname

where appname is usally the domain 

example 

for
mydomain.com 

appname is 
mydomaincom

add the node_modules and the build folder to the git ignore list 

this means that you need to run npm install and gulp on the server to build the site everytime you change the code

This is temp solution, eventually the build folder will have the entire app and there will be a process to build the app on another server and only place the contents of the build folder in the production folder.

The build folder can be called app and inside it 
- app
---- client
---- server
---- restapi
---- static 
---- universal
- media

Gulp builds all folders but not the media folder
Gulp also deletes all the folders except the media folder
Media folder can be used for uploads from the running app and for uploads from whereever



### Why git 

Git works really well for version control

Other options to get the files to the server include 

- rsync
- ssh 
- ftp 

Each has its own advantages and disadvantages.

Rsync compares the local files to the server files and only copies over the changes. The problem starts when there is also changes on the serverside. Are we then going to have to rsync from th server to the computer too?

With git if there are changes on the server the changes committed and pushed easily without having to worry about the local files being affected in a unknown way. 

Rsync is like a big bulldozer, not easy to do detailed work, git is like a sculptor, its easy to get more exact control over the file moving process.


### With git deploy what about images and uploads from the server.

Storing images and other large files in git is not a good practice. if your websites image files are not that big or there are not that many files, perhaps keeping them in the git repo is not the end of the world.

A better approach is to add the images folder to the git ignore list and then to use something like rsync to copy the image files to the server 

In any event the images does not need to be part of the build process and the images folder is therefore outside the src and build folders 

What about images and other files that are uploaded to the server by the users of the app. This can be send to a service like S3 and then accessed from there or it can be placed in a special folder called uploads in the root of the app folder. 


## PM2

    "addpm2": "ssh root@hosttwo.yebolocal.me && cd deploy/test/ && pm2 start conf.json",
    "deletepm2": "ssh root@hosttwo.yebolocal.me && cd deploy/test/ && pm2 delete conf.json",


## Serving using nginx reverse proxy with caching for static assets

Nginx is problably much faster at serving static files that node is so let nginx do it. 

Also if you want to host more than one node app on one server a easy way to direct domains to the right app is to use nginx as a reverse proxy. If this is not done then its difficult to get the domain to point ot the right app on the server becuase in the dns records we can only put the ip and not the port.


## Todo

[x] Setup the API 
[ ] Use Axios to get the data from the api from inside the components

[ ] Setup the stuff for PM2
    [ ] Fingure out the plan

[ ] Setup the stuff for Nginx
    [ ] Use NPM scripts to update the settings and restart the nginx server
    [ ] Create the template for the nginx config files

[ ] Impliment using graphQL and Relay 
