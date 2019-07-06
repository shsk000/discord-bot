module.exports = {
    "extends": [
      "eslint:recommended",
      "plugin:prettier/recommended"
    ],
    "env": {
      "node": true,
      "es6": true,
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
