# d4 -- **Declarative** Data-Driven Documents

By using React, we can produce data-driven documents (ala d3) that are
performant and understandable. This is *not* a library, but rather a
demonstration that it's possible (and preferable) to use React instead of the
core of d3.

## Why?

d3 can produce fantastic results. Look no further than [Mike Bostock's
blocks](https://bl.ocks.org/mbostock) for some examples. Unfortunately, I
always find d3 code difficult to understand and extend, in the same way I used
to find code difficult ot approach before React forced a declarative style. By
using React for data-driven documents, we can improve comprehension and
performance, and use tools from the React ecosystem.

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
    .attr("d", function(d) { return "M" + d.join("L") + "Z"; })
    .style("fill", function(d) { return color(d.point); })
    .style("stroke", function(d) { return color(d.point); });
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

Animation is more complicated, but again, React can help. By using keys and the `ReactCSSTransitionGroup`, TODO

## Why we still need d3

d3 does [a lot](https://github.com/d3/d3/blob/master/API.md) and we can continue to use most of it. In fact, these demos collectively use a [dozen d3 packages](https://github.com/joelburget/d4/blob/master/package.json). d3 is expecially useful for calculating layouts and colors.

There are some pieces of d3 that I would love to use but aren't easily portable. For example, [d3-drag](https://github.com/d3/d3-drag) and [d3-zoom](https://github.com/d3/d3-zoom) smooth over a lot of the quirks you'd have to deal with when implementing dragging and zooming, but they're only designed to work with d3 selections (eg `selection.call(d3.zoom().on("zoom", zoomed));`).

## Demos

In all the demos we continue to use d3, but we're forced by react to separate the logic from the display declaration.
