module.exports = {
    "extends": [
      "eslint:recommended", // お好きなESLint設定をここに
      "plugin:prettier/recommended"
    ],
    "plugins": [
      "@typescript-eslint"
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
