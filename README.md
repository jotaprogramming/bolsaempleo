# Jobcenter

Document in [English](en-README.md)\
Documento en [Español](es-README.md)

## Summary

Development of an employment exchange for a higher education institution, as a degree project for a systems engineering degree.

## Members

Jerson Guerrero <jy.guerrero22@gmail.com>\
Juan Rincón

---

## Table of Contents

- [Jobcenter](#jobcenter)
  - [Summary](#summary)
  - [Members](#members)
  - [Table of Contents](#table-of-contents)
  - [Development guide](#development-guide)
    - [MVC Diagram](#mvc-diagram)
    - [Folder structure](#folder-structure)
  - [Commands](#commands)
    - [Server](#server)
    - [Prisma](#prisma)
    - [Prettier](#prettier)

## Development guide

### MVC Diagram

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