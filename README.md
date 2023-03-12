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

## Функциональные требования

Пользователь API делает запрос с личными данными заемщика и информацией о его займе. Сервис проверяет эту информацию по
различным источникам и выдает ответ `Decision` со статусом и, при необходимости, сообщением, содержащим причину отказа.

## REST API

Клиенты (Client):
```
  Int      id
  DateTime createdAt
  DateTime updatedAt

  String  name
  String  surname
  String? patronym
  String  mobilePhone
  String  email

  String birthDate
  Int    gender

  String passport
  String inn
  String snils

  String address 

  String education
  Int    income
  String incomeSource
```
- GET `/clients`
- GET `/clients/{client_id}`
- GET `/clients/{client_id}/applications`
- GET `/clients/{client_id}/decisions`
- POST `/clients`
- PATCH `/clients/{client_id}`

Заявки (Application):
```
  Int      id
  DateTime createdAt
  DateTime updatedAt

  Int clientId

  DateTime applicationDate
  DateTime expirationDate

  Int    loanAmount
  String purpose
```

Решения (Decision):
```
  Int      id
  DateTime createdAt
  DateTime updatedAt

  Int clientId
  Int creditScoreId
  Int applicationId

  String  status
  String? message
```

- POST `/decisions` - передается `id` существующего клиента и заявка
- POST `/decisions/full` - передается новый клиент и заявка
