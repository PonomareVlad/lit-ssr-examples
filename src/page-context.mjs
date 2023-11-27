import {LitElement, html} from 'lit';
import {ContextProvider, createContext} from '@lit/context';

export const context = createContext(Symbol('page'));

export class PageContext extends LitElement {

  static properties = {page: {state: true}};

  _page = new ContextProvider(this, {context});

  serverCallback() {
    super.serverCallback();
    this._page.setValue(this.page);
  }

  connectedCallback() {
    super.connectedCallback();
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
