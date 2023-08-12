import {css, html, nothing} from 'lit';

const empty = () => '';

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
    head = empty,
    body = empty,
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
      <meta content='width=device-width, initial-scale=1.0, maximum-scale=1.0' name='viewport'>
      <style>`;
  yield style.toString();
  yield `</style>`;
  yield* head(context);
  yield `</head>
    <body>
    <main>`;
  yield* body(context);
  yield `</main>
    <footer>
      <p>← <a href='/'>Back to examples list</a></p>
    </footer>
    </body>
    </html>`;
}
