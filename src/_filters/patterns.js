
const path = require('path');

const getPatternId = url => path.relative('/patterns/', url);

const getPattern = (id, patterns) => {
  return patterns.find((item) => item.id === id);
};

module.exports = {
  getPattern,
  getPatternId
}
