const { Pattern } = require('./src/_shortcodes/Pattern');
const { getPatternId, getPattern } = require('./src/_filters/patterns');

module.exports = function (eleventyConfig) {
  eleventyConfig.addShortcode('Pattern', Pattern);
  eleventyConfig.addFilter('getPatternId', getPatternId);
  eleventyConfig.addFilter('getPattern', getPattern);
  eleventyConfig.addWatchTarget("./src/_shortcodes/");

  eleventyConfig.addPassthroughCopy("./src/js");

  return {
    dir: {
      input: 'src',
      output: 'dist',
    },
    templateFormats: ['njk', 'md'],
    htmlTemplateEngine: 'njk',
    markdownTemplateEngine: 'njk',
  };
};
