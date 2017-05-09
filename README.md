# Simpla Element Behavior
![Version][bower-badge] [![Build status][travis-badge]][travis-url] ![Size][size-badge] [![Published][webcomponents-badge]][webcomponents-url]

This Polymer behavior sets up everything you need to connect your element to Simpla's API. It handles setting and getting data, keeping in sync with state, and reacting to changes in content.

## Installation & usage

Install simpla-element-behavior with Bower (Yarn support coming soon)

```sh
$ bower install simpla-element-behavior --save
```

Import into your element

```html
<link rel="import" href="/bower_components/simpla-element-behavior/simpla-element-behavior.html">
```

And include the behavior by adding `SimplaBehaviors.Element(config)` in your behaviors array with the configuration options for your element (see full options below)

```js
const SIMPLA_CONFIG = {
  type: 'Text',
  dataProperties: [ 'value' ]
};

Polymer({
  is: 'my-element',

  ...

  behaviors: [ SimplaBehaviors.Element(SIMPLA_CONFIG) ]
});
```

## Configuration

Property         | Type     | Description                                                                                                                                  
---------------- | -------- | ------------                                                                                                                                  
`type`           | `String` | Type of content created by this element (read more about [Simpla's content model](https://www.simpla.io/docs/guides/content-model))          
`dataProperties` | `Array`  | The properties you wish to sync to Simpla's API                                                                                                  
`getCallback`    | `String` | Override the default method used to set properties on your element from Simpla, specified as the name of a method available on your element
`setCallback`    | `String` | Override the default method used to set data to Simpla's buffer, specified as the name of a method available on your element                    

The `setCallback` method expects you to return the values you wish to set to Simpla every time your `dataProperties` change. If you return `null` or `undefined` the buffer is not updated.

## Properties

This behavior adds the following properties to your element. Any property can be overriden by adding your own property definition of the same name in the main `Polymer` constructor

Property   | Type      | Description                                                                         
---------- | --------- | ------------                                                                         
`path`     | `String`  | Content path where the element will store its data on Simpla's API, set by the user
`editable` | `Boolean` | Whether the element should be editable, synced to Simpla's `'editable'` state       
`loaded`   | `Boolean` | Whether a new path's data has been set on the element                               

## Contributing

If you find any issues with simpla-element-behavior please report them! If you'd like to see a new feature in supported file an issue or let us know in Simpla's public [Slack group](https://slack.simpla.io). We also happily accept PRs.

***

MIT © Simpla

[bower-badge]: https://img.shields.io/bower/v/simpla-element-behavior.svg
[bowerlicense-badge]: https://img.shields.io/bower/l/simpla-element-behavior.svg
[travis-badge]: https://img.shields.io/travis/SimplaElements/simpla-element-behavior.svg
[travis-url]: https://travis-ci.org/SimplaElements/simpla-element-behavior
[bowerdeps-badge]: https://img.shields.io/gemnasium/SimplaElements/simpla-element-behavior.svg
[bowerdeps-url]: https://gemnasium.com/bower/simpla-element-behavior
[size-badge]: https://badges.herokuapp.com/size/github/SimplaElements/simpla-element-behavior/master/simpla-element-behavior.html?gzip=true
[webcomponents-badge]: https://img.shields.io/badge/webcomponents.org-published-blue.svg
[webcomponents-url]: https://www.webcomponents.org/element/SimplaElements/simpla-element-behavior.svg
