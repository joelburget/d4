# d4 -- **Declarative** Data-Driven Documents

## What is it?

d4 is an experiment in using React to produce data-driven documents (ala d3)
that are performant and understandable. This is *not* a library, but rather a
demonstration that it's possible (and preferable) to use React instead of the
core of d3.

## Why?

d3 can produce fantastic results. Look no further than [Mike Bostock's
blocks](https://bl.ocks.org/mbostock) for examples. Unfortunately, I
always find d3 code surprisingly difficult to understand and extend, in the
same way I used to find code difficult to approach before React encouraged a
declarative style. By using React (which can render SVGs, no problem) for
data-driven documents, we can improve comprehension and performance and use
tools from the React ecosystem.

## How does it work?

We replace the core d3 interaction of [Enter, Update, Exit](https://medium.com/@c_behrens/enter-update-exit-6cafc6014c36#.yty2g8g0e) with, well, `render`. Let's first see an example.

### d3

```javascript
var svg = d3.select("body").append("svg")
    .attr("width", width)
    .attr("height", height);

svg.selectAll("path")
    .data(voronoi(samples).polygons())
  .enter().append("path")
    .attr("d", d => `M${d.join("L")}Z`)
    .style("fill", d => color(d.point))
    .style("stroke", d => color(d.point));
```

### d4

```javascript
function Mesh() {
  const paths = voronoi(samples)
    .polygons()
    .map(sample => (
      <path
        d={`M${sample.join('L')}Z`}
        fill={color(sample.data)}
        stroke={color(sample.data)}
      />
    ));

  return (
    <svg width={width} height={height}>
      {paths}
    </svg>
  );
}
```

We replace the mutating `select`, `selectAll`, `enter`, `append`, `data`, `attr`, and `style` with familiar React rendering of the points.

Animation is more complicated, but again, React can help. By using keys and the `ReactCSSTransitionGroup`, it's possible to describe animations in CSS, rather than using d3's interpolation. I haven't verified the performance, but I expect CSS transition group animations to be faster, since they're browser-native and avoid the JS engine. For example:

```javascript
d3.select("body")
    .style("color", "green") // make the body green
  .transition()
    .style("color", "red"); // then transition to red
```

Becomes (specifying the duration, which the original left out):

```css
body {
  transition: color 250ms;
}
```

## Why we still need d3

d3 does [a lot](https://github.com/d3/d3/blob/master/API.md) and we can continue to use most of it. In fact, these demos collectively use a [dozen d3 packages](https://github.com/joelburget/d4/blob/master/package.json). d3 is especially useful for calculating layouts and colors.

## Future Work

There are some pieces of d3 that I would love to use but aren't easily portable. For example, [d3-drag](https://github.com/d3/d3-drag) and [d3-zoom](https://github.com/d3/d3-zoom) smooth over a lot of the quirks you'd have to deal with when implementing dragging and zooming, but they're only designed to work with d3 selections (eg `selection.call(d3.zoom().on("zoom", zoomed));`).

I'm curious about the performance of this approach. I haven't benchmarked yet, but my intuition is that it should be fast -- as fast as React's reconciliation. However, I don't know how that part of d3 is implemented, so maybe d3 is actually faster.

A small thing -- it's possible to use only parts of d3. For example: `import {voronoi as d3Voronoi} from 'd3-voronoi';` instead of `d3.voronoi`, and `import {lab} from 'd3-color';` instead of `d3.color.lab`), but nobody uses it that way, so examples of the import style are hard to find (and it's often not obvious which name will be exported (`d3-geo` exports `geoArea` and `geoBounds` rather than `area` and `bounds`).

Besides the five completed demos, I've also started working on a few others, but I'm deferring them to get this article published.

## Demos

In all the demos we continue to use some d3 utilities, but use React to separate the logic from the display declaration. Take a look at the source for a few!
