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
  neDataBefore: 1,
  nedb1: {
    path: "http://localhost:3001/api/people",
    pathFunction: function pathFunction(meta) {
            if (meta.params._id) {
                path = process.env.ROOTURL + "/api/people" + "/" + meta.params._id + "?token=" + meta.token;
            } else {
                var path = process.env.ROOTURL + "/api/people" + "?token=" + meta.token;
            }
            return path;
        },
    cycle: false,
    search: false
  },
  cycle: {
    limit: "query.limit",
    batch: "query.batch"
  },
  search: {
    field1: "query.limit",
    value2: "query.batch"
  }
},{
  path: "/posts/:id",
  title: "About Us",
  description: "This is About Us page"
},{
  path: "/admin/users",
  title: "Users",
  description: "This is Users page",
  neDataBefore: 1,
  nedb1: {
    path: "http://localhost:3001/admin/api/users?access_token=admin"
  }
},{
  path: "/login",
  title: "Login",
  description: "Login page"
},{
  path: "/profile",
  title: "Profile Page",
  description: "User profile page"
},{
  path: "/signup",
  title: "Signup",
  description: "Signup page"
},{
  path: "/super",
  title: "Super Admin Page",
  description: "Use the super admin key to create admin tokens and assign them to users",
  neDataBefore: 2,
  nedb1: {
    pathFunction: function pathFunction(meta) {

            console.log(meta);

            if (meta.query) {
                if (meta.query.super_token) {
                    var path = process.env.ROOTURL + "/admin/api/tokens/admin" + "?access_token=" + meta.query.super_token;
                } else {
                    var path = process.env.ROOTURL + "/admin/api/tokens/admin";
                }
            } else {
                var path = process.env.ROOTURL + "/admin/api/tokens/admin";
            }

            return path;
        }
  },
  nedb2: {
    pathFunction: function pathFunction(meta) {

            console.log(meta);

            if (meta.query) {
                if (meta.query.admin_token) {
                    var path = process.env.ROOTURL + "/admin/api/users" + "?access_token=" + meta.query.admin_token;
                } else {
                    var path = process.env.ROOTURL + "/admin/api/users";
                }
            } else {
                var path = process.env.ROOTURL + "/admin/api/tokens/admin";
            }

            return path;
        }
  }
}
]; 
module.exports = appmeta;