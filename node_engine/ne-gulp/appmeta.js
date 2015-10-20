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
  path: "/admin/:dataName",
  title: "Admin page",
  description: "Add, edit, delete and view content",
  css: [
    "/ne-style.css",
    "/ne-admin/ne-css/style.css"
  ],
  nerbArray: [
    {
      nerbName: "adminData",
      pathFunction: function pathFunction(meta) {
            if (meta.query) {
                if (meta.query.limit) {
                    if (meta.query.batch) {
                        var path = process.env.ROOTURL + "/data/" + meta.params.dataName + "?limit=" + meta.query.limit + "&batch=" + meta.query.batch;
                    } else {
                        var path = process.env.ROOTURL + "/data/" + meta.params.dataName + "?limit=" + meta.query.limit;
                    }
                } else {
                    var path = process.env.ROOTURL + "/data/" + meta.params.dataName;
                }
            } else {
                var path = process.env.ROOTURL + "/data/" + meta.params.dataName;
            }
            return path;
        }
    }
  ]
},{
  path: "/admin",
  title: "Admin page",
  description: "Add, edit, delete and view content",
  css: [
    "/ne-style.css",
    "/ne-admin/ne-css/style.css"
  ]
},{
  path: "/negulphandlertest",
  title: "negulphandlertest",
  description: "negulphandlertest"
}
]; 
module.exports = appmeta;