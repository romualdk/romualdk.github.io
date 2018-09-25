# Javascript sprite animation tests using different methods

Tests made to choose the best approach.

The best approach is to use webgl with 2d context as a fallback.

Funny fact is that using position left / top is better than transform translate if you have multiple DOM elements.

- [Canvas 2d context](https://romualdk.github.io/ppu-test/canvas-2d.html)
- [Canvas webgl context](https://romualdk.github.io/ppu-test/canvas-webgl.html)
- [DOM and CSS position: top / left](https://romualdk.github.io/ppu-test/css-position.html)
- [DOM and CSS transform: translate](https://romualdk.github.io/ppu-test/css-transform.html)

Canvas Webgl script: (https://github.com/kutuluk/js13k-2d)

Canvas 2d context script: (https://github.com/straker/kontra)