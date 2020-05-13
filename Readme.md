# Prisma Client ReasonML

## Current Status

This is (for now) just a prototype.
**DO NOT** use this in production.

If you want to help out, don't hesitate to file an issue or even a pull request.

- [x] Basic generator setup
- [x] Instance
  - [x] create new
  - [x] connect
  - [x] disconnect
- [ ] Enums
- [ ] Selecting subfields from action
- [ ] Model actions
  - [ ] `Model.`findOne
  - [x] `Model.`findMany
  - [x] `Model.`create
  - [ ] `Model.`update
  - [ ] `Model.`updateMany
  - [ ] `Model.`upsert
  - [ ] `Model.`delete
  - [ ] `Model.`deleteMany
  - [ ] `Model.`count
- [x] Model type generation
  - [x] `Model.`Select
  - [x] `Model.`Include
  - [x] `Model.`WhereInput
  - [x] `Model.`WhereUniqueInput
  - [x] `Model.`CreateInput
  - [x] `Model.`UpdateInput
- [ ] Model relationships
  - [ ] One to One
  - [ ] One to Many
  - [ ] Many to Many
- [ ] Probably a lot of other stuff

### Generator in schema.prisma

Everything shown below is required:

```prisma
generator reasonml {
  provider = "./node_modules/prisma-client-reason/dist/generator.js"
  output   = "../generated/.prisma/client-reason"
  name     = "PrismaClient" // The name of the generated Module
}
```

### Creating a new Instance

```reason
let prisma = PrismaClient.make();
```

### Connection Handling

```reason
prisma->PrismaClient.connect;

prisma->PrismaClient.disconnect;
```

### Writing to the Database

#### PrismaClient.`Model`.create

```reason
open PrismaClient;

prisma->User.create(
  ~select=
    User.Select.make(
      ~id=true,
      ~createdAt=true,
      ~username=true,
      (),
    ),
  ~data=
    User.CreateInput.make(
      ~lastname="Ewert",
      ~username="ewert",
      (),
    ),
  (),
);
```

#### PrismaClient.`Model`.findMany

```reason
open PrismaClient;

prisma->User.findMany(
  ~where=User.WhereInput.make(
    ~username="ewert",
    (),
  ),
  (),
);
```
