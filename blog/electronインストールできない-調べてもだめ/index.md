---
title: "Electronインストールできない -> 調べてもだめ"
date: "2022-12-11"
categories: 
  - "electron"
  - "linux"
  - "node-js"
  - "npm"
  - "programming"
tags: 
  - "electron"
  - "js"
  - "linux"
  - "node-js"
  - "npm"
  - "perm"
  - "reject"
  - "renorari"
  - "tls"
  - "ubuntu"
  - "unauthorized"
  - "unsafe"
  - "プログラミング"
  - "れのらり"
---

## Electron インストールできないと調べてみた

electron cannot install on ubuntuって調べても、

\--unsafe-perm=true!

\--unsafe-perm=true!

\--unsafe-perm=true!

\--unsafe-perm=true!!!!!

これしか出てこない...

↑これをつけて

```
npm install electron --unsafe-perm=true
```

これでできるならこの記事読む必要ないね！

## これでできない人は絶対読め

ちなみに筆者はこれで半日費やした(ガチ)

なんでできなかったって言うとTLSが邪魔して、保存できてなかったっていうことらしい

なので、NodeJSの環境変数でNODE\_TLS\_REJECT\_UNAUTHORIZEDを0にしてしまえば！

できるってわーけ！

```
NODE_TLS_REJECT_UNAUTHORIZED=0 npm install electron --unsafe-perm=true
```

これで良かったんだよね。

今日の5時間返してほしいね。

疲れたね。

マジで副環境は持つべきだけど、持たないほうがいい

※今回は副環境のUbuntuでの出来事でした。

ぴえん
