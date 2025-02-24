import {html} from 'lit';
import {render} from '@lit-labs/ssr';
import {
  createReadableStream
} from '@lit-labs/ssr/lib/render-result-readable-stream.js';
import {
  pageServerTemplate
} from '../../src/page-template.mjs';
import '../../src/server-url.mjs';
import {
  urlFromRequest
} from '../../src/utils.mjs';
import importmap from '../../importmap.json';

const headers = {'content-type': 'text/html'};

const head = () => html`
  <script src='/src/server-url.mjs' type='module' defer></script>`;

const body = ({url = ''} = {}) => html`
  <server-url url='${url}'></server-url>
`;

export default request => {
  const url = urlFromRequest(request);
  const result = render(pageServerTemplate({head, body, importmap, context: {url}}));
  return new Response(createReadableStream(result), {headers});
}

export const config = {runtime: 'edge', supportsResponseStreaming: true};
