js

## // =============================================

// KONKER – ESLint Config

// Generated: November 12, 2025 12:27 AM EAT

// =============================================

import js from '@eslint/js';

import ts from 'typescript-eslint';

import react from 'eslint-plugin-react';

import reactHooks from 'eslint-plugin-react-hooks';

import prettier from 'eslint-plugin-prettier';

import importPlugin from 'eslint-plugin-import';


export default [

{

ignores: ['dist/', 'node_modules/', '.turbo/'],

},

js.configs.recommended,

...ts.configs.recommended,

{

plugins: {

react,

'react-hooks': reactHooks,

prettier,

import: importPlugin,

},

languageOptions: {

parser: ts.parser,

parserOptions: {

ecmaVersion: 'latest',

sourceType: 'module',

ecmaFeatures: { jsx: true },

},

globals: {

browser: true,

es2022: true,


node: true,

},

},

rules: {

...react.configs.recommended.rules,

...reactHooks.configs.recommended.rules,

'prettier/prettier': 'error',

'import/order': 'error',

'no-console': process.env.NODE_ENV === 'production'? 'warn' : 'off',

'react/prop-types': 'off',

'@typescript-eslint/no-explicit-any': 'warn',

},

settings: {

react: { version: 'detect' },

'import/resolver': {

typescript: {},

},

},

},

];
