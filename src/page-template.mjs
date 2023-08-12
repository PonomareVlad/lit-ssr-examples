import {css} from 'lit';

const defaultStyle = css`

  * {
    box-sizing: border-box;
  }

  :root {
    font-family: -apple-system,
    BlinkMacSystemFont,
    Roboto,
    Helvetica,
    Arial,
    sans-serif;
  }

  a {
    color: inherit;
  }

`;

export function* pageTemplate(
  {
    head,
    body,
    importmap,
    context = {},
    style = defaultStyle
  }
) {
  yield `
    <!DOCTYPE html>
    <html lang='en'>
    <head>
      <meta charset='UTF-8'>
      <meta content='dark light' name='color-scheme'>
      <meta content='width=device-width, initial-scale=1.0, maximum-scale=1.0' 
        name='viewport'>
      <style>`;
  yield style.toString();
  yield `</style>`;
  if (importmap) yield `
  <script type='importmap'>
    ${JSON.stringify(importmap, null, 2)}
  </script>
  `;
  yield `
  <script async crossorigin='anonymous' 
    src='https://ga.jspm.io/npm:es-module-shims@1.8.0/dist/es-module-shims.js'>
  </script>
  <script type='module'>
    import "@lit-labs/ssr-client/lit-element-hydrate-support.js";
  </script>
  `;
  if (head) yield* head(context);
  yield `
    </head>
    <body>
    <main>
  `;
  if (body) yield* body(context);
  yield `
    </main>
    <footer>
      <p>← <a href='/'>Back to examples list</a></p>
    </footer>
    </body>
    </html>
  `;
}
