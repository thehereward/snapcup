# Styling

This project is styled using a combination of _bootstrap_ and custom CSS. All style should be applied to components through CSS classes: no inline styles should be used.

## CUBE CSS

This project is trying to follow the [CUBE CSS](https://cube.fyi/) pattern. This divides concerns into _composition_, _utilities_, _blocks_, and _exceptions_. Many of these concerns are handled by bootstrap classes at this time.

## CSS variables

In `app.scss` bootstrap variables are customised, and a few global CSS variables are set. It is recommended to use `font-family: var(--open-sans);` and `font-family: var(--asap)` to use those fonts as required. Also it is recommended to use `var(--colour-primary)`, `var(--colour-secondary)` and `var(--our-grey)` as colors as needed.
