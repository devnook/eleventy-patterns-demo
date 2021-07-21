const patterns = require('../_data/patterns')();
const {getPattern} = require('../_filters/patterns');
const { html } = require('common-tags');

const Pattern = (id) => {
  const pattern = getPattern(id, patterns);
  const tags = pattern.tags.map(tag => {
    return html`<span class="pattern__tag">${tag}</span>`;
  }).join('\n');

  const assets = Object.values(pattern.assets).map(asset => {
    return html`
    <div class="pattern__asset">
        <div>${ asset.type }</div>
        <div>${ asset.content }</div>
    </div>
    `;
  }).join('\n');

  return html`<section class="pattern">
  <div class="pattern__meta">
    <h1>
      <a href="/patterns/${pattern.id}">
        ${ pattern.title || pattern.id }
      </a>
    </h1>
    <div class="pattern__tags">
    Tags:
    ${tags}
    </div>
  </div>
  <div class="pattern__content">
    <div class="pattern__demo">
      <iframe src="/patterns/${pattern.demo}"></iframe>
    </div>
    <div class="pattern__assets">
        ${assets}
    </div>
  </div>
  <div class="pattern__foote">
    <a href="/patterns/${pattern.demo}" target="_blank">
      Demo
    </a>
  </div>
</section>`;
};

module.exports = { Pattern };
