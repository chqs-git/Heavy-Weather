> Discussion on the main challenges, issues & approaches found related to the **Heavy Weather** Project.


Time is precious, so naturally we want applications that offer a **fast** experience.

One of the main issues working with volumetric clouds on a tridimensional space is **time**.
- Techniques like *ray marching* to render a volumetric cloud are slow and require optimizations to run at an acceptable frame rate.
- Other issue is the time it takes to generate said *Cloud*. Generating data inside a 3D space can easily get expensive because of the sheer length of data that needs to be calculated.

Here is documented how each of these issues were approached and solved:

## Rendering time


## Generating time
> Generating large amounts of data takes time and sometimes can be unavoidable. This is an issue that can be optimized and **even** taken advantage of. 