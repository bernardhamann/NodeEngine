20150913-0033

When rendering react using react router on the server and having to get data before rendering the data get function can not be inside the component because the component renders before the data gets there and then the HTML that is send to the browser does not have the data.

To solve this we need to get the data before calling the render and then give that data in as the props

20150913-0034

Test the branch 
new line

20150913-0444
Remove Jeet and use PostCSS with Lost instead. Lost can do what Jeet can do, and Jeet is made by the same person who made lost. Also Jeet always gives the prefer global warning when running npm install. hopefulle Lost will not do that.

20150913-1805
Lost gid for post css has a error when running it, i think the error will be soved soon, but now im just goign to keep using jeet.

20150917-0526

ne-server-render
ne-pre-data

If a package uses the node engine file structure then it is a ne-somename package

-media
-src
--client
--reastapi
--server
--static
--universal
----css
----handlers
----partials
----sections
-app
