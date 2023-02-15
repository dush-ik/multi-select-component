class MultiSelectOption extends HTMLElement {
  constructor () {
    super();
    this.attachShadow({mode: "open"});
  }
}

// MultiSelect.getObservedAttributes = () => ['options'];

MultiSelectOption.template = document.createElement('template');

MultiSelectOption.template.innerHTML = `
  <style>
    :host {
      display: 'inline-block';
      border: 1px solid black;
      border-radius: 5px;
    }

    :host[hidden] {
      display: 'none';
    }
  </style>
  <input type="checkbox" name="" value="" />
`

customElements.define('multi-select-option', MultiSelectOption);