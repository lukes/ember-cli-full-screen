# ember-cli-full-screen

An [Ember CLI Addon](http://www.ember-cli.com/) that provides a
pure-Ember Mixin to easily control the fullscreening of components.

You can view a simple [demo here](http://lukes.github.io/ember-cli-full-screen/).

## Installation

Run the install command on your ember-cli project:

`ember install ember-cli-full-screen`

## Usage

Add the mixin to your components:

```javascript
// app/components/my-component.js
import Ember from 'ember';
import FullScreenMixin from 'ember-cli-full-screen/mixins/full-screen';

export default Ember.Component.extend(FullScreenMixin, {
    // Your component code...
});
```

Your components will then have the following actions:

* `toggleFullscreen`
* `enterFullscreen`
* `exitFullscreen`

And the boolean property `fullscreen` to check if the component is
fullscreened.

Fullscreen can additionally be exited by hitting `Esc`.

## Examples

Toggling fullscreen from the component's template:

```handlebars
<span {{action 'toggleFullscreen'}}>Toggle fullscreen</span>
```

Using the `fullscreen` property to check for fullscreen state:

```handlebars
{{#if fullscreen}}
  We're in fullscreen!
  <span {{action 'exitFullscreen'}}>Exit fullscreen</span>
{{else}}
  <span {{action 'enterFullscreen'}}>Fullscreen</span>
{{/if}}
```

You can of course use `send()` from within the component itself:

```javascript
export default Ember.Component.extend({
  actions: {
    conditionallyToggleFullscreen() {
      if (this.get('someCheck')) {
        this.send('toggleFullscreen');
      }
    }
  }
});
```
