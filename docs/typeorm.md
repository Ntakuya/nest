[これ](https://qiita.com/Gma_Gama/items/f862e7497a9c279b00da)の続きです

# Nx で作成した nestjs のプロジェクトを mysql と接続する

### Table of Contents

0. docker で簡易的に mysql を作成
1. MySql などのデータベースと接続
2. MySql のデータベースと接続(typeorm を用いて application を接続する)

## 1. docker で簡易的に mysql を作成

現行のディレクトリ構成は以下のような形を想定しています。

```terminal
$ tree -L 1 -I node_modules
├── README.md
├── apps
│   └── nestjs-sample
│       ├── jest.config.js
│       ├── src
│       │   ├── app
│       │   │   ├── app.controller.spec.ts
│       │   │   ├── app.controller.ts
│       │   │   ├── app.module.ts
│       │   │   ├── app.service.spec.ts
│       │   │   ├── app.service.ts
│       │   │   └── todo
│       │   ├── assets
│       │   ├── environments
│       │   │   ├── environment.prod.ts
│       │   │   └── environment.ts
│       │   └── main.ts
│       ├── tsconfig.app.json
│       ├── tsconfig.json
│       └── tsconfig.spec.json
├── jest.config.js
├── libs
├── nx.json
├── package.json
├── tmp
│   └── apps
│       └── nestjs-sample
│           └── tsconfig.generated.json
├── tools
│   ├── schematics
│   └── tsconfig.tools.json
├── tsconfig.base.json
├── workspace.json
└── yarn.lock
```

次に簡易的に mysql のイメージを持った docker file を作成します。

```
$ touch docker-compose.yml
$ touch Dockerfile
```

docker-compose の中身を記載します。

```docker-compose.yml
version: '3.8'
services:
  db:
    container_name: nestjs-sample-db
    image: mysql:5.7
    tty: true
    restart: always
    environment:
      MYSQL_DATABASE: nestjs-sample-db
      MYSQL_ROOT_PASSWORD: password
      MYSQL_USER: nestjs-sample-db
      MYSQL_PASSWORD: password
    ports:
      - '3306:3306'

```

Docker の中身は以下にします。

```Dockerfile
FROM mysql:5.7
```

docker の起動をしておきます。

```
$ docker-compose up
```

## 2. MySql のデータベースと接続(typeorm を用いて application を接続する)

実施するのはこの章のため、[公式ドキュメント](https://docs.nestjs.com/techniques/database)で対応したい方はこっちの方がいいと思います。

やることは一緒で、

1. TypeORM の install
2. TypeORM の有効化

を実施していきます。

### 2-1. TypeORM の install

依存関係の module を install します。

```terminal
$ yarn add @nestjs/typeorm typeorm mysql
```

### 2-2. TypeORM の有効化

app.module.ts\_を編集して、TypeORM を有効化していきます。

現状の app.module.ts は以下です。

```app.module.ts
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

```

ここに TypeOrm の設定を追記します。

```app.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm'; ##ここを追記
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
  ##ここから追記
    TypeOrmModule.forRoot({
      type: "mysql",
      host: "localhost",
      port: 3306,
      username: "nestjs-sample-db",
      password: "password",
      database: "nestjs-sample-db",
      entities: ["dist/**/*.entity{.ts,.js}"],
      "synchronize": true
    }),,
  ##ここまで追記
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

```

公式ドキュメントでいくとこれで完了なのですが、Entity の設定をよみこまないので TypeormModule.forRoot に以下に変更します。

```app.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: "mysql",
      host: "localhost",
      port: 3306,
      username: "nestjs-sample-db",
      password: "password",
      database: "nestjs-sample-db",
      entities: [], ##ここ変更
      autoLoadEntities: true,
      synchronize: true　##ここ変更
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
```

"@nrwl/workspace": "10.3.1"だと、この設定だけだとうまく接続と、database の relation がうまくいかないのでいつか記載します.(11/7 時点で issue が上がっているが解決はしていない + tsconfig の書き換えでうまくいくが。。。って感じです)
