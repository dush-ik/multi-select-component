class MultiSelect extends HTMLElement {
  static get observedAttributes() { return ['open']; }

  constructor() {
    super();
    this.selectedOptions = [];
    this.attachShadow({ mode: "open" });

    this.shadowRoot.innerHTML = `
      <style>
        :host {
          display: block;
          border: 1px solid #ccc;
          border-radius: 5px;
          padding: 8px;
          background: #fff;
          width: fit-content;
          font-family: sans-serif;
        }
        .select-label {
          font-weight: bold;
          margin-bottom: 4px;
          cursor: pointer;
          display: block;
          user-select: none;
        }
        .options-container {
          display: none;
          margin-top: 8px;
          border: 1px solid #eee;
          padding: 4px;
          max-height: 200px;
          overflow-y: auto;
        }
        .options-container.open {
          display: block;
        }
      </style>

      <input type="hidden" name="selectedOptions[]">
      <label class="select-label">Select options ▾</label>
      <div class="options-container"><slot></slot></div>
    `;

    this.hiddenInput = this.shadowRoot.querySelector('input[type="hidden"]');
    this.label = this.shadowRoot.querySelector('.select-label');
    this.dropdownContainer = this.shadowRoot.querySelector('.options-container');

    this.label.addEventListener('click', () => {
      this.toggleAttribute('open');
    });

    this.addEventListener('option-change', (e) => {
      this.handleOptionChange(e.detail.value, e.detail.checked);
    });
  }

  connectedCallback() {
    this.render();
  }

  attributeChangedCallback() {
    this.render();
  }

  get selectedValues() {
    return [...this.selectedOptions];
  }

  handleOptionChange(value, checked) {
    if (checked) {
      if (!this.selectedOptions.includes(value)) this.selectedOptions.push(value);
    } else {
      this.selectedOptions = this.selectedOptions.filter(v => v !== value);
    }
    this.render();
    this.dispatchEvent(new Event('change', { bubbles: true, cancelable: true }));
  }

  render() {
    this.dropdownContainer.classList.toggle('open', this.hasAttribute('open'));
    this.hiddenInput.value = this.selectedOptions.join(',');
  }

}

customElements.define('multi-select', MultiSelect);