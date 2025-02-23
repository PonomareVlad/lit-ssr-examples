import {html, isServer, LitElement} from 'lit';
import {ContextProvider, createContext} from '@lit/context';

export const context = createContext(Symbol('page'));

export class PageContext extends LitElement {

  static properties = {page: {state: true}};

  _page = new ContextProvider(isServer ? globalThis.litServerRoot : document.body, {context});

  connectedCallback() {
    super.connectedCallback();
    if (isServer) return this._page.setValue(this.page);
    const {href: url} = location;
    this._page.setValue(this.page = {url});
  }

  render() {
    return html`
      <slot></slot>
    `;
  }

}

customElements.define('page-context', PageContext);
