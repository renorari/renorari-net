import cp from "node:child_process";
import { randomUUID } from "node:crypto";
import fs from "node:fs/promises";
import util from "node:util";

const exec = util.promisify(cp.exec);

const jTalkDicts: Record<string, string> = {
    "win32": "C:/Users/Renorari/Documents/applications/open_jtalk/dic",
    "darwin": "/opt/homebrew/Cellar/open-jtalk/1.11/dic",
    "linux": "/var/lib/mecab/dic/open-jtalk/naist-jdic"
};
const jTalkDict = process.env.JTALK_DICT || jTalkDicts[process.platform] || jTalkDicts["linux"];
const jTalkVoice = process.env.JTALK_VOICE || "/usr/local/share/open_jtalk/htsvoice/mei/mei_normal.htsvoice";

export const GET = async (request: Request): Promise<Response> => {
    try {
        const text = new URL(request.url).searchParams.get("text");
        if (!text) {
            return Response.json({
                "status": "error",
                "message": "Text is required"
            }, { "status": 400 });
        }
        // 4文字のひらがなだけかどうか確認
        if (!/^[\u3040-\u309F]{4}$/.test(text)) {
            return Response.json({
                "status": "error",
                "message": "Text must be 4 characters of hiragana"
            }, { "status": 400 });
        }

        // OpenJTalkで音声合成
        const wavFile = `${randomUUID()}.wav`;
        const command = `echo "${text}" | open_jtalk -x ${jTalkDict} -m ${jTalkVoice} -ow /tmp/${wavFile}`;

        const { stdout: _, stderr } = await exec(command);
        if (stderr) {
            console.error(stderr);

            return Response.json({
                "status": "error",
                "message": "Failed to synthesize speech"
            }, { "status": 500 });
        }

        // 音声ファイルを読み込む
        const wavData = await fs.readFile(`/tmp/${wavFile}`, { "encoding": "base64" });
        // 一時ファイルを削除
        await fs.unlink(`/tmp/${wavFile}`);

        // 音声ファイルをBlobに変換
        const blob = new Blob([Buffer.from(wavData, "base64")], { "type": "audio/wav" });

        return new Response(
            blob,
            {
                "status": 200,
                "headers": {
                    "Content-Type": "audio/wav",
                    "Content-Disposition": `attachment; filename="${wavFile}"`,
                    "Content-Length": String(blob.size),
                    "Cache-Control": "no-cache"
                }
            }
        );
    } catch (error) {
        console.error(error);

        return Response.json({
            "status": "error",
            "message": "Internal server error"
        }, { "status": 500 });
    }
};