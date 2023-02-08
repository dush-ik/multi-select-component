class MultiSelect extends HTMLElement {
  constructor () {
    super();
    this.attachShadow({mode: "open"});

  }

  connectedCallback() {
    const { options } = JSON.parse(this.children[0].innerHTML);
    this.options = options;
  }

  // attributeChangedCallback(name, oldValue, newValue) {
  //   switch(name) {
  //     case 'options': 
  //     debugger
  //       this.options = options;
  //       break;
  //   }
  // }

  // get options () {return  this.getAttribute('options')};

  // set options (options) {return this.setAttribute ('options', 'options')};
}

// MultiSelect.getObservedAttributes = () => ['options'];

MultiSelect.template = document.createElement('template');

MultiSelect.template.innerHTML = `
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

customElements.define('multi-select', MultiSelect);