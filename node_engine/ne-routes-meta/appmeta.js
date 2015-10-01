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
  path: "/login",
  title: "Login",
  description: "Login page"
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
    pathFunction: function pathFunction(_id) {
            if (_id) {
                path = process.env.ROOTURL + "/api/people" + "/" + _id;
            } else {
                var path = process.env.ROOTURL + "/api/people";
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
  path: "/profile",
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
}
]; 
module.exports = appmeta;