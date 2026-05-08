# Multi-Select Web Component

A lightweight, modular multi-select dropdown component built using native Web Components.

## Features

- **Two-Component Architecture**: Uses a parent `<multi-select>` and child `<multi-select-option>` components for maximum flexibility.
- **Declarative Syntax**: Easy to implement using standard HTML tags.
- **JSON Support**: Also supports a `data-options` attribute for dynamic data loading.
- **Form Compatible**: Includes a hidden input field to ensure selected values are submitted with standard HTML forms.
- **Zero Dependencies**: Built with native Web APIs (Custom Elements, Shadow DOM).

## Installation

Include the scripts in your HTML:

```html
<script src="multi-select-option.js"></script>
<script src="multi-select.js"></script>
```

## Usage

### Declarative Approach (Recommended)
The most readable way to define options is by nesting the option components:

```html
<multi-select>
  <multi-select-option value="red">Red</multi-select-option>
  <multi-select-option value="blue">Blue</multi-select-option>
  <multi-select-option value="green">Green</multi-select-option>
</multi-select>
```

### Dynamic Approach (JSON Attribute)
You can also pass options as a JSON array via the `data-options` attribute:

```html
<multi-select 
  data-options='[{"value": "red", "text": "Red"}, {"value": "blue", "text": "Blue"}]'>
</multi-select>
```

## API

### Properties & Methods
- `selectedValues`: Returns an array of currently selected option values.

### Events
- `change`: Dispatched whenever a selection is updated.

```javascript
const multiSelect = document.querySelector('multi-select');
multiSelect.addEventListener('change', (e) => {
  console.log('Selected values:', multiSelect.selectedValues);
});
```
