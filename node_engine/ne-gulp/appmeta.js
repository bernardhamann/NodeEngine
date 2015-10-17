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
                path = process.env.ROOTURL + "/api/people" + "/" + meta.params._id + "?token=" + meta.token;
            } else {
                var path = process.env.ROOTURL + "/api/people" + "?token=" + meta.token;
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
  path: "/admin/:apiName",
  title: "Admin page",
  description: "Add, edit, delete and view content",
  css: [
    "/ne-admin.css"
  ],
  nerbArray: [
    {
      nerbName: "apiData",
      pathFunction: function pathFunction(meta) {
            if (meta.query) {
                if (meta.query.limit) {
                    if (meta.query.batch) {
                        var path = process.env.ROOTURL + "/api/" + meta.params.apiName + "?limit=" + meta.query.limit + "&batch=" + meta.query.batch;
                    } else {
                        var path = process.env.ROOTURL + "/api/" + meta.params.apiName + "?limit=" + meta.query.limit;
                    }
                } else {
                    var path = process.env.ROOTURL + "/api/" + meta.params.apiName;
                }
            } else {
                var path = process.env.ROOTURL + "/api/" + meta.params.apiName;
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
    "/ne-admin.css"
  ]
},{
  path: "/login",
  title: "Login",
  description: "Login page"
},{
  path: "/profile",
  title: "Profile Page",
  description: "User profile page",
  nerbArray: [
    {
      nerbName: "users",
      pathFunction: function pathFunction(meta) {
            path = process.env.ROOTURL + "/api/users" + "/" + meta.claims.user + "?token=" + meta.token;
            return path;
        }
    }
  ]
},{
  path: "/signup",
  title: "Signup",
  description: "Signup page"
},{
  path: "/admin/users/:_id",
  title: "Edit User",
  description: "Editing user",
  nerbArray: [
    {
      nerbName: "users",
      pathFunction: function pathFunction(meta) {
            path = process.env.ROOTURL + "/api/users/" + meta.params._id + "?token=" + meta.token;
            return path;
        }
    }
  ]
},{
  path: "/admin/users",
  title: "Users",
  description: "This is Users page",
  nerbArray: [
    {
      nerbName: "users",
      pathFunction: function pathFunction(meta) {
            path = process.env.ROOTURL + "/api/users?token=" + meta.token;
            return path;
        }
    }
  ]
}
]; 
module.exports = appmeta;