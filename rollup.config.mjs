import { nodeResolve } from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import { babel } from '@rollup/plugin-babel';
import terser from '@rollup/plugin-terser';
import postcss from 'rollup-plugin-postcss';
import postcssImport from 'postcss-import';

export default [
  // 1. UMD Build (Unminified & Minified)
  {
    input: 'src/js/swd.js',
    output: [
      {
        file: 'dist/swd.js',
        format: 'umd',
        name: 'SWD',
        exports: 'default',
        sourcemap: true,
      },
      {
        file: 'dist/swd.min.js',
        format: 'umd',
        name: 'SWD',
        exports: 'default',
        sourcemap: true,
        plugins: [terser()]
      }
    ],
    plugins: [
      postcss({
        extract: 'swd.css',
        minimize: true,
        sourceMap: true,
        plugins: [
          postcssImport()
        ]
      }),
      nodeResolve({
        browser: true,
      }),
      commonjs(),
      babel({
        babelHelpers: 'bundled',
        exclude: 'node_modules/**',
      }),
    ],
  },
  // 2. ESM Build (Unminified)
  {
    input: 'src/js/swd.js',
    output: {
      file: 'dist/swd.esm.js',
      format: 'es',
      sourcemap: true,
    },
    external: ['marked', 'dompurify', /core-js/],
    plugins: [
      postcss({
        extract: 'swd.css',
        minimize: true,
        sourceMap: true,
        plugins: [
          postcssImport()
        ]
      }),
      nodeResolve(),
      commonjs(),
      babel({
        babelHelpers: 'bundled',
        exclude: 'node_modules/**',
      }),
    ],
  }
];
