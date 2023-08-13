import {html} from 'lit';
import {render} from '@lit-labs/ssr';
import {
  collectResultSync
} from '@lit-labs/ssr/lib/render-result.js';
import {
  pageTemplate
} from '../../src/page-template.mjs';
import '../../src/server-url.mjs';
import {
  urlFromRequest
} from '../../src/utils.mjs';
import importmap from '../../importmap.json';

const headers = {'content-type': 'text/html'};

const head = () => render(html`
  <script src='/src/server-url.mjs' type='module' defer></script>
`);

const body = ({url = ''} = {}) => render(html`
  <server-url url='${url}'></server-url>
`);

export default request => {
  const url = urlFromRequest(request);
  const result = pageTemplate({head, body, importmap, context: {url}});
  return new Response(collectResultSync(result), {headers});
}

export const config = {runtime: 'edge'};
