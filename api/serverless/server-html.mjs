import {render, html} from '@lit-labs/ssr';
import {
    RenderResultReadable
} from '@lit-labs/ssr/lib/render-result-readable.js';
import {
    pageServerTemplate
} from '##/src/page-template.mjs';
import '##/src/server-url.mjs';
import {
    urlFromRequest
} from '##/src/utils.mjs';
import importmap from '##/src/importmap.mjs';

const head = () => html`
    <script src='/src/server-url.mjs' type='module' defer></script>
`;

const body = ({url = ''} = {}) => html`
    <server-url url='${url}'></server-url>
`;

export default (request, response) => {
    const url = urlFromRequest(request);
    const result = render(pageServerTemplate({head, body, importmap, context: {url}}));
    response.setHeader('content-type', 'text/html');
    new RenderResultReadable(result).pipe(response);
}

export const config = {supportsResponseStreaming: true};
