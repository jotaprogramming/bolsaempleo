# Jobcenter

Document in [English](en-README.md)\
Documento en [Español](es-README.md)

---

## Summary

Development of an employment exchange for a higher education institution, as a degree project for a systems engineering degree.

## Members

Jerson Guerrero <jy.guerrero22@gmail.com>\
Juan Rincón

## Development guide

## Commands

### Server

Transpiling code:
```bash
npm run build
```

Server up regardless of errors:
```bash
npm run test
```

Development server up:
```bash
npm run dev
```

Development server watching:
```bash
npm run watch
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