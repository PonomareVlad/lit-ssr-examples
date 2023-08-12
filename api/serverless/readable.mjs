import {html} from 'lit';
import {render} from '@lit-labs/ssr';
import {
  RenderResultReadable
} from '@lit-labs/ssr/lib/render-result-readable.js';
import {
  pageTemplate
} from '##/src/page-template.mjs';
import '##/src/server-url.mjs';
import {
  urlFromRequest
} from '##/src/utils.mjs';
import importmap from '##/src/importmap.mjs';

const head = () => render(html`
  <script src='/src/server-url.mjs' type='module'></script>
`);

const body = ({url = ''} = {}) => render(html`
  <server-url url='${url}'></server-url>
`);

export default (request, response) => {
  const url = urlFromRequest(request);
  const result = pageTemplate({head, body, importmap, context: {url}});
  response.setHeader('content-type', 'text/html');
  new RenderResultReadable(result).pipe(response);
}
