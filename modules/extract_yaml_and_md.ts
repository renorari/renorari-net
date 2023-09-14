/* extract yaml and md */

import jsyaml from "js-yaml";

function extractYAMLAndMD(text: string) {
    const yamlStartIndex = text.indexOf("---");
    const yamlEndIndex = text.indexOf("---", yamlStartIndex + 3);

    if (yamlStartIndex !== -1 && yamlEndIndex !== -1) {
        const yamlText = text.slice(yamlStartIndex + 3, yamlEndIndex);
        const mdText = text.slice(yamlEndIndex + 3);

        return {
            yaml: jsyaml.load(yamlText),
            md: mdText
        };
    } else {
        throw new Error("YAML not found");
    }
}

export default extractYAMLAndMD;