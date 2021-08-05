const glob = require('fast-glob');
const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');
const md = require('markdown-it')();

const files = glob.sync('src/patterns/**/index.md');

// Create a Set to hold all of the ids
// This will be used to avoid duplicates.
const ids = new Set();

const stripDot = /^\./;


const allPatterns = files.map((file) => {
  const id = path.relative(
    'src/patterns/',
    path.dirname(file)
  );

  if (ids.has(id)) {
    throw new Error(`Duplicate pattern id found: ${id}`);
  }
  ids.add(id);

  // Read markdown file as a string
  const fileContents = fs.readFileSync(file, 'utf-8');

  // Use gray-matter to parse the frontmatter
  const matterResult = matter(fileContents);

  const assetsPaths = glob.sync(path.join(path.dirname(file),'*'));

  const assets = assetsPaths.reduce((out, assetPath) => {
    const basename = path.basename(assetPath);
    const name = basename.split('.')[0];
    const type = path.extname(assetPath).replace(stripDot, '');
    if (type !== 'md' && name !== 'demo') {
      const content = fs.readFileSync(assetPath, 'utf-8');
      out[basename] = {
        content,
        type,
        name: basename,
      }
    }
    return out;

  }, {});

  // Render markdown
  const content = md.render(matterResult.content);
  const demo = matterResult.data.demo || path.join('/', 'patterns', id, 'demo');
  return {
    id,
    ...matterResult.data,
    content,
    assets,
    demo,
  };
});

console.log(allPatterns)

module.exports = function () {
  return allPatterns;
};
