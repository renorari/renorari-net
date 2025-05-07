"use client";
import React, { useEffect, useRef } from "react";

import Metadata from "../../components/Metadata";

export default function BeepPage() {
    const buttonRef = useRef<HTMLButtonElement>(null);
    const audioContextRef = useRef<AudioContext | null>(null);
    const oscillatorRef = useRef<OscillatorNode | null>(null);

    useEffect(() => {
        // Web Audio API のコンテキストを初期化
        if (typeof window !== "undefined") {
            audioContextRef.current = new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();
        }
        
        return () => {
            // クリーンアップ
            if (oscillatorRef.current) {
                oscillatorRef.current.stop();
                oscillatorRef.current.disconnect();
            }
        };
    }, []);

    const startBeep = () => {
        if (!audioContextRef.current) return;
        
        // 既存の発振器を停止
        if (oscillatorRef.current) {
            oscillatorRef.current.stop();
            oscillatorRef.current.disconnect();
        }
        
        // 新しい発振器を作成
        const oscillator = audioContextRef.current.createOscillator();
        oscillator.type = "sine";
        oscillator.frequency.value = 1000;
        oscillator.connect(audioContextRef.current.destination);
        oscillator.start();
        oscillatorRef.current = oscillator;
    };

    const stopBeep = () => {
        if (oscillatorRef.current) {
            oscillatorRef.current.stop();
            oscillatorRef.current.disconnect();
            oscillatorRef.current = null;
        }
    };

    const handleKeyDown = (event: React.KeyboardEvent) => {
        if (event.key === " " && !oscillatorRef.current) {
            startBeep();
        }
    };
    
    const handleKeyUp = (event: React.KeyboardEvent) => {
        if (event.key === " ") {
            stopBeep();
        }
    };

    return (
        <>
            <Metadata title="!Beep" description="れのらりが腕時計用に作成した、放送禁止音を鳴らすプログラムを、ウェブに移植したものです。" keywords={["!Beep", "放送禁止音", "音"]} image="https://renorari.net/images/tools/beep.png" />

            <main>
                <section>
                    <h1>!Beepとは</h1>
                    <p>
                        !Beepとは、れのらりが腕時計用に作成した、放送禁止音を鳴らすプログラムを、ウェブに移植したものです。
                        <br />
                        大きな音が鳴りますので、音量にはご注意ください。
                    </p>
                </section>
                <section>
                    <h2>遊ぶ</h2>
                    下のボタンを押すと、ピー🤬という音がなります。
                    <br />
                    <button
                        id="beep"
                        ref={buttonRef}
                        onMouseDown={startBeep}
                        onMouseUp={stopBeep}
                        onTouchStart={startBeep}
                        onTouchEnd={stopBeep}
                        onKeyDown={handleKeyDown}
                        onKeyUp={handleKeyUp}
                        tabIndex={0}
                    >
                        Beep!
                    </button>
                </section>
            </main>
        </>
    );
}
