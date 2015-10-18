var dataRef = [
{
  name: "emails",
  slug: "/admin/emails",
  apiSlug: "/data/emails",
  interfaceType: "default",
  cycleByDefault: false,
  batchSize: 10,
  type: "noEdit",
  categories: [],
  tags: [],
  fields: [
    {
      name: "p1",
      data: "nameFirst",
      type: "noEdit"
    },
    {
      name: "p2",
      data: "nameLast",
      type: "noEdit"
    },
    {
      name: "p3",
      data: "email",
      type: "noEdit"
    },
    {
      name: "p3",
      data: "user",
      type: "ObjectId"
    }
  ]
},{
  name: "negulpdatatest",
  slug: "/admin/negulpdatatest",
  apiSlug: "/data/negulpdatatest",
  fields: [
    {
      name: "p1",
      data: "testField"
    }
  ]
},{
  name: "page",
  slug: "/admin/page",
  apiSlug: "/data/page",
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
  apiSlug: "/data/people",
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