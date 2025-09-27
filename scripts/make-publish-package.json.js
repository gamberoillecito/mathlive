const fs = require('fs');
const path = require('path');

const rootPackage = JSON.parse(
  fs.readFileSync(path.resolve(__dirname, '../package.json'), 'utf8')
);

// Pick only the fields you want to include in the published package
const publishPackage = {
  name: rootPackage.name,
  version: rootPackage.version,
  description: rootPackage.description,
  license: rootPackage.license,
  author: rootPackage.author,
  funding: rootPackage.funding,
  repository: rootPackage.repository,
  bugs: rootPackage.bugs,
  keywords: rootPackage.keywords,
  main: rootPackage.main,
  module: rootPackage.module,
  types: rootPackage.types,
  // Simplified exports to avoid Vite dependency scan issues
  exports: {
    './vue': './vue-mathlive.mjs',
    './fonts.css': './mathlive-fonts.css',
    './static.css': './mathlive-static.css',
    '.': {
      types: './types/mathlive.d.ts',
      import: './mathlive.min.mjs',
      require: './mathlive.min.js',
    },
    './ssr': {
      types: './types/mathlive-ssr.d.ts',
      import: './mathlive-ssr.min.mjs',
    },
  },
  dependencies: rootPackage.dependencies,
  files: [
    // Optional: if you want to be explicit
    './*.js',
    './*.mjs',
    './*.css',
    './fonts/',
    './sounds/',
    './types/',
  ],
};

fs.writeFileSync(
  path.resolve(__dirname, '../dist/package.json'),
  JSON.stringify(publishPackage, null, 2),
  'utf8'
);
