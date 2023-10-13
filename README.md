# Note:

**For better maintenance, this library has been placed along with JsUtilities (https://github.com/knighttower/JsUtility) to create an easier entry point for many resources that will collaborate together**
--> only the docs will remain here for now.

## Installation

```javascript
npm i @knighttower/js-utility-functions
```

```javascript
yarn add @knighttower/js-utility-functions
```

```javascript
import DomObserver from '@knighttower/js-utility-functions';
```

## In the browser

It loads as a 'window' object --> window.DomObserver

```html
<script src=" https://cdn.jsdelivr.net/npm/@knighttower/js-utility-functions@latest/dist/browser/DomObserver.min.js"></script>

// ---> Also available as ESM, UMD, CJS, JS // ESM
<script src="https://esm.run/@knighttower/js-utility-functions@latest/index.mjs"></script>
// UMD
<script src="https://cdn.jsdelivr.net/npm/@knighttower/js-utility-functions@latest/dist/umd/DomObserver.min.js"></script>
// CJS
<script src="https://cdn.jsdelivr.net/npm/@knighttower/js-utility-functions@latest/dist/cjs/DomObserver.min.js"></script>
```

---

# JsDomObserver

## Overview

`DomObserver` is a module designed to detect DOM changes. The module allows you to register callbacks that will be invoked when specific types of changes occur in the DOM, such as addition, deletion, or modification of nodes.

## Installation

```
yarn add @knighttower/js-dom-observer
```

```typescript
import DomObserver from '@knighttower/js-dom-observer';
```

or only some modules

```typescript
import { addOnNodeChange, removeOnNodeChange } from '@knighttower/js-dom-observer';
```

[![NPM published](https://github.com/knighttower/JsDomObserver/actions/workflows/to-npm.yml/badge.svg)](https://github.com/knighttower/JsDomObserver/actions/workflows/to-npm.yml)  
[![release version](https://github.com/knighttower/JsDomObserver/actions/workflows/pre-release.yml/badge.svg)](https://github.com/knighttower/JsDomObserver/actions/workflows/pre-release.yml)

## API

### `addOnNodeChange(id: string, callback: () => void): void`

Registers a callback function that will be invoked whenever a relevant DOM change occurs.

-   `id`: A unique identifier for the callback.
-   `callback`: The function to be executed when a DOM change occurs.

#### Example

```typescript
addOnNodeChange('elementIdentifier', () => {
    console.log('Node changed');
});
```

### `removeOnNodeChange(id: string): void`

Removes a previously registered callback function so that it will no longer be invoked when the DOM changes.

-   `id`: The unique identifier for the callback you wish to remove.

#### Example

```typescript
removeOnNodeChange('elementIdentifier');
```

### `cleanup(): void`

Removes all registered callback functions. Useful for deep cleanup.

#### Example

```typescript
cleanup();
```

## Internal Mechanism

The module uses `MutationObserver` to observe changes to the DOM. The observer is configured to look for changes in child elements (`childList`) and in the subtree (`subtree`).

## License

This module is under the MIT License. Created by [Knighttower](https://github.com/knighttower) in 2022.
