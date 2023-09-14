---
title: "Windowsでnode-gypが成功した話"
date: "2022-03-15"
categories:
  - "node-js"
  - "programming"
tags:
  - "build"
  - "js"
  - "node-gyp"
  - "node-js"
  - "npm"
  - "python"
  - "renorari"
  - "tensorflow"
  - "tools"
  - "visual-studio"
  - "windows"
  - "プログラミング"
  - "れのらり"
---



## エラーが出る人は下準備をしていない?!

エラーが出るのはnode-gypの基準に満たしてないかも! [node-gyp公式サイト](https://github.com/nodejs/node-gyp#on-windows)に詳しい情報が載ってるので英語が得意な人は読んでみてください。

## 下準備

以下のことを順番通りにしてみてください!

## Pythonのインストール

まず、Pythonをインストールしてください。 [Microsoft StoreのPython](https://docs.python.org/3/using/windows.html#the-microsoft-store-package)をおすすめします。

## Visual Studio Build Toolsのインストール

Pythonの次に、[Visual Studio Build Tools](https://visualstudio.microsoft.com/thank-you-downloading-visual-studio/?sku=BuildTools)が必要です。 「Visual C++ build tools(Visual C++ビルドツール) ワークロード」もしくは、「Desktop development with C++(C++によるデスクトップ開発) ワークロード」をインストールしてください。 私の環境では、Visual Studio Build Tools 2019をインストールしました。

## npmのコンフィグの設定

大半の人はこの設定をしていないのでしょうか? コマンドプロンプトもしくはPowershell等の、npmが使えるものを起動してください。 起動したら、

```shell
npm config set msvs_version インストールしたバージョン
```

を入力してエンターキーを押します。 ※インストールしたバージョンは、先ほどインストールしたVisual Studio Build Toolsのバージョンを入れてください。(私の場合は2019です。)

## 下準備完了

これでおそらくWindowsでnode-gypのエラーを見ることはないでしょう。 試しにTensorFlow.jsのNode.js版をインストールしてみてください!
