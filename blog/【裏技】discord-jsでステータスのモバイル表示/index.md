---
title: "【裏技】discord.jsでステータスのモバイル表示"
date: "2022-04-05"
categories:
  - "android"
  - "api"
  - "discord"
  - "discord-js"
  - "kana"
  - "node-js"
  - "programming"
tags:
  - "android"
  - "api"
  - "discord"
  - "discord-js"
  - "js"
  - "node-js"
  - "renorari"
  - "プログラミング"
  - "れのらり"
---



## 動作確認済み

<table><tbody><tr><th>Node.js</th><td>v17.3.1</td></tr><tr><th>Discord.js</th><td>v13.6.0</td></tr></tbody></table>

## ソースコード

Clientの宣言のところ

```
const client = new Client({ intents: [Intents.FLAGS.GUILDS] });
```

これを

```
const client = new Client({ intents: [Intents.FLAGS.GUILDS], ws: { properties: { $browser: 'Discord Android' } } });
```

このようにすると、表示がモバイル端末になります!

## 注意

この方法では、discord.jsで動いているボットをDiscord公式のAndroidアプリに見せかけて動かしています。
そのため、グレーな部分があるので使用には十分注意してください。
