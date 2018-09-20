module.exports = {
    "extends": "airbnb",
    "env": {
        "browser": true,
        "node": true
    },
    "parser": "babel-eslint",
    "rules": {
        "react/jsx-filename-extension": [1, { "extensions": [".js", ".jsx"] }],
        "semi": 0,
        "react/destructuring-assignment": { "ignoreClassFields": true },
        "react/prop-types":0,
        "react/no-access-state-in-setstate": 0,
        "jsx-a11y/label-has-for": 0,
        "jsx-a11y/label-has-associated-control": 0,
        "prefer-destructuring": 0,
        "no-underscore-dangle": 0
    },
};