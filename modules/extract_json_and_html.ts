/* extract json and html */

function extractJSONAndHTML(text: string) {
    const jsonStartIndex = text.indexOf("{");
    const jsonEndIndex = text.indexOf("}");

    if (jsonStartIndex !== -1 && jsonEndIndex !== -1) {
        const jsonText = text.slice(jsonStartIndex, jsonEndIndex + 1);
        const htmlText = text.slice(0, jsonStartIndex) + text.slice(jsonEndIndex + 1);

        return {
            json: JSON.parse(jsonText),
            html: htmlText
        };
    } else {
        throw new Error("JSON not found");
    }
}

export default extractJSONAndHTML;