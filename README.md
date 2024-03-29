# Bonuts.ru  client v2

## Project structure
```bash 
└── src
    ├── shared  #Base components that that could be extracted easily
    │   ├── drawer
    │   ├── BNTToolbar
    │   ├── BNTTypography
    │   ├── buttons
    │   ├── loader
    │   └── menu
    ├── components #App specific components
    │   ├── app #component wrappers
    │   ├── buttons
    │   ├── event-card
    │   ├── header
    │   ├── layout #main layout
    │   ├── main-menu
    │   ├── opearation-text
    │   ├── sidebar
    │   └── switch-routes
    ├── config
    ├── constants
    ├── context
    ├── hooks  #General hooks all stuff excluding business hooks
    ├── hooks
    │   └── hooks  #business hooks all business operations goes here
    ├── pages
    │   ├── account-operations-page
    │   ├── dashboard-page
    │   ├── donut
    │   ├── home-page
    │   ├── login-page
    │   ├── logout-page
    │   ├── not-found-page
    │   ├── people-page
    │   ├── profile-page
    │   ├── recover-page
    │   ├── registration-page
    │   ├── requests
    │   │   ├── active-requests-page.tsx
    │   │   ├── closed-requests-page
    │   │   ├── incoming-requests-page
    │   │   ├── my-requests-page
    │   │   └── requests-page
    │   ├── restore-password-page
    │   ├── settings-page
    │   ├── statistics-page
    │   └── tenants-list-page
    ├── routes
    ├── services
    │   ├── api
    │   ├── localization
    │   ├── hooks-hooks  #Business hooks hooks
    │   ├── middlewares
    │   ├── redux
    │   ├── store-manager
    │   └── adaptor   #Holds methods for translating api responses to a client hooks model
    ├── themes
    └── types
    │   ├── api
    │   ├── context
    │   ├── model
    │   └── theme
```
## Available Scripts

In the project directory, you can run:
### `yarn install`
### `yarn start`



