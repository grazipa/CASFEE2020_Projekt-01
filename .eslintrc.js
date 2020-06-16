module.exports = {
    "env": {
        "browser": true,
        "es6": true
    },
    "extends": ["airbn", "prettier", "eslint:recommended"],
    "plugins": ["prettier"],
    "globals": {
        "Atomics": "readonly",
        "SharedArrayBuffer": "readonly"
    },
    "parserOptions": {
        "ecmaVersion": 11,
        "sourceType": "module"
    },
    "rules": {
    }
};
