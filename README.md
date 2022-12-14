---
TOCTitle: "Job board"
pageTitle: Web portal of a job board
metaDescription: Web portal of a job board as a degree project
author: "Jerson Guerrero"
date: "2022-30-10"
---

# :book: Job board

![dependencies](https://img.shields.io/depfu/dependencies/github/jotaprogramming/bolsaempleo)
[![doc_in_english](https://img.shields.io/badge/Project_documentation-English-blue)](en-README.md)
[![doc_in_spanish](https://img.shields.io/badge/Documentación_del_proyecto-Español-orange)](es-README.md)

## Summary

Development of an employment exchange for a higher education institution, as a degree project for a systems engineering degree.

## Members

Jerson Guerrero <jy.guerrero22@gmail.com>\
Juan Rincón

---

## Table of Contents

- [:book: Job board](#book-job-board)
  - [Summary](#summary)
  - [Members](#members)
  - [Table of Contents](#table-of-contents)
  - [Development guide](#development-guide)
    - [Folder structure](#folder-structure)
  - [Dependencies](#dependencies)
  - [Commands](#commands)
    - [Server](#server)
    - [Prisma](#prisma)
    - [Prettier](#prettier)
  - [External links](#external-links)

## Development guide

### MVC

![mvc](./drawings/MVC.svg)

### Folder structure

```bash
.
├── build #Source code transpiled to JavaScript
├── drawings #Figures and illustrations for documentation
├── node_modules #NodeJs Modules [ignore by GIT]
├── prisma #Prism Schematic
├── public #Static files that will not be transpiled to JavaScript
├── src #Source code of the application in TypeScript language
├── .env #Environment variables [ignore by GIT]
├── .gitignore #Files and folders that will be ignored by GIT when pushing code to remote repository
├── .prettierignore #Files and folders to be ignored by Prettier during project formatting
├── .prettierrc.json #Prettier configuration
├── en-README.md #Project documentation in English
├── es-README.md #Project documentation in Spanish
├── package-lock.json #
├── package.json #
├── README.md #Useful documentation for application development
└── tsconfig.json #TypeScript configuration
```
```bash
public ─┐
        ├── assets #Figures
        ├── scripts #JavaScript code that executes client-side
        └── stylesheets #Styling of HTML documents
```
```bash
src ────┐
        ├── components #Independent and reusable code fragments
        ├── config #Configuration files
        ├── controllers #Route controllers and intermediary between models and views
        ├── interfaces #Mandatory contracts to be implemented
        ├── middlewares #Access functions to request and response objects
        ├── models #Business logic
        ├── repositories #Repository pattern for accessing data
        ├── routes #Routing
        ├── settings #Application features, settings or options
        ├── tests #Unit and integration testing
        ├── utils #Utility functions
        ├── views #Pages and partitions following EJS structure
        ├── app.ts #Express App
        └── index.ts #Server
```

## Dependencies

[![express](https://img.shields.io/badge/Express-v4.18.2-yellow)](https://github.com/expressjs/express)
[![ejs](https://img.shields.io/badge/EJS-v3.1.8-green)](https://github.com/expressjs/express)
[![prisma](https://img.shields.io/badge/PrismaClient-v4.6.0-blue)](https://github.com/prisma/prisma)

## Commands

### Server

Transpiling code:
```bash
npm run build
```
Unit testing:
```bash
npm run utest
```

Development server up:
```bash
npm run dev
```

Development server watching:
```bash
npm run watch
```

Server up regardless of errors:
```bash
npm run tsnto
```

Production server up:
```bash
npm run start
```

### Prisma

Load the schematics:
```bash
npx prisma db pull
```

Generate Prisma Client:
```bash
npx prisma generate
```

### Prettier

Format all code:

```bash
npx prettier --write .
```

Formatting a part of the code:

```bash
npx prettier --write <folder>/
```
or

```bash
npx prettier --write <folder>/<file>
```

## External links

[Error message reference - Prisma](https://www.prisma.io/docs/reference/api-reference/error-reference)

[HTTP Response status code - MDN Web Docs](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status)
