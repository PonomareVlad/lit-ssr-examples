import {LitElement, html, css} from 'lit';

export class ServerURL extends LitElement {

  static styles = css`
    pre {
      white-space: pre-line;
      overflow-x: scroll;
    }
  `;

  static properties = {url: {type: String}};

  render = () => html`
    <h1>Server URL</h1>
    <pre>${this.url}</pre>
  `;

}

customElements.define('server-url', ServerURL);
