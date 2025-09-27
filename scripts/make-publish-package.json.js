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
  main: './dist' + rootPackage.main.replace('./', '/'),
  module: './dist' + rootPackage.module.replace('./', '/'),
  types: './dist' + rootPackage.types.replace('./', '/'),
  // Simplified exports to avoid Vite dependency scan issues
  // Paths include /dist/ prefix for npm installation
  exports: {
    './vue': './dist/vue-mathlive.mjs',
    './fonts.css': './dist/mathlive-fonts.css',
    './static.css': './dist/mathlive-static.css',
    '.': {
      types: './dist/types/mathlive.d.ts',
      import: './dist/mathlive.min.mjs',
      require: './dist/mathlive.min.js',
    },
    './ssr': {
      types: './dist/types/mathlive-ssr.d.ts',
      import: './dist/mathlive-ssr.min.mjs',
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
