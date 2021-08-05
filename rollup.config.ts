import { nodeResolve } from '@rollup/plugin-node-resolve';

export default {
  input: 'src/js/main.js',
  output: {
    file: 'dist/js/bundle.js',
    format: 'cjs'
  },
  plugins: [nodeResolve()]
};