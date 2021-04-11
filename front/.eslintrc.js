module.exports = {
  /* 프로젝트의 사용 환경 */
  env: {
    browser: true,
    es6: true,
    node: true,
  },
  /* 플러그인은 일련의 규칙 집합 */
  plugins: [
    // 플러그인을 추가하여도 규칙은 적용되지 않는다.
    'react',
    'react-hooks',
    '@typescript-eslint',
    'import',
    'prettier',
  ],
  /* extends는 추가한 플러그인에서 사용할 규칙 설정 */
  extends: [
    // 규칙을 적용하기 위해서는 추가한 플러그인 중, 사용할 규칙 추가
    'airbnb',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:@typescript-eslint/eslint-recommended', // eslint에서 규칙을 비활성화 하는 호환성을 위한 규칙 모음
    'plugin:prettier/recommended',
  ],
  settings: {
    react: {
      version: 'detect', // eslint-plugin-react에게 사용하고 있는 리액트의 버전을 알아서 탐지하도록 한다.
    },
    'import/extensions': ['.js', '.jsx', '.ts', '.tsx'],
    'import/parsers': {
      '@typescript-eslint/parser': ['.ts', '.tsx'],
    },
    'import/resolver': {
      typescript: {}, // this loads <rootdir>/tsconfig.json to eslint
    },
  },
  /* 자바스크립트 버전, 모듈 사용 여부 등을 설정 */
  parserOptions: {
    parser: '@typescript-eslint/parser', // AST 변환기
    ecmaFeatures: {
      jsx: true,
      tsx: true,
    },
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  /* extends와 plugins에 대한 세부 설정을 변경 */
  rules: {
    'no-console': 'off',
    'func-names': 'off',
    'import/no-named-as-default': 'off',
    '@typescript-eslint/no-empty-function': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    'no-param-reassign': ['error', { props: true, ignorePropertyModificationsFor: ['state'] }],
    'react/prop-types': 'off',
    'react/jsx-props-no-spreading': 'off',
    'react/jsx-filename-extension': ['error', { extensions: ['.js', '.jsx', '.tsx', '.ts'] }],
    'no-use-before-define': 'off', // 정의되기 전에 사용되도록 허용 ('React' was used before it was defined)
    '@typescript-eslint/no-use-before-define': ['error'],
    'import/no-cycle': ['error', { maxDepth: 1 }],
    'import/prefer-default-export': 'off',
    // airbnb ESLint 구성의 문제를 해결하기 위함
    'import/extensions': [
      'error',
      'ignorePackages',
      {
        js: 'never',
        jsx: 'never',
        ts: 'never',
        tsx: 'never',
      },
    ],
    // import order 정의
    'import/order': [
      'error',
      {
        groups: ['builtin', 'external', 'internal'],
        pathGroups: [
          {
            pattern: 'react',
            group: 'external',
            position: 'before',
          },
        ],
        pathGroupsExcludedImportTypes: ['react'],
        'newlines-between': 'always',
        alphabetize: {
          order: 'asc',
          caseInsensitive: true,
        },
      },
    ],
    'prettier/prettier': 'error',
  },
};
