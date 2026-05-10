class MultiSelectOption extends HTMLElement {
  static get observedAttributes() {
    return ['value', 'checked', 'disabled'];
  }

  constructor() {
    super();
    this.attachShadow({ mode: "open" });
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
        :host([disabled]) {
          cursor: not-allowed;
          opacity: 0.5;
        }
        :host([disabled]) input,
        :host([disabled]) label {
          cursor: not-allowed;
        }
      </style>
      <input type="checkbox" id="cb">
      <label for="cb"><slot></slot></label>
    `;
    this.input = this.shadowRoot.getElementById('cb');

    this.input.addEventListener('change', (e) => {
      this.dispatchEvent(new CustomEvent('option-change', {
        bubbles: true,
        composed: true,
        detail: { 
          value: this.getAttribute('value') || '', 
          checked: e.target.checked 
        },
      }));
    });
  }


  connectedCallback() {
    this.render();
  }

  attributeChangedCallback() {
    this.render();
  }

  render() {
    this.input.value = this.getAttribute('value') || '';
    this.input.checked = this.hasAttribute('checked');
    this.input.disabled = this.hasAttribute('disabled');
  }
}

customElements.define('multi-select-option', MultiSelectOption);
