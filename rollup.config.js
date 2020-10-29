import typescript from '@rollup/plugin-typescript'

const OUTPUT_FOLDER = 'dist'

// eslint-disable-next-line import/no-anonymous-default-export
export default [
  {
    input: 'src/index.tsx',
    output: {
      dir: OUTPUT_FOLDER,
      format: 'cjs',
    },
    external: [],
    plugins: [typescript()],
  },
  {
    input: 'src/storage.ts',
    output: {
      dir: OUTPUT_FOLDER,
      format: 'cjs',
    },
    external: [],
    plugins: [typescript()],
  },
  {
    input: 'src/useMountedState.ts',
    output: {
      dir: OUTPUT_FOLDER,
      format: 'cjs',
    },
    external: [],
    plugins: [typescript()],
  },
]
