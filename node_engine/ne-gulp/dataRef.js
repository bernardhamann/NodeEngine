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
  name: "nesendgrid",
  slug: "/admin/nesendgrid",
  apiSlug: "/data/nesendgrid",
  interfaceType: "default",
  cycleByDefault: false,
  batchSize: 10,
  type: "noEdit",
  categories: [],
  tags: [],
  fields: [
    {
      name: "p1",
      data: "to",
      type: "noEdit"
    },
    {
      name: "p2",
      data: "from",
      type: "noEdit"
    },
    {
      name: "p3",
      data: "subject",
      type: "noEdit"
    },
    {
      name: "p4",
      data: "body",
      type: "noEdit"
    },
    {
      name: "p4",
      data: "detail.name",
      type: "noEdit"
    },
    {
      name: "p5",
      data: "detail.phone",
      type: "noEdit"
    },
    {
      name: "p6",
      data: "status.message",
      type: "noEdit"
    },
    {
      name: "p7",
      data: "status.date",
      type: "noEdit"
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
  categories: [
    "undefined",
    "family",
    "friends"
  ],
  tags: [],
  fields: [
    {
      data: "nameFirst",
      label: "First Name",
      templateRef: "string1"
    },
    {
      data: "nameLast",
      label: "Last Name",
      templateRef: "string2"
    },
    {
      data: "email",
      label: "Email",
      templateRef: "string3"
    },
    {
      data: "second.level",
      label: "Second Level",
      templateRef: "string4"
    },
    {
      data: "category",
      label: "Category",
      editType: "select",
      selectOptions: [
        "friends",
        "family"
      ],
      templateRef: "string5"
    },
    {
      label: "Bio",
      data: "bio",
      editType: "textarea",
      templateRef: "string6"
    }
  ]
}
]; 
module.exports = dataRef;