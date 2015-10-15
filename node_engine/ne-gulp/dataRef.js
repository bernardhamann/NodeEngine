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
    {
      name: "p1",
      data: "nameFirst"
    },
    {
      name: "p2",
      data: "nameLast"
    },
    {
      name: "p3",
      data: "email"
    },
    {
      name: "p3",
      data: "user"
    }
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
    {
      name: "p1",
      data: "path"
    },
    {
      name: "p2",
      data: "title"
    },
    {
      name: "p3",
      data: "description"
    }
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
    {
      name: "p1",
      data: "nameFirst"
    },
    {
      name: "p2",
      data: "nameLast"
    },
    {
      name: "p3",
      data: "email"
    },
    {
      name: "p4",
      data: "second.level"
    }
  ]
}
]; 
module.exports = dataRef;