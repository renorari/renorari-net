---
title: "MySQLでユーザー作成からテーブル作成まで"
date: "2024-06-21"
categories: 
  - "mysql"
tags: 
  - "mysql"
  - "mysqlユーザー作成"
  - "mysqlテーブル作成"
  - "mysqlデータベース作成"
  - "mysqlユーザー権限"
---

![OGP](images/ogp.png)

この記事では、MySQLでユーザー作成からテーブル作成までを書いていきます。

## ユーザー作成

まずは、ユーザーを作成します。

```sql
CREATE USER 'new_user'@'%' IDENTIFIED BY 'password';
```

`new_user` と `password` は、それぞれユーザー名とパスワードです。  
`%` は、どのホストからでも接続できるようにするための指定です。  
(例えば、`localhost` に接続できるようにする場合は、`localhost` と指定します)

## 権限付与

次に、ユーザーに権限を付与します。

```sql
GRANT ALL PRIVILEGES ON *.* TO 'new_user';
```

## 権限更新

権限を更新する場合は、以下のようにします。

```sql
FLUSH PRIVILEGES;
```

## データベース作成

データベースを作成する場合は、以下のようにします。

```sql
CREATE DATABASE new_database;
```

## テーブル作成

テーブルを作成する場合は、以下のようにします。

```sql
CREATE TABLE new_table (
  id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(255) NOT NULL
);
```

`new_table` は、テーブル名です。

## おまけ

今後、MySQLで使うであろうwhereやorder byなどの基本的なクエリをまとめておきます。

```sql
SELECT * FROM new_table WHERE id = 1;
SELECT * FROM new_table ORDER BY id DESC;
```

以上で、MySQLでユーザー作成からテーブル作成までを終わります。
