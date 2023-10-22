---
title: "Microsoft Edgeで崩れる 100vwの罠"
date: "2023-10-22"
categories:
  - "windows"
  - "programming"
  - "edge"
  - "microsoft"
  - "web"
tags:
  - "windows"
  - "プログラミング"
  - "css"
  - "edge"
  - "microsoft"
  - "100vw"
---

![Microsoft Edgeくん! 100vwで、はみチンしてるよ!!](./images/ogp.png)

## 100vwは危険

最近のMicrosoft Edgeのアップデートにより、表示領域の縁が太くなりました。  
ですが、CSSで100vwを指定すると、表示領域の縁の分も含まれてしまいます。  
そのため、スクロールバーが表示されてしまいます。

![スクロールバーが表示されてしまう](./images/image1.png)

## 解決策

100vwを使用せずに、100%のみで指定することで、スクロールバーが表示されなくなります。

```css
width: 100%;
```

## まとめ

- Microsoft Edgeのアップデートにより、表示領域の縁が太くなった
- 100vwを使用すると、表示領域の縁の分も含まれてしまう
- 100%のみで指定することで、スクロールバーが表示されなくなる

やっぱりMicrosoft Edgeはクソです。  
IE系ではないだけマシなだけで、やっぱりやらかしているMicrosoft Edge。  
Microsoft Edgeは、Chromium(Chromeのオープンソース版)を使用しているはずなのに、ガラパゴス仕様を盛り込むという、Microsoftらしい仕様です。  
ふざけんな。  
以上!
