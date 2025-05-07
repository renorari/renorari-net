/*
    No unquoted keys in objects
*/

export default {
    "meta": {
        "type": "suggestion",
        "docs": {
            "description": "disallow unquoted keys in objects",
            "category": "Best Practices",
            "recommended": false
        },
        "fixable": "code",
        "schema": []
    },
    "create": function (context) {
        return {
            "Property"(node) {
                if (!node.computed && node.key.type === "Identifier") {
                    if (node.parent.type === "ObjectPattern") {
                        return;
                    }
                    if (node.shorthand) {
                        return;
                    }
                    context.report({
                        "node": node.key,
                        "message": "Unquoted key \"{{ key }}\" found.",
                        "data": {
                            "key": node.key.name
                        },
                        "fix": function (fixer) {
                            const sourceCode = context.getSourceCode();
                            const keyText = sourceCode.getText(node.key);
                            return fixer.replaceText(node.key, `"${keyText}"`);
                        }
                    });
                }
            }
        };
    }
};
