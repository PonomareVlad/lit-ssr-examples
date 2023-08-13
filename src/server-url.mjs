import {LitElement, html, css} from 'lit';
import {ContextConsumer} from '@lit-labs/context';
import {context} from './page-context.mjs';

export class ServerURL extends LitElement {

  static styles = css`
    pre {
      white-space: pre-line;
      overflow-x: scroll;
    }
  `;

  static properties = {url: {type: String}};

  _page = new ContextConsumer(this, {context, subscribe: true});

  render() {
    const url = this.url || this._page.value?.url;
    return html`
      <h1>Server URL</h1>
      <pre>${url}</pre>
    `;
  }

}

customElements.define('server-url', ServerURL);
