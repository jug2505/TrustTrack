## Описание

Сервис оценки заёмщиков и страхователей TrustTrack

## Установка

```bash
$ npm install
```

## Запуск

```bash
# start database
$ npm run db:start:dev

# migrate/initialize database at first launch
$ npx prisma migrate dev
$ npx prisma generate

# start with watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```
