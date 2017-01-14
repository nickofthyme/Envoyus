module.exports = {
    'env': {
        'browser': true,
        'es6': true,
        'mocha': true
    },
    'extends': [
        'eslint:recommended',
        'plugin:node/recommended',
    ],
    'parserOptions': {
        'sourceType': 'module',
        'ecmaFeatures': {
            'jsx': true
        }
    },
    'plugins': [
        'node',
    ],
    'globals': {
        'deepEqual': true,
        'describe': true,
        'document': true,
        'it': true,
        'expect': true,
        'module': true,
        'test': true,
        'window': true,
        'sinon': true,
        'console': true,
        'require': true
    },
    'rules': {
        'no-console': process.env.NODE_ENV === 'production' ? ['error', { allow: ['warn', 'error'] }]: 1,
        'semi': ['warn', 'always'],
        'space-before-function-paren': 1,
        'no-var': 1,
        'no-unused-vars': 1,
        'quotes': [2, 'single'],
        'node/exports-style': ['error', 'module.exports'],
        'comma-dangle': ['error', 'never']
    }
};
