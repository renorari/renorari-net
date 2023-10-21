---
title: "Linuxでパーティションテーブルを消す方法"
date: "2023-10-21"
categories: 
  - "programming"
  - "linux"
  - "server"
tags: 
  - "renorari"
  - "れのらり"
  - "パーティションテーブル"
  - "消す"
  - "Linux"
  - "Ubuntu"
---

![ogp](./images/ogp.png)

## はじめに

本記事で紹介するコマンドは、物理ドライブ(HDDやSSDなど)の情報を削除する作業です。  
作業を行うと、ドライブのデータは削除されますので、注意してください。

本記事では、GPTパーティションテーブルのドライブから、パーティションテーブルを削除するコマンドの紹介です。

## wipefsを使った方法

`wipefs`コマンドを使うと、物理ドライブの情報を削除することができます。  
`wipefs`コマンドは、`util-linux`パッケージに含まれています。  
`util-linux`パッケージは、Ubuntuなどの多くのLinuxディストリビューションでデフォルトでインストールされていますので、インストールする必要はありません。

### ドライブがGPTパーティションテーブルか確認する

`wipefs`コマンドを使う前に、ドライブがGPTパーティションテーブルか確認します。  
`parted`コマンドを使って、ドライブの情報を確認します。

```bash
sudo parted /dev/sda print
```

`parted`コマンドの実行結果で、`Partition Table`が`gpt`になっていることを確認します。

```bash
Model: ATA WDC WD5001AALS-0 (scsi)
Disk /dev/sda: 500GB
Sector size (logical/physical): 512B/512B
Partition Table: gpt
Disk Flags:

Number  Start   End     Size    File system  Name  Flags
 1      1049kB  1128MB  1127MB  fat32              boot, esp
 2      1128MB  3276MB  2147MB  ext4
 3      3276MB  500GB   497GB
```

### ドライブの情報を削除する

`wipefs`コマンドを使って、ドライブの情報を削除します。

```bash
sudo wipefs -af /dev/sda
```

### ドライブの情報が削除されたか確認する

また、`parted`コマンドを使って、ドライブの情報を確認します。

```bash
sudo parted /dev/sda print
```

`parted`コマンドの実行結果で、`Partition Table`が`unknown`になっていることを確認します。

```bash
Error: /dev/sda: unrecognised disk label
Model: ATA WDC WD5001AALS-0 (scsi)
Disk /dev/sda: 500GB
Sector size (logical/physical): 512B/512B
Partition Table: unknown
Disk Flags:
```

## 終わりに

本記事では、GPTパーティションテーブルのドライブから、パーティションテーブルを削除するコマンドの紹介でした。  
パーティションの削除の記事はあるのに、パーティションテーブルの削除の記事がなかったので、本記事を書きました。  
お役に立てれば幸いです。
