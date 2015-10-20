var appmeta = [
{
  path: "/about",
  title: "About Us",
  description: "This is About Us page"
},{
  path: "/contact",
  title: "Contact Us",
  description: "This is Contact Us page"
},{
  path: "/express",
  title: "About Us",
  description: "This is About Us page"
},{
  path: "/",
  title: "Home",
  description: "Home"
},{
  path: "/notfound",
  title: "About Us",
  description: "This is About Us page"
},{
  path: "/people",
  title: "People",
  description: "This is People page",
  css: [
    "/test.css"
  ],
  nerbArray: [
    {
      nerbName: "people",
      pathFunction: function pathFunction(meta) {
            if (meta.params._id) {
                path = process.env.ROOTURL + "/data/people" + "/" + meta.params._id + "?token=" + meta.token;
            } else {
                var path = process.env.ROOTURL + "/data/people" + "?token=" + meta.token;
            }
            return path;
        }
    }
  ]
},{
  path: "/posts/:id",
  title: "About Us",
  description: "This is About Us page"
},{
  path: "/negulphandlertest",
  title: "negulphandlertest",
  description: "negulphandlertest"
}
]; 
module.exports = appmeta;