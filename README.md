# jQuery prettyselect

A lightweight jQuery plugin to prettify your <select> elements without replacing their default behaviour.

## Getting Started
Download the CSS[css] and JS[js] files.

[js]: https://raw.github.com/mikekloeden/prettyselect/master/dist/jquery.prettyselect.min.js
[css]: https://raw.github.com/mikekloeden/prettyselect/master/dist/prettyselect.css

In your web page:

```html
<link rel="stylesheet" type="text/css" href="dist/prettyselect.css">
<script src="dist/jquery.prettyselect.min.js"></script>
<script>
$(function() {
    $('select').prettyselect();
});
</script>
```

## Examples
_(Coming soon)_

## License
Copyright (c) 2012 Mike Klöden  
Licensed under the MIT license.

## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [grunt](https://github.com/cowboy/grunt).

### Important notes
Please don't edit files in the `dist` subdirectory as they are generated via grunt. You'll find source code in the `src` subdirectory!