function unicodeEscape(str: string) {
    if (!String.prototype.repeat) {
        String.prototype.repeat = function (digit) {
            let result = "";
            for (let i = 0; i < Number(digit); i++) result += str;
            return result;
        };
    }

    const strs = str.split("");
    let hex, result = "";

    for (let i = 0, len = strs.length; i < len; i++) {
        hex = strs[i].charCodeAt(0).toString(16);
        result += "&#x" + ("0".repeat(Math.abs(hex.length - 4))) + hex +";";
    }

    return result;
}

export default unicodeEscape;