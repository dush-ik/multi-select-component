class MultiSelect extends HTMLElement {
  constructor() {
    super();
    this.selectedOptions = [];
  }

  connectedCallback() {
    if (!this.shadowRoot) {
      this.attachShadow({ mode: "open" });
      this.setupStyles();
      this.render();
    }
  }

  setupStyles() {
    const style = document.createElement('style');
    style.textContent = `
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
    `;
    this.shadowRoot.appendChild(style);
  }

  render() {
    if (!this.shadowRoot) return;

    const styleElement = this.shadowRoot.querySelector('style');
    this.shadowRoot.innerHTML = '';
    if (styleElement) this.shadowRoot.appendChild(styleElement);

    const hiddenInput = document.createElement('input');
    hiddenInput.type = 'hidden';
    hiddenInput.name = 'selectedOptions[]';
    this.shadowRoot.appendChild(hiddenInput);

    const label = document.createElement('label');
    label.className = 'select-label';
    label.textContent = 'Select options ▾';
    label.addEventListener('click', () => {
      const container = this.shadowRoot.querySelector('.options-container');
      if (container) container.classList.toggle('open');
    });
    this.shadowRoot.appendChild(label);

    const dropdownContainer = document.createElement('div');
    dropdownContainer.className = 'options-container';
    this.shadowRoot.appendChild(dropdownContainer);

    // Support both JSON data-options AND children <multi-select-option> tags
    const optionsAttr = this.getAttribute('data-options');
    if (optionsAttr) {
      try {
        const options = JSON.parse(optionsAttr);
        options.forEach(opt => {
          const optionEl = document.createElement('multi-select-option');
          optionEl.setAttribute('value', opt.value);
          optionEl.textContent = opt.text;
          dropdownContainer.appendChild(optionEl);
        });
      } catch (e) {
        console.error('Invalid JSON in data-options attribute', e);
      }
    } else {
      // If no attribute, just move children into the dropdown container
      const children = Array.from(this.childNodes).filter(node => node.nodeName === 'MULTI-SELECT-OPTION');
      children.forEach(child => dropdownContainer.appendChild(child));
    }

    // Listen for change events from the child options
    this.addEventListener('option-change', (e) => {
      this.handleOptionChange(e.detail.value, e.detail.checked);
    });
  }

  handleOptionChange(value, checked) {
    if (checked) {
      if (!this.selectedOptions.includes(value)) {
        this.selectedOptions.push(value);
      }
    } else {
      this.selectedOptions = this.selectedOptions.filter(opt => opt !== value);
    }

    this.dispatchEvent(new Event('change', { bubbles: true, cancelable: true }));

    const hiddenInput = this.shadowRoot.querySelector('input[type="hidden"]');
    if (hiddenInput) {
      hiddenInput.value = this.selectedOptions.join(',');
    }
  }

  get selectedValues() {
    return this.selectedOptions;
  }

  static define() {
    customElements.define('multi-select', MultiSelect);
  }
}

MultiSelect.define();
