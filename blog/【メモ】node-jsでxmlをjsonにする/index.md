---
title: "【メモ】Node.jsでxmlをjsonにする"
date: "2022-04-09"
categories:
  - "node-js"
  - "programming"
  - "変換"
tags:
  - "file"
  - "fs"
  - "js"
  - "json"
  - "node-js"
  - "parse"
  - "read"
  - "renorari"
  - "string"
  - "sync"
  - "xml"
  - "xml-to-json"
  - "xml2js"
  - "xml2json"
  - "xmlをjson"
  - "コピペ"
  - "ソースコード"
  - "プログラミング"
  - "れのらり"
  - "変換"
---

## 動作環境

<table><tbody><tr><th>OS</th><td>Windows11 (21H2)</td></tr><tr><th>Node.js</th><td>v17.3.1</td></tr><tr><th>npm</th><td>8.5.1</td></tr><tr><th>xml2js</th><td>0.4.23</td></tr></tbody></table>

## 必須モジュール

今回使用するのはxml2jsです。

```
npm install xml2js
```

## ソースコード

file.xmlを文字コードutf-8として読み込み、コンソールにログとしてオブジェクトを表示します。

```
const { readFileSync } = require("fs");
const { parseString } = require("xml2js");

parseString(readFileSync("file.xml", "utf-8"), (err, result) => {
  if (err) {
    console.error(err);
  } else {
    console.log(result);
  }
});
```
