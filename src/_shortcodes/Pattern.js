const patterns = require('../_data/patterns')();
const {getPattern} = require('../_filters/patterns');
const { html } = require('common-tags');
const Prism = require('prismjs');


console.log(patterns)

const Pattern = (id) => {
  const pattern = getPattern(id, patterns);
  const tags = pattern.tags.map(tag => {
    return html`<span class="pattern__tag">${tag}</span>`;
  }).join('\n');

  const assets = Object.values(pattern.assets).map(asset => {
    console.log(asset.content)
    const content = Prism.highlight(asset.content, Prism.languages.html, 'html');

    return html`
    <web-tab title="${ asset.type }">
      <pre>
        <code class="language-${asset.type}">${ content }</code>
      </pre>
    </web-tab>
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
      <iframe src="${pattern.demo}"></iframe>
    </div>
    <div class="pattern__assets">
      <web-tabs>
        ${assets}
      </web-tabs>
    </div>
  </div>
  <div class="pattern__foote">
    <a href="${pattern.demo}" target="_blank">
      Demo
    </a>
  </div>
</section>`;
};



module.exports = { Pattern };
