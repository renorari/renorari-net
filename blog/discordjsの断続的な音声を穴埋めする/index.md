---
title: "Discord.jsの断続的な音声を穴埋めする"
date: "2024-04-27"
categories:
  - "discord"
  - "nodejs"
  - "voice"
tags:
  - "discord"
  - "discordjs"
  - "voice"
  - "stream"
  - "nodejs"
  - "programming"
  - "opus"
  - "audio"
  - "receiver"
  - "connection"
---

![ogp](./images/ogp.png)

この記事は、Discord.jsで受信できる断続的な音声の穴埋めをするストリームのメモです。

```ts
class fillSilenceStream extends stream.Transform {
    current: Buffer[];
    interval: NodeJS.Timeout;

    constructor(rate: number = 48000, channels: number = 1, frameSize: number = 960) {
        super();
        this.current = [];
        this.interval = setInterval(() => {
            if (this.current.length === 0) {
                this.push(Buffer.alloc(frameSize * 2 * channels));
            } else {
                this.push(this.current.shift());
            }
        }, 1000 / (rate / frameSize));
    }

    _write(chunk: Buffer, encoding: BufferEncoding, callback: (error?: Error | null | undefined) => void): void {
        this.current.push(chunk);
        callback();
    }

    _read() {}
}
```
