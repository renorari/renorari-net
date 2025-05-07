import "../../../styles/licenses/main.css";

import React from "react";
import { Link } from "waku";

import Card from "../../../components/Card";
import CardList from "../../../components/CardList";
import Metadata from "../../../components/Metadata";

export default function LicensePage() {
    return (
        <>
            <Metadata title="UST素材配布利用規約 第1版" />

            <main>
                <h1>
                    UST素材配布利用規約 第1版
                </h1>
                <p>
                    れのらりによって配布されているUSTは、以下の規約範囲内であれば個人・法人、商用・非商用問わず無料でご利用いただけます。
                    <br />
                    事前の連絡やクレジット表記はNGな例をのぞいて不要ですが、ご連絡やクレジット表記をしていただけた場合は、全力で応援いたします！
                    <br />
                    お気軽にご利用ください。
                </p>

                <h2>
                    利用範囲
                </h2>
                <CardList className="two-column">
                    <Card title="OKな例" className="ok">
                        <ul>
                            <li>
                                改変を行い、USTを使用した動画を動画配信プラットフォームに投稿する
                                <br />
                                <span className="details">(動画配信プラットフォーム収益化をする場合は、全力で応援しますのでご連絡ください)</span>
                            </li>
                            <li>
                                ゲームやアプリケーション、ソフトウエア等に配USTを使用する、使用した音声等を使用する
                                <br />
                                <span className="details">(まとめや二次配布サイトでの配布もNGな例を除いて可能です)</span>
                            </li>
                            <li>
                                ウェブサイトやブログにUSTや音声等を埋め込む
                                <br />
                                <span className="details">(動画にリンクを貼ることも自由です)</span>
                            </li>
                            <li>
                                USTを教育用途で使用する
                                <br />
                                <span className="details">(学校や教育機関、オンラインコースなどでの利用を歓迎します)</span>
                            </li>
                        </ul>
                    </Card>
                    <Card title="NGな例" className="ng">
                        <ul>
                            <li>
                                公序良俗に反する素材利用を行う
                                <br />
                                <span className="details">
                                    (性的な表現や暴力的な表現、差別的な表現、暴力表現、グロテスク表現、恐怖表現、不快表現、不条理表現、猟奇表現、残虐表現、下品表現、不道徳表現、不安表現、不気味表現、不穏表現等)
                                </span>
                            </li>
                            <li>
                                USTを販売する / 著作権を譲渡する制作物への利用 / UST等を利用し商標登録する
                                <br />
                                <span className="details">
                                    (USTを使用した動画等を動画配信プラットフォームで収益化することは可能ですが、USTそのものを販売することはできません)
                                </span>
                            </li>
                            <li>
                                USTをクレジット表記なしで再配布する
                                <br />
                                <span className="details">
                                    (クレジット表記がある場合は、再配布可能です)
                                </span>
                            </li>
                            <li>
                                損害や不利益を与える動画や信用や名誉を損なう素材利用を行う
                                <br />
                                <span className="details">
                                    (USTを使用した動画等を作成する際には、第三者の権利を侵害しないようにご注意ください)
                                </span>
                            </li>
                        </ul>
                    </Card>
                </CardList>
                
                <h2>
                    クレジット表記について
                </h2>
                <p>
                    クレジット表記は任意ですが、ご連絡やクレジット表記をしていただけた場合は、全力で応援します!
                    <br />
                    以下のようなクレジット表記をしていただけると嬉しいです。
                    <CardList className="one-column">
                        <Card>
                            れのらり( https://renorari.net/ )のUST( https://youtube.com/watch?v=XXXXXXXXXXX )を使用しました。
                        </Card>
                        <Card>
                            UST: https://youtube.com/watch?v=XXXXXXXXXXX (れのらりによる配布)
                        </Card>
                        <Card>
                            れのらり( https://renorari.net/ )のUST( https://youtube.com/watch?v=XXXXXXXXXXX )を使用しました。
                            <br />
                            自由に使えるUSTを配布しているので、ぜひご利用ください。
                        </Card>
                    </CardList>
                </p>

                <h2>
                    著作権について
                </h2>
                <p>
                    編集や加工の有無にかかわらず、すべての著作権は「れのらり」が所有します。
                    <br />
                    クライアントワークやクラウドソーシング等で著作権の譲渡が必要になる場合は、ご利用いただけません。
                </p>

                <h2>
                    よくある質問
                </h2>
                <CardList>
                    <Card title="USTを商用利用してもいいですか？">
                        はい、商用利用していただいても問題ありません。
                        <br />
                        ただし、クライアントワークやクラウドソーシング等で著作権の譲渡が必要になる場合は、ご利用いただけません。
                    </Card>
                    <Card title="USTを改変してもいいですか？">
                        はい、改変していただいても問題ありません。
                        <br />
                        また、改変したものを配布することも可能ですが、クレジット表記は必須です。
                    </Card>
                    <Card title="USTを商標登録してもいいですか？">
                        いいえ、商標登録はできません。
                    </Card>
                    <Card title="USTを教育用途で使用してもいいですか？">
                        はい、教育用途での使用を歓迎します。
                        <br />
                        学校や教育機関、オンラインコースなどで自由にご利用ください。
                    </Card>
                    <Card title="USTを再配布してもいいですか？">
                        クレジット表記がある場合に限り、再配布が可能です。
                        <br />
                        クレジット表記なしでの再配布はお控えください。
                    </Card>
                    <Card title="USTを使った作品を公開する際に連絡は必要ですか？">
                        いいえ、事前の連絡は不要です。
                        <br />
                        ただし、ご連絡いただければ全力で応援いたします！
                    </Card>
                </CardList>
                <h2>
                    免責事項
                </h2>
                <p>
                    素材のダウンロードや利用、編集、加工によって生じた問題につきましては、一切責任を負いかねます。
                    <br />
                    また、制作した素材は予告なく変更･削除する場合があります。
                    <br />
                    あらかじめご了承ください。
                </p>
                <p>
                    その他の免責事項につきましては、<Link to="/legal/disclaimer">本サイトの免責事項</Link>をご確認ください。
                </p>
            </main>
        </>
    );
}

export const getConfig = async () => {
    return {
        "render": "static"
    } as const;
};