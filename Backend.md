## Keycloak

- Realms => Org ( ex: Google )
- Client => products ( ex: Gdrive , Gmail )
- User => end user ( ex: Rakshith )
- Roles => user role ( ex: Admin | Super Admin | Guest User )
- Groups => user cohart ( ex: User group divided based on some specific property )

## GrahpQL

- Type Defination / Schema
- Resolvers
  - args
  - parents
  - context
- Query
- Mutation
- Subscription

## Testing

- Smoke
  - Acceptance
    - Alpha
    - Beta
- Sanity
  - Regression

## Folders

```md
- lib
- adapter
- client
- commons
  - const
  - helpers
  - enums
- services
- utils
- errors
  - pg_errors
  - node_errors
```

#### Client

```md
- feature
- pages
- modules
```

### Backend Summary

- Documentation
- Meet NFR's

- Authentication + Authorize
- Bussiness logic API's
- Infra logic / Setup

### Common Services

- Public
  - helpdesk
- Private
  - acc
  - cms
  - rbac
  - payment
  - reporting
  - analytics
  - notification

### Sasification Module

- MVP
- RBAC
- Notification + Testing + Static Code Analysis
- Implementation of the common requirement
  Ex: Client 1 + Client 2

### Documentation

- Functional requirement
- Non functional requirement
- Dependency graph
- Mock design
- Prop design
- Data flow
- Optimization

## Packages and Concepts

- Peer code review
- Monorepo
- Typescript
- Better folder structure
- Reusable
- Simple
- Maintainable code
- Communication skills
- Gitflow
- Static code analysis
  - Husky
  - ESLint
  - Preitter
  - Storybook
  - Lint-Staged
- Strong state management

---

- Prometheus
- ProQL
- Alert Manager

```md
Alert (to) => Notification

- Email
- SMS
- Slack
```

- Exporter
- Grafana

---

- pm2
- swagger
- rate limiting
- api versioning
- changelog
- maturity model
- jaeger
- elastic stack
- strapi
- backoff & retry
  - p-retry
  - retry
  - promise-retry
  - retry-as-promised

---

- Typescript as a dev tool
- MFE => more of a configuration & refactor
- Nest.js => its mostly abt refactoring express app

- MERN ( MEN Stack )

---

- Hydration
- Patrial Hydration
- Island architecture
- CSR
- SSR
- SSG
- Lazy hydration
- Active hydration

- Lazy loading
- Code splitting

---

- React window
- React error boundry
- React is
- Zod
- classnames
- standard version
- lodash
- useHook
- nvm
- Web worker
- Weblet
- Service worker
- indexDB
- keycloak
- strapi
- graphql
- redux

```md
- Get better at
  - Parallel Query
  - Dependent Query
```

- JS to TS
- Search by \_id
- Search by fieldname
- Update a specific field

- Dermio data lake

---

- Divide backend into services
- Frontend into views

  - 360 view
  - sa

- Separate monorepo for frontend
- Roadmap based on the phases
  - school
  - public features
- cschool ( csh plateform )

---

- google => [lat, long]
- mongoDB => [long, lat]

- Geo location
- Picture upload
- PDF upload
- Clean-up
- MongoDB relationship

  - 1 School
    => many Teachers
    => many Students
    => many Reviews

  - 1 School
    => 1 Campus overview

---

- Media API
  - Create/Add image to school
  - Remove images

### Image checks

```md
- Image type
- Size
- limit
- Role of who is trying to add an image
```

- Geo location
- Ratios

  - add new ratio to a school with its status
  - change its old status
  - new ratio must be pushed into the ratios array
  - pull / remove an ratio from the array

---

- PDF upload in the brochure model
- School logo update
- General update API to any field in an API
