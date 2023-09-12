# JsDomObserver


## Overview

`DomObserver` is a module designed to detect DOM changes. The module allows you to register callbacks that will be invoked when specific types of changes occur in the DOM, such as addition, deletion, or modification of nodes.

## Installation

```
yarn add @knighttower/js-dom-observer
```  


```typescript
import DomObserver, { addOnNodeChange, removeOnNodeChange, cleanup } from './DomObserver';
```

## API

### `addOnNodeChange(id: string, callback: () => void): void`

Registers a callback function that will be invoked whenever a relevant DOM change occurs.

- `id`: A unique identifier for the callback.
- `callback`: The function to be executed when a DOM change occurs.

#### Example

```typescript
addOnNodeChange('elementIdentifier', () => {
  console.log('Node changed');
});
```

### `removeOnNodeChange(id: string): void`

Removes a previously registered callback function so that it will no longer be invoked when the DOM changes.

- `id`: The unique identifier for the callback you wish to remove.

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

