import '@lit-labs/ssr-dom-shim';
import {html} from 'lit';
import {render} from '@lit-labs/ssr';
import {
  createReadableStream
} from '../../src/render-result-readable-stream.js';
import {
  pageTemplate
} from '../../src/page-template.mjs';
import '../../src/page-context.mjs';
import '../../src/server-url.mjs';
import {
  urlFromRequest
} from '../../src/utils.mjs';
import importmap from '../../importmap.json';

const headers = {'content-type': 'text/html'};

const head = () => render(html`
  <script src='/src/page-context.mjs' type='module' defer></script>
  <script src='/src/server-url.mjs' type='module' defer></script>
`);

const body = context => render(html`
  <page-context .page='${context}'>
    <server-url></server-url>
  </page-context>
`);

export default request => {
  const url = urlFromRequest(request);
  const result = pageTemplate({head, body, importmap, context: {url}});
  return new Response(createReadableStream(result), {headers});
}

export const config = {runtime: 'edge', supportsResponseStreaming: true};
