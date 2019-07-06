module.exports = {
    "extends": [
      "eslint:recommended", // お好きなESLint設定をここに
      "plugin:prettier/recommended"
    ],
    "env": {
      "jest/globals": true,
    },
    "plugins": [
      "@typescript-eslint",
      "jest"
    ],
    "parser": "@typescript-eslint/parser",
    "parserOptions": {
      "sourceType": "module",
      "project": "./tsconfig.json"
    },
    "rules": {
      "@typescript-eslint/no-unused-vars": "error"
    }
}
