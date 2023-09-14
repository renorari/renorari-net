---
title: "私がサクッと認証付きで Node.js からメールを送った話"
date: "2022-03-15"
categories: 
  - "node-js"
  - "programming"
tags: 
  - "js"
  - "mail"
  - "node-js"
  - "nodemailer"
  - "renorari"
  - "zoho"
  - "ぶろく"
  - "プログラミング"
  - "メール"
  - "れのらり"
---

## 認証付きで Node.js からメールを送るのは初心者には難しい?

人によって難易度は違うように感じますが、これはそこそこ難しいと思います。  
どうしても、エラー文が分かりにくく解決策も簡単に見せてはくれません。  
なので、挑戦するときは **挑戦して成功した人** と一緒に挑戦するといいでしょう。

## 必須条件

- Node.js が扱える・動かせる
- メール・Node.js についての知識がそこそこある
- サーバーとドメインがある
- サーバーで、すでに Node.js 製の何か(Web サーバー等)があり、ドメインの設定等が済んでいる

## Zoho 契約

### 無料で使える Zoho メールサービスに契約

[Zoho 公式サイト](https://mail.zoho.com/)にアクセスして、契約してください。  
契約はサイトの通りにしてください。

### Zoho メールサービスのセッティング

このサービスのセットアップウィザードは、非常に分かりやすいのでここに記載する必要はないでしょう。

### おっと！

Zoho のメールサービスのセットアップウィザードが便利すぎて、ここで解説することがなくなってしまいました!  
どうしましょう?

大切なことを忘れてませんか?  
この記事は、Node.js でメールを送信することを目標にしています。  
はい、ということでここからは Node.js を使ってメールを送信の方法を説明していきます!

## Node.js でメールを送信!

Node.js でメールを送信するには、「nodemailer」というパッケージが便利です。

```shell
npm install nodemailer nodemailer-smtp-transport
```

と入力してインストールしてください。

次は、Node.js でコードを書いていきます。

```js
//おなじみrequire
var mail = require("nodemailer");
//メールのパラメータ
var mailParam = {
    "host":"smtp.zoho.com",
    "port":465,
    "auth": {
        "user": "test@renorari.net",//ここはZohoで設定したものに!
        "pass": "renorari_is_god"//Zohoアカウントの設定 > セキュリティ > アプリ専用パスワード　で取得したパスワード
    }
};
//メール送信後のコールバック
var callback = (err, result) => {
    if (err) {
        console.log("メール送信エラー: " + err);
    } else {
        console.log("メール送信完了!: " + result);
    };
};
//送信
var smtp = mail.createTransport("SMTP", mailParam);
smtp.sendMail({
    from: "メール送信テスト <test@renorari.net>",
    to: "your.address@example.com",
    subject: "メール送信テスト",
    text: "テストのメール！"
}, callback);
```
