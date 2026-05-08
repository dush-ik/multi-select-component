class MultiSelectOption extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    this.render();
  }

  static get observedAttributes() {
    return ['value', 'checked'];
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (oldValue !== newValue) {
      this.render();
    }
  }

  render() {
    const value = this.getAttribute('value') || '';
    const text = this.textContent || 'Option';
    const isChecked = this.hasAttribute('checked');

    this.shadowRoot.innerHTML = `
      <style>
        :host {
          display: flex;
          align-items: center;
          margin-bottom: 4px;
          cursor: pointer;
        }
        input {
          margin-right: 8px;
          cursor: pointer;
        }
        label {
          cursor: pointer;
          flex: 1;
        }
      </style>
      <input type="checkbox" id="cb" value="${value}" ${isChecked ? 'checked' : ''}>
      <label for="cb">${text}</label>
    `;

    this.shadowRoot.querySelector('input').addEventListener('change', (e) => {
      this.dispatchEvent(new CustomEvent('option-change', {
        bubbles: true,
        composed: true,
        detail: {
          value: value,
          checked: e.target.checked
        }
      }));
    });
  }
}

customElements.define('multi-select-option', MultiSelectOption);
