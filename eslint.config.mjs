export default [
  {
    rules: {
      "arrow-parens": ["error", "as-needed"],
      indent: ["error", 2],
      "linebreak-style": ["error", "unix"],

      "keyword-spacing": ["error", {
        overrides: {
          if: {
            after: false,
          },

          for: {
            after: false,
          },

          while: {
            after: false,
          },

          static: {
            after: false,
          },

          as: {
            after: false,
          },
        },
      }],

      "no-multi-spaces": "error",
      "no-multiple-empty-lines": "error",
      "no-return-assign": "off",
      "no-trailing-spaces": "error",
      "no-var": "error",

      "no-unused-vars": ["error", {
        varsIgnorePattern: "_$",
      }],

      "prefer-const": "error",
      quotes: ["error", "double"],
      semi: ["error", "always"],
      "space-before-function-paren": "off",
    },
  }, {
    files: ["**/*.{js}"],
  }];