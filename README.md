# Nx で nestjs のみのプロジェクトを作成する

##### Table of Contents

1. Nx で nestjs のワークスペースを作成
2. Nx で nestjs のアプリケーションを作成する
3. nestjs のアプリケーションのサーバを起動する
4. CLI について

## 1. Nx で nestjs のワークスペースを作成

```
$ npx create-nx-workspace
```

```
? Workspace name (e.g., org name)     nestjs
? What to create in the new workspace
❯ empty             [an empty workspace with a layout that works best for building apps]
  oss               [an empty workspace with a layout that works best for open-source projects]
  web components    [a workspace with a single app built using web components]
  angular           [a workspace with a single Angular application]
  angular-nest      [a workspace with a full stack application (Angular + Nest)]
  react             [a workspace with a single React application]
  react-express     [a workspace with a full stack application (React + Express)]
  next.js           [a workspace with a single Next.js application]
? CLI to power the Nx workspace       (Use arrow keys)
❯ Nx           [Recommended for all applications (React, Node, etc..)]
  Angular CLI  [Recommended for Angular only workspaces]
? Use the free tier of the distributed cache provided by Nx Cloud? (Use arrow keys)
  Yes [Faster command execution, faster CI. Learn more at https://nx.app]
❯ No  [Only use local computation cache]
```

```
$ tree -L 3 -I node_modules
.
├── README.md
├── apps # 作成するapplicationが入るフォルダ
├── libs # application内部で共有するlibraryフォルダ
├── nx.json
├── package.json
├── tools
│   ├── schematics
│   └── tsconfig.tools.json
├── tsconfig.base.json
├── workspace.json
└── yarn.lock
```

## 2. Nx で nestjs のアプリケーションを作成する

```terminal
$ yarn add -D @nrwl/nest
```

```terminal
$ nx g @nrwl/nest:application nestjs-sample
```

```terminal
$ tree -L 4 -I node_modules
├── README.md
├── apps
│   └── nestjs-sample # 先ほど作成したapplicationの名前で作成されます
│       ├── jest.config.js
│       ├── src
│       │   ├── app
│       │   ├── assets
│       │   ├── environments
│       │   └── main.ts
│       ├── tsconfig.app.json
│       ├── tsconfig.json
│       └── tsconfig.spec.json
├── dist
│   └── apps
│       └── nestjs-sample
│           ├── main.js
│           └── main.js.map
├── jest.config.js
├── libs
├── nx.json
├── package.json
├── tmp
│   └── apps
│       └── nestjs-sample
│           └── tsconfig.generated.json
├── tools
│   ├── schematics
│   └── tsconfig.tools.json
├── tsconfig.base.json
├── workspace.json
└── yarn.lock

```

## 3. nestjs のアプリケーションのサーバを起動する

```terminal
$ nx serve nestjs-sample
```

[locahost:3333/api](http://localhost:3333/api)にアクセスすると下記の画面が表示されます。

上記で作成することが可能です。

## 4. CLI について

schematics が個人的にまだ発見できていない感じです。
[Nx Docs](https://nx.dev/angular/plugins/next/overview)では lib などで生成しているのですが(多分 micro service を作成するイメージなのかな？)、個人的にはまだ one application n modules の作成をしたいため、下記のようなないようでとりあえずエスケープしています。(angular を利用すれば ng command でうまく行きそうな感じしてますが、とりあえず nest だけなら)

_module の作成_

```
$ nx g @nrwl/nest:module --name=todo --sourceRoot=apps/nestjs-sample/src/app
```

_service の作成_

```
$ nx g @nrwl/nest:service --name=todo --sourceRoot=apps/nestjs-sample/src/app
```

_controller の作成_

```
$ nx g @nrwl/nest:module --name=todo --sourceRoot=apps/nestjs-sample/src/app
```

上記で作成した場合ディレクトリは下記のような形になります。

```terminal
$ tree -L 1 -I node_modules
├── README.md
├── apps
│   └── nestjs-sample
│       ├── jest.config.js
│       ├── src
│       │   ├── app
│       │   │   ├── app.controller.spec.ts
│       │   │   ├── app.controller.ts
│       │   │   ├── app.module.ts
│       │   │   ├── app.service.spec.ts
│       │   │   ├── app.service.ts
│       │   │   └── todo
│       │   ├── assets
│       │   ├── environments
│       │   │   ├── environment.prod.ts
│       │   │   └── environment.ts
│       │   └── main.ts
│       ├── tsconfig.app.json
│       ├── tsconfig.json
│       └── tsconfig.spec.json
├── jest.config.js
├── libs
├── nx.json
├── package.json
├── tmp
│   └── apps
│       └── nestjs-sample
│           └── tsconfig.generated.json
├── tools
│   ├── schematics
│   └── tsconfig.tools.json
├── tsconfig.base.json
├── workspace.json
└── yarn.lock
```
