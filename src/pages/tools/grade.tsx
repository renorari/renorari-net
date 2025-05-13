"use client";

import React, { FC, useState, FormEvent, useRef } from "react";

import Metadata from "../../components/Metadata";

// 計算用ヘルパー関数
const calculateAverage = (...args: number[]): number => {
    return args.reduce((acc, cur) => acc + cur) / args.length;
};

const displayNumber = (num: number): number => {
    return Math.round(num * 10) / 10;
};

// 結果表示用コンポーネント
interface ResultProps {
    isVisible: boolean;
    alerts: string[];
    average: number;
    some: number;
    required: string;
    requiredWithoutSome: string;
}

const Result: FC<ResultProps> = ({ isVisible, alerts, average, some, required, requiredWithoutSome }) => {
    if (!isVisible) return null;

    return (
        <section id="result">
            <h3>結果</h3>
            {alerts.length > 0 && (
                <p id="alerts">{alerts.join(", ")}</p>
            )}
            <table>
                <tbody>
                    <tr>
                        <th>テストの平均点</th>
                        <td id="average">{displayNumber(average)}</td>
                    </tr>
                    <tr>
                        <th>テスト以外の点</th>
                        <td id="some">{displayNumber(some)}</td>
                    </tr>
                    <tr>
                        <td colSpan={2}></td>
                    </tr>
                    <tr>
                        <th>次のテストで必要な点</th>
                        <td id="required">{required}</td>
                    </tr>
                    <tr>
                        <th>次のテストで必要な点(その他の点なし)</th>
                        <td id="required-without-some">{requiredWithoutSome}</td>
                    </tr>
                </tbody>
            </table>
        </section>
    );
};

export default function GradePage() {
    const [last, setLast] = useState<number | undefined>();
    const [exams, setExams] = useState<number[]>([]);
    const [passing, setPassing] = useState<number>(50);
    const [rate, setRate] = useState<number>(0.8);
    const [showResults, setShowResults] = useState<boolean>(false);
    const [results, setResults] = useState({
        "alerts": [] as string[],
        "average": 0,
        "some": 0,
        "required": "",
        "requiredWithoutSome": ""
    });
  
    const resultSectionRef = useRef<HTMLElement>(null);

    const handleExamChange = (index: number, value: string) => {
        const newExams = [...exams];
        newExams[index] = value ? Number(value) : NaN;
        setExams(newExams);
    };

    const handleCalculate = (e: FormEvent) => {
        e.preventDefault();
    
        if (last === undefined) return;
    
        const validExams = exams.filter(v => !isNaN(v) && v >= 0);
    
        if (validExams.length === 0) {
            alert("テストの点数を入力してください");
            return;
        }
    
        if (rate === 0) {
            alert("テストの評価割合は0より大きい値を入力してください");
            return;
        }
    
        const average = calculateAverage(...validExams);
        const some = last - (average * rate);
        const d = 4 * (passing - some) / rate - validExams.reduce((acc, cur) => acc + cur, 0);
        const dWithoutSome = 4 * passing / rate - validExams.reduce((acc, cur) => acc + cur, 0);
    
        const alerts: string[] = [];
        if ((rate === 1 && some > 0) || some > (1 - rate) * 100 || some < 0) {
            alerts.push("テストの点数と通知表の点数が矛盾しています");
        }
    
        let requiredText = d <= 0 ? "(ほぼ単位確定)" : displayNumber(d).toString();
        let requiredWithoutSomeText = dWithoutSome <= 0 ? "(単位確定)" : displayNumber(dWithoutSome).toString();
    
        if (validExams.length !== 3) {
            requiredText += " (今後の合計)";
            requiredWithoutSomeText += " (今後の合計)";
        }
    
        setResults({
            alerts,
            average,
            some,
            "required": requiredText,
            "requiredWithoutSome": requiredWithoutSomeText
        });
    
        setShowResults(true);
    
        // 結果セクションにスクロール
        setTimeout(() => {
            if (resultSectionRef.current) {
                resultSectionRef.current.scrollIntoView({ "behavior": "smooth" });
            }
        }, 100);
    };

    return (
        <>
            <Metadata title="【高専】必須点数計算機" description="次の定期試験で必要な点数を計算するためのツールです。" keywords={["高専", "必須点数", "計算機", "定期試験"]} image="https://renorari.net/images/tools/grade.png" />

            <main>
                <section id="description">
                    <h1>【高専】必須点数計算機</h1>
                    <p>
                        【高専】必須点数計算機は、次の定期試験で必要な点数を計算するためのツールです。
                        <br />
                        過去の試験の点数と、通知表の点数を入力することで、次回のテストで必要な点数を計算することができます。
                    </p>
                </section>

                <section id="grade-calculator">
                    <h2>過去の試験の点数</h2>
                    <p>
                        以下のフォームに、過去の試験の点数を入力してください。
                    </p>
                    <form onSubmit={handleCalculate}>
                        <div className="form-group">
                            <label htmlFor="last">通知表の点数</label>
                            <input
                                type="number"
                                id="last"
                                className="form-control"
                                value={last === undefined ? "" : last}
                                onChange={(e) => setLast(e.target.value ? Number(e.target.value) : undefined)}
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label>テストの点数</label>
                            <div className="inputs test-inputs">
                                <input
                                    type="number"
                                    id="exam1"
                                    className="form-control"
                                    placeholder="1回目"
                                    min="0"
                                    max="100"
                                    value={exams[0] || ""}
                                    onChange={(e) => handleExamChange(0, e.target.value)}
                                    required
                                />
                                <input
                                    type="number"
                                    id="exam2"
                                    className="form-control"
                                    placeholder="2回目"
                                    min="0"
                                    max="100"
                                    value={exams[1] || ""}
                                    onChange={(e) => handleExamChange(1, e.target.value)}
                                />
                                <input
                                    type="number"
                                    id="exam3"
                                    className="form-control"
                                    placeholder="3回目"
                                    min="0"
                                    max="100"
                                    value={exams[2] || ""}
                                    onChange={(e) => handleExamChange(2, e.target.value)}
                                />
                            </div>
                        </div>

                        <div className="form-group">
                            <label htmlFor="passing">科目の合格点</label>
                            <div className="range-container">
                                <output>{passing}</output>
                                <input
                                    type="range"
                                    id="passing"
                                    className="form-control"
                                    min="1"
                                    max="100"
                                    step="1"
                                    value={passing}
                                    onChange={(e) => setPassing(Number(e.target.value))}
                                    required
                                />
                            </div>
                        </div>

                        <div className="form-group">
                            <label htmlFor="rate">テストの評価割合</label>
                            <div className="range-container">
                                <output>{rate}</output>
                                <input
                                    type="range"
                                    id="rate"
                                    className="form-control"
                                    min="0.01"
                                    max="1"
                                    step="0.01"
                                    value={rate}
                                    onChange={(e) => setRate(Number(e.target.value))}
                                    required
                                />
                            </div>
                        </div>

                        <button type="submit" className="btn btn-primary">計算する</button>
                    </form>
                </section>

                <section ref={resultSectionRef}>
                    <Result
                        isVisible={showResults}
                        alerts={results.alerts}
                        average={results.average}
                        some={results.some}
                        required={results.required}
                        requiredWithoutSome={results.requiredWithoutSome}
                    />
                </section>
            </main>
        </>
    );
}
