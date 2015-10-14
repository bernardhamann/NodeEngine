var dataRef = [
{
  name: "email",
  slug: "/admin/email",
  apiSlug: "/api/email",
  interfaceType: "default",
  cycleByDefault: false,
  batchSize: 10,
  categories: [],
  tags: [],
  fields: [
    "nameFirst",
    "nameLast",
    "email",
    "user"
  ]
},{
  name: "page",
  slug: "/admin/page",
  apiSlug: "/api/page",
  interfaceType: "default",
  cycleByDefault: false,
  batchSize: 10,
  categories: [],
  tags: [],
  fields: [
    "path",
    "title",
    "description"
  ]
},{
  name: "people",
  slug: "/admin/people",
  apiSlug: "/api/people",
  interfaceType: "default",
  cycleByDefault: false,
  batchSize: 10,
  categories: [],
  tags: [],
  fields: [
    "nameFirst",
    "nameLast",
    "email",
    "second.level"
  ]
}
]; 
module.exports = dataRef;