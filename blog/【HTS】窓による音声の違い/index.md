---
title: 【HTS】窓による音声の違い
date: "2024-04-24"
categories: 
  - "hts"
  - "speech synthesis"
tags: 
  - "hts"
  - "speech synthesis"
  - "音声合成"
  - "hts_engine"
  - "OpenJTalk"
---

![ogp](./images/ogp.png)

この記事は、KanaVoice:VoiceAを作る際に検証を行った結果をまとめたものです。  
HTS Demoを動かし、hts_engineで音声を生成しました。  
メモ程度の内容ですが、参考になれば幸いです。

## HTS Demoで指定できる窓の種類

HTS Demoで指定できる窓の種類は3種類あり、以下の通りです。

- Blackman
- Hamming(デフォルト)
- Hanning

## 各窓で音声を生成した結果

それぞれの窓で音声を生成し、比較しました。

学習データは、KanaVoice:VoiceAに使用した音声のうち20個を使用しました。  
量が少ないため、あまり精度は出ません、ご了承ください。

### Blackman

<audio controls src="./audio/blackman1.wav"></audio>
<audio controls src="./audio/blackman2.wav"></audio>

### Hamming

<audio controls src="./audio/hamming1.wav"></audio>
<audio controls src="./audio/hamming2.wav"></audio>

### Hanning

<audio controls src="./audio/hanning1.wav"></audio>
<audio controls src="./audio/hanning2.wav"></audio>

## 結果とまとめ

窓の種類によって音声の違いがあることがわかりました。  
個人的には、デフォルトのHammingが音割れなく、音声が綺麗に聞こえると感じました。

以上、窓による音声の違いについてでした。  
今回の検証にあたって、HTS Demoを使用しました。  
HTS Demoの簡単な動かし方については、[htsvoice作るメモ Part1](/blog/htsvoice作るメモ1/)をご覧ください。  
ご一読いただき、ありがとうございました!
