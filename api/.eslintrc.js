module.exports = {
    extends: [
        'eslint:recommended',
        'plugin:import/warnings',
        'prettier',
        'plugin:import/typescript',
        'plugin:@typescript-eslint/recommended'
    ],
    parser: '@typescript-eslint/parser',
    plugins: ['@typescript-eslint', 'import'],
    parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
        project: "./tsconfig.json",
    },
    overrides: [
        {
            files: ['*.js', '*.jsx'],
            parser: 'espree',
            rules: {
                'no-invalid-this': ['error'],
                'no-redeclare': ['error'],
                'no-unused-expressions': ['error'],
                'no-unused-vars': [
                    'error',
                    {
                        vars: 'all',
                        args: 'after-used',
                        ignoreRestSiblings: false
                    }
                ],
                'no-useless-constructor': ['error'],
                'require-await': ['error'],
                'no-use-before-define': [
                    'error',
                    {
                        variables: true,
                        functions: false,
                        classes: true
                    }
                ],
                'no-extra-semi': ['error'],
                '@typescript-eslint/adjacent-overload-signatures': ['off'],
                '@typescript-eslint/array-type': ['off'],
                '@typescript-eslint/await-thenable': ['off'],
                '@typescript-eslint/naming-convention': ['off'],
                '@typescript-eslint/ban-ts-comment': ['off'],
                '@typescript-eslint/consistent-type-assertions': ['off'],
                '@typescript-eslint/consistent-type-definitions': ['off'],
                '@typescript-eslint/explicit-function-return-type': ['off'],
                '@typescript-eslint/explicit-member-accessibility': ['off'],
                '@typescript-eslint/explicit-module-boundary-types': ['off'],
                '@typescript-eslint/member-delimiter-style': ['off'],
                '@typescript-eslint/no-extra-parens': ['off'],
                '@typescript-eslint/no-extra-semi': ['off'],
                '@typescript-eslint/no-floating-promises': ['off'],
                '@typescript-eslint/no-empty-interface': ['off'],
                '@typescript-eslint/no-explicit-any': ['off'],
                '@typescript-eslint/no-var-requires': ['off'],
                '@typescript-eslint/no-shadow': ['off'],
                '@typescript-eslint/no-inferrable-types': ['off'],
                '@typescript-eslint/no-invalid-this': ['off'],
                '@typescript-eslint/no-redeclare': ['off'],
                '@typescript-eslint/no-non-null-assertion': ['off'],
                '@typescript-eslint/no-misused-new': ['off'],
                '@typescript-eslint/no-misused-promises': ['off'],
                '@typescript-eslint/no-parameter-properties': ['off'],
                '@typescript-eslint/no-unnecessary-type-assertion': ['off'],
                '@typescript-eslint/no-unused-expressions': ['off'],
                '@typescript-eslint/no-unused-vars': ['off'],
                '@typescript-eslint/no-use-before-define': ['off'],
                '@typescript-eslint/no-useless-constructor': ['off'],
                '@typescript-eslint/prefer-enum-initializers': ['off'],
                '@typescript-eslint/prefer-reduce-type-parameter': ['off'],
                '@typescript-eslint/promise-function-async': ['off'],
                '@typescript-eslint/require-await': ['off'],
                '@typescript-eslint/restrict-plus-operands': ['off'],
                '@typescript-eslint/unified-signatures': ['off']
            }
        }
    ],
    ignorePatterns: ['dist/**/*'],
    rules: {
        'no-async-promise-executor': ['error'],
        'no-await-in-loop': ['error'],
        'no-template-curly-in-string': ['error'],
        'array-callback-return': ['off'],
        'block-scoped-var': ['error'],
        curly: ['error', 'all'],
        'dot-location': ['error', 'property'],
        'dot-notation': ['error'],
        eqeqeq: ['error', 'always'],
        'guard-for-in': ['error'],
        'max-classes-per-file': ['off'],
        'no-alert': ['error'],
        'no-caller': ['error'],
        'no-constant-binary-expression': ['error'],
        'no-div-regex': ['error'],
        'no-else-return': ['error', { allowElseIf: true }],
        'no-eval': ['error'],
        'no-empty': ['error', { allowEmptyCatch: true }],
        'no-extend-native': ['error'],
        'no-extra-bind': ['error'],
        'no-fallthrough': ['error'],
        'no-floating-decimal': ['error'],
        'no-implicit-coercion': ['error'],
        'no-implied-eval': ['error'],
        'no-iterator': ['error'],
        'no-lone-blocks': ['error'],
        'no-loop-func': ['error'],
        'no-multi-spaces': ['error'],
        'no-multi-str': ['error'],
        'no-new-func': ['error'],
        'no-new-native-nonconstructor': ['error'],
        'no-new-wrappers': ['error'],
        'no-octal-escape': ['error'],
        'no-proto': ['error'],
        'no-return-assign': ['error', 'always'],
        'no-script-url': ['error'],
        'no-self-assign': ['error'],
        'no-self-compare': ['error'],
        'no-sequences': ['error'],
        'no-throw-literal': ['error'],
        'no-underscore-dangle': ['error'],
        'no-unmodified-loop-condition': ['error'],
        'no-useless-call': ['error'],
        'no-useless-concat': ['error'],
        'no-void': ['error'],
        'no-with': ['error'],
        radix: ['error', 'always'],
        'wrap-iife': ['error', 'inside'],
        yoda: ['error'],
        'no-label-var': ['error'],
        'no-shadow': ['off'],
        'no-shadow-restricted-names': ['error'],
        'no-path-concat': ['error'],

        /* Stylistic */
        'no-extra-parens': ['off'],

        /* ECMAScript 6 */
        'arrow-parens': ['error', 'always'],
        'arrow-spacing': ['error', { before: true, after: true }],
        'generator-star-spacing': ['error', { before: false, after: true }],
        'no-duplicate-imports': ['error', { includeExports: true }],
        'no-useless-computed-key': ['error'],
        'no-useless-rename': ['error'],
        'no-var': ['error'],
        'object-shorthand': ['error', 'always'],
        'prefer-const': ['error'],
        'prefer-rest-params': ['error'],
        'prefer-spread': ['error'],
        'prefer-template': ['error'],
        'rest-spread-spacing': ['error', 'never'],
        'template-curly-spacing': ['error'],
        'yield-star-spacing': ['error', { before: true, after: false }],

        /* Imports */
        'import/no-empty-named-blocks': ['error'],
        'import/no-dynamic-require': ['error'],
        'import/no-default-export': ['error'],
        'import/no-webpack-loader-syntax': ['error'],
        'import/no-self-import': ['error'],
        'import/no-cycle': ['error'],
        'import/no-useless-path-segments': ['error'],
        'import/no-unused-modules': ['error'],
        'import/no-named-as-default': ['error'],
        'import/no-named-as-default-member': ['error'],
        'import/no-mutable-exports': ['error'],
        'import/no-commonjs': ['off'],
        'import/first': ['error'],
        'import/no-duplicates': ['error'],
        'import/no-namespace': ['off'],
        'import/extensions': ['off'],
        'import/newline-after-import': ['error'],

        'import/no-named-as-default': 'off',
        'import/order': [
            'error',
            {
                alphabetize: {
                    order: 'asc',
                    caseInsensitive: true
                },
                pathGroups: [
                    {
                        pattern: `**.{css,scss}`,
                        group: 'internal',
                        position: 'after'
                    }
                ],
                'newlines-between': 'always',
                pathGroupsExcludedImportTypes: ['builtin'],
                groups: ['builtin', 'external', 'internal', 'parent', 'sibling', 'index']
            }
        ],

        // TYPESCRIPT

        'no-invalid-this': ['off'], // see @typescript-eslint/no-invalid-this
        'no-redeclare': ['off'], // see @typescript-eslint/no-redeclare
        'no-unused-expressions': ['off'], // see @typescript-eslint/no-unused-expressions
        'no-unused-vars': ['off'], // see @typescript-eslint/no-unused-vars
        'no-useless-constructor': ['off'], // see @typescript-eslint/no-useless-constructor
        'require-await': ['off'], // see @typescript-eslint/require-await
        'no-use-before-define': ['off'], // see @typescript-eslint/no-use-before-define

        /* Stylistic */
        'no-extra-semi': ['off'], // see @typescript-eslint/no-extra-semi

        /* Typescript */
        '@typescript-eslint/adjacent-overload-signatures': ['error'],
        '@typescript-eslint/array-type': [
            'error',
            { default: 'array-simple', readonly: 'array-simple' }
        ],
        '@typescript-eslint/await-thenable': ['error'],
        '@typescript-eslint/naming-convention': [
            'error',
            {
                selector: 'default',
                format: ['camelCase']
            },
            {
                selector: 'variable',
                format: ['camelCase', 'UPPER_CASE', 'PascalCase']
            },
            {
                selector: ['function'],
                format: ['camelCase', 'PascalCase']
            },
            {
                selector: 'parameter',
                format: ['camelCase', 'PascalCase']
            },
            {
                selector: ['objectLiteralProperty', 'objectLiteralMethod'],
                format: []
            },
            {
                selector: 'typeProperty',
                format: []
            },
            {
                selector: 'typeLike',
                format: ['PascalCase']
            },
            {
                selector: 'enum',
                format: ['PascalCase']
            },
            {
                selector: 'enumMember',
                format: ['PascalCase', 'UPPER_CASE']
            },
            {
                selector: 'interface',
                format: ['PascalCase'],
                custom: {
                    regex: '^I[A-Z]',
                    match: false
                }
            },
            {
                selector: 'typeParameter',
                format: ['PascalCase'],
                prefix: ['T']
            },
            {
                selector: 'memberLike',
                format: ['camelCase', 'UPPER_CASE']
            },
        ],
        '@typescript-eslint/ban-ts-comment': ['off'],
        '@typescript-eslint/consistent-type-assertions': [
            'error',
            { assertionStyle: 'as', objectLiteralTypeAssertions: 'allow-as-parameter' }
        ],
        '@typescript-eslint/consistent-type-definitions': ['error', 'interface'],
        '@typescript-eslint/explicit-member-accessibility': [
            'error',
            { accessibility: 'explicit' }
        ],
        '@typescript-eslint/member-delimiter-style': [
            'error',
            {
                multiline: {
                    delimiter: 'semi',
                    requireLast: true
                },
                singleline: {
                    delimiter: 'semi',
                    requireLast: false
                }
            }
        ],
        '@typescript-eslint/no-extra-parens': ['off'],
        '@typescript-eslint/no-extra-semi': ['error'],
        '@typescript-eslint/no-floating-promises': ['off'],
        '@typescript-eslint/no-empty-interface': ['off'],
        '@typescript-eslint/no-explicit-any': ['error'],
        '@typescript-eslint/no-shadow': ['error'],
        '@typescript-eslint/no-inferrable-types': [
            'error',
            {
                ignoreParameters: true,
                ignoreProperties: true
            }
        ],
        '@typescript-eslint/no-invalid-this': ['error'],
        '@typescript-eslint/no-redeclare': ['error', { ignoreDeclarationMerge: true }],
        '@typescript-eslint/no-non-null-assertion': ['off'],
        '@typescript-eslint/no-misused-new': ['error'],
        '@typescript-eslint/no-misused-promises': [
            'error',
            {
                checksVoidReturn: false
            }
        ],
        '@typescript-eslint/no-parameter-properties': ['off'],
        '@typescript-eslint/no-unnecessary-type-assertion': ['error'],
        '@typescript-eslint/no-unused-expressions': ['error'],
        '@typescript-eslint/no-unused-vars': [
            'error',
            {
                vars: 'all',
                args: 'after-used',
                ignoreRestSiblings: false
            }
        ],
        '@typescript-eslint/no-use-before-define': [
            'error',
            {
                variables: true,
                functions: false,
                classes: true,
                enums: true,
                typedefs: true
            }
        ],
        '@typescript-eslint/no-useless-constructor': ['error'],
        '@typescript-eslint/prefer-enum-initializers': ['error'],
        '@typescript-eslint/prefer-reduce-type-parameter': ['error'],
        '@typescript-eslint/promise-function-async': [
            'error',
            {
                checkArrowFunctions: true,
                checkFunctionDeclarations: true,
                checkFunctionExpressions: true,
                checkMethodDeclarations: true
            }
        ],
        '@typescript-eslint/require-await': ['error'],
        '@typescript-eslint/restrict-plus-operands': ['error'],
        '@typescript-eslint/return-await': ['error'],
        '@typescript-eslint/typedef': [
            'error',
            {
                arrayDestructuring: false,
                arrowParameter: true,
                memberVariableDeclaration: true,
                objectDestructuring: false,
                parameter: true,
                propertyDeclaration: true,
                variableDeclaration: false,
                variableDeclarationIgnoreFunction: false
            }
        ],
        '@typescript-eslint/unified-signatures': ['error'],

        'object-curly-spacing': ['error', 'always']
    }
};
