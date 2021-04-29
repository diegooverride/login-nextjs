module.exports = {
  "extends": "airbnb-typescript-prettier",
  "rules": {
    "jsx-a11y/anchor-is-valid": [ "error", {
      "components": [ "Link" ],
      "specialLink": [ "hrefLeft", "hrefRight" ],
      "aspects": [ "noHref", "invalidHref", "preferButton" ]
    }],
    "semi": [2, "never"],
    "react/forbid-prop-types": "off",
    "react/jsx-props-no-spreading": "off",
    "typescript-eslint/no-explicit-any": false,
    "prettier/prettier": ["error", {
      "endOfLine": "auto"
    }]
  },
}