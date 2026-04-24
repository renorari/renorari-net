import React from "react";

import Metadata from "../../components/Metadata";
import CardList from "../../components/CardList";
import ImageCard from "../../components/ImageCard";

export default function GoluboiVagonPage() {
    return (<>
        <Metadata title="【楽譜】各種楽譜配布ページ【CC0】" image="/images/downloads/scores.png" />

        <main>
            <section>
                <h1>
                    各種楽譜配布ページ
                </h1>
                <p>
                    私が作成した楽譜を配布しているページです。
                    <br />
                    すべて
                    <a href="https://creativecommons.org/publicdomain/zero/1.0/deed.ja" target="_blank" rel="noopener noreferrer">CC0</a>
                    で配布していますので、自由にお使いください。
                </p>
                <div>
                    <img src="https://mirrors.creativecommons.org/presskit/buttons/88x31/svg/cc-zero.svg" alt="CC0" />
                </div>
            </section>
            <section>
                <h2>
                    ロシア民謡・Чебурашка
                </h2>
                <p>
                    空色の列車(青い列車)としても知られている、ソ連の人気キャラクター、チェブラーシカの「Голубой вагон(ゴルボィ・ヴァゴン)」の楽譜です。
                    <br />
                    また、同じくチェブラーシカの誕生日の歌(ワニのゲーナの歌)とも知られている、「Песенка крокодила Гены(ぺシェンカ・クロコジーラ・ゲーナ)」と、ソ連の有名な愛国歌「Катюша(カチューシャ)」、そしてテトリスのテーマ曲としても知られている「Коробейники(コロベイニキ)」の楽譜も配布しています。
                </p>
                <div>
                    <h3>
                        演奏例
                    </h3>
                    <audio controls>
                        <source src="/musics/goluboi-vagon.mp3" type="audio/mpeg" />
                    </audio>
                    <audio controls>
                        <source src="/musics/pesenka-krokodila-genyi.mp3" type="audio/mpeg" />
                    </audio>
                    <audio controls>
                        <source src="/musics/katyusha.mp3" type="audio/mpeg" />
                    </audio>
                    <audio controls>
                        <source src="/musics/korobeiniki.mp3" type="audio/mpeg" />
                    </audio>
                </div>
                <CardList>
                    <ImageCard title="Голубой вагон" image="/images/downloads/scores/goluboi-vagon.svg" link="/pdf/scores/goluboi-vagon.pdf" />
                    <ImageCard title="Песенка крокодила Гены" image="/images/downloads/scores/pesenka-krokodila-genyi.svg" link="/pdf/scores/pesenka-krokodila-genyi.pdf" />
                    <ImageCard title="Катюша" image="/images/downloads/scores/katyusha.svg" link="/pdf/scores/katyusha.pdf" />
                    <ImageCard title="Коробейники" image="/images/downloads/scores/korobeiniki.svg" link="/pdf/scores/korobeiniki.pdf" />
                </CardList>
            </section>
            <section>
                <h2>
                    フィンランド民謡・Polka
                </h2>
                <p>
                    フィンランドの民謡である「Säkkijärven polkka(サッキヤルヴェン・ポルカ)」の楽譜です。
                    <br />
                    第二次世界大戦中、フィンランドがソ連からの攻撃に対抗するために使用したことでも知られている曲です。
                </p>
                <div>
                    <h3>
                        演奏例
                    </h3>
                    <audio controls>
                        <source src="/musics/sakkijarven-polkka.mp3" type="audio/mpeg" />
                    </audio>
                </div>
                <CardList>
                    <ImageCard title="Säkkijärven polkka" image="/images/downloads/scores/sakkijarven-polkka.svg" link="/pdf/scores/sakkijarven-polkka.pdf" />
                </CardList>
            </section>
        </main>
    </>);
}
