---
title: "htsvoice作るメモ Part1"
date: "2023-09-24"
categories: 
  - "hts"
  - "programming"
  - "speech-synthesis"
tags: 
  - "hts"
  - "tts"
  - "kana"
  - "renorari"
  - "voice"
  - "プログラミング"
  - "れのらり"
  - "音声合成"
---

![ogp](./images/ogp.png)

## はじめに

htsvoiceを作るときのメモです。  
今回は、Ubuntu 22.04.3 LTSで作業をしました。  

この記事は、前編と後編に分かれていて、前編では、準備とテストを行います。  
メモ程度の記事ですので、ある程度ドキュメントを確認するなどして、自分で調べてください。

## 必要なパッケージをインストール

```bash
sudo apt update
sudo apt install -y build-essential autoconf python3 ffmpeg sox libsox-fmt-all libpulse-dev libasound-dev hts-voice-nitech-jp-atr503-m001 cmake curl csh libx11-dev flac jq julius sudo open-jtalk open-jtalk-mecab-naist-jdic unzip
```

## 必要なファイルをダウンロード

- [segment_adapt_windows-v1.0.zip](https://www.dropbox.com/s/vvzl4yg4rwcdjol/segment_adapt_windows-v1.0.zip)
- [HTS-2.3_for_HTK-3.4.1.tar.bz2](http://hts.sp.nitech.ac.jp/archives/2.3/HTS-2.3_for_HTK-3.4.1.tar.bz2)
- [hts_engine_API-1.10.tar.gz](http://downloads.sourceforge.net/hts-engine/hts_engine_API-1.10.tar.gz)
- [SPTK-3.10.tar.gz](http://downloads.sourceforge.net/sp-tk/SPTK-3.10.tar.gz)
- [HTS-demo_NIT-ATR503-M001.tar.bz2](http://hts.sp.nitech.ac.jp/archives/2.3/HTS-demo_NIT-ATR503-M001.tar.bz2)
- Stable release (3.4.1) ＞ Linux/Unix downloads ＞ HTK source code -> HTK-3.4.1.tar.gz  
[http://htk.eng.cam.ac.uk/download.shtml](http://htk.eng.cam.ac.uk/download.shtml)  
- HDecode Download Stable Release (3.4.1) ＞ Linux/Unix downloads -> HDecode-3.4.1.tar.gz  
[http://htk.eng.cam.ac.uk/prot-docs/hdecode.shtml](http://htk.eng.cam.ac.uk/prot-docs/hdecode.shtml)  

## 展開とビルド

### Segment Adapt

```bash
unzip segment_adapt_windows-v1.0.zip
```

多少の修正が必要ですので、パッチを当てます。

```bash
wget https://renorari.net/blog/htsvoice%E4%BD%9C%E3%82%8B%E3%83%A1%E3%83%A21/files/segment_adapt_windows-v1.0.patch
cd segment_adapt_windows-v1.0
patch -p1 -d . < ../segment_adapt_windows-v1.0.patch
cd ../
```

このプログラムは自分で用意した音声データをHTSのDemoに使うためのものです。

### HTK と HDecode

```bash
tar zxvf HTK-3.4.1.tar.gz
tar zxvf HDecode-3.4.1.tar.gz
mkdir HTS-2.3_for_HTK-3.4.1
tar jxvf HTS-2.3_for_HTK-3.4.1.tar.bz2 -C HTS-2.3_for_HTK-3.4.1
cp HTS-2.3_for_HTK-3.4.1/HTS-2.3_for_HTK-3.4.1.patch htk
cd htk
patch -p1 -d . < HTS-2.3_for_HTK-3.4.1.patch
./configure
CURRENT=$(pwd)
make CFLAGS="-DARCH=ASCII -I$CURRENT/HTKLib"
sudo make install
sudo cp -r /usr/local/HTS-2.3/bin /usr/local/
cd ../
```

### HTS Engine API

```bash
tar zxvf hts_engine_API-1.10.tar.gz
cd hts_engine_API-1.10
./configure
make
sudo make install
cd ../
```

### SPTK

```bash
tar zxvf SPTK-3.10.tar.gz
cd SPTK-3.10
./configure
make CFLAGS="-z muldefs"
sudo make install
cd ../
```

## HTS Demoを動かす

※試すときは、data/raw/のファイルをa01からa10くらいまでにしておくと早く試せます。

多少の修正が必要ですので、パッチを当てます。

```bash
tar jxvf HTS-demo_NIT-ATR503-M001.tar.bz2
wget https://renorari.net/blog/htsvoice%E4%BD%9C%E3%82%8B%E3%83%A1%E3%83%A21/files/HTS-demo_NIT-ATR503-M001.patch
cd HTS-demo_NIT-ATR503-M001
patch -p1 -d . < ../HTS-demo_NIT-ATR503-M001.patch
./configure
make
```
