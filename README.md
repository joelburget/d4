# d4 -- *Declarative* Data-Driven Documents

This is a demonstration of authoring d3-like documents in a declarative style.
We're still able to use most of d3's functionality, but avoiding the mutable
core. Instead, we use React to specify the svg we want to see.

## Why?

d3 can produce fantastic results. Look no further than [Mike Bostock's
blocks](https://bl.ocks.org/mbostock) for some examples. Unfortunately, I
always find d3 code difficult to understand and extend, in the same way I used
to find code difficult ot approach before React forced a declarative style. By
using React for data-driven documents, we can improve comprehension and
performance, and use tools from the React ecosystem.

### What's here

* Selections (-ish)
* Transitions
* Shape generation
* Axes
* Layouts

### What's not

* Scales
* (Most) Array operations (get these from elsewhere)
* Math (get from D3)
* Loading external resources (get from D3)
* String formatting
* CSV formatting
* Localization
* Colors
* Namespaces
* Binding / dispatch helpers
* Controls (eventually)
* Time
* Geography
* Geometry
* Behaviors
