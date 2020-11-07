# Nx nrstjs のプロジェクトに Authentication を追加する

#### Table of Contents

1. Passport などの依存関係を追加する
2. Auth Module の追加

## 1. PassPort などの依存関係を追加する

```terminal
$ yarn add @nestjs/passport passport passport-local
$ yarn add @types/passport-local
$ yarn add @nestjs/jwt passport-jwt
$ yarn add @types/passport-jwt
$ yarn add bcrypt
```

## 2. Auth Module を追加する

```terminal
$ nx g @nrwl/nest:module --name=auth --project=nestjs-sample --directory=app
$ nx g @nrwl/nest:class --name=auth.entity --project=nestjs-sample --directory=app/auth/entities --flat
```
