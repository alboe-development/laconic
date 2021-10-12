import { terser } from 'rollup-plugin-terser';
import { nodeResolve } from '@rollup/plugin-node-resolve';

export default {
  input: 'dist/index.js',
  output: [
    {
      format: 'umd',
      file: 'build/build.js',
      indent: '\t',
      name: 'Laconic',
    },
    {
      format: 'umd',
      file: 'build/build.min.js',
      name: 'Laconic',
      plugins: [
        terser(),
      ],
      sourcemap: true,
    },
  ],
  plugins: [
    nodeResolve({
      browser: true,
    }),
  ],
  watch: {
    include: './dist/**/*.js',
  },
};
