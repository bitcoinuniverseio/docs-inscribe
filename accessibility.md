# Accessibility

Inscribe is built to be used with a keyboard, a screen reader, a magnifier, or
none of those. This page says what that means in practice and how it is
checked.

## Colour and contrast

Every colour in the app comes from a named token rather than a value typed into
a component, and each token is measured against the surface it lands on.

The brand pink is the clearest example. `#ff0066` is the Bitcoin Universe
colour, but white text on it measures 3.85:1, below the 4.5:1 that WCAG 2.1 AA
asks for. So the pink has three jobs and three values:

| Role | What it is for | Measured |
| --- | --- | --- |
| Brand fill | Buttons and chips that carry a white label | 4.80:1 with white |
| Brand text | Pink words on a page background | at least 4.5:1 on every surface |
| Brand glow | Shadows, washes and focus rings | nothing readable sits on it |

Muted secondary text follows the same rule. On the dark theme it resolves to a
tier measured against the dark panels rather than to a grey that happens to
look right.

## Themes

Light and dark are both first-class. The app follows your system setting by
default and remembers an explicit choice. Neither theme is a filter over the
other: each has its own measured values for surfaces, borders, text tiers,
brand and status colours.

## Controls you can turn on

Settings carries display controls that change how the app renders for you:

- **High contrast** strengthens borders and separators.
- **Large text** raises the base type size.
- **Reduced motion** removes transitions and animation. The app also honours
  your operating system's reduced-motion setting without being asked.
- **Density** switches between compact, comfortable and spacious spacing.
- **Enhanced focus rings** makes the keyboard focus outline heavier.
- **Screenshot safe** hides balances and addresses so you can share a view.

## Keyboard and screen readers

- A skip link is the first focusable element on every page and jumps to the
  main content.
- The command palette opens with `Ctrl` + `K`, or `Cmd` + `K` on macOS, and
  reaches every workspace by name.
- Modal dialogs hold focus while they are open and hand it back to whatever
  opened them.
- Live regions announce the changes you would otherwise have to notice, such
  as a source going down or an order moving on.
- Primary buttons and inputs are 44 pixels tall, which is what a finger needs.
  The enforced floor is lower, and the next section says exactly what it is.

## What gets checked, and how

Accessibility is a release gate, not a review pass.

Every pull request runs axe-core against the app's real routes in ten browser
and viewport combinations: Chromium, Firefox and WebKit, in light and dark,
from 320 pixels wide up to 1440. The routes include the states that are easy to
forget, such as a workspace whose data source is unavailable, an order being
recovered, and a first visit with the consent banner still up.

A run fails on any of these:

- an axe violation at serious or critical impact, against the WCAG 2.0, 2.1 and
  2.2 A and AA rule sets;
- an interactive target whose pointer region is under 24 by 24 pixels, which is
  the WCAG 2.2 AA floor, measured on the label where a control is bound to one;
- horizontal overflow on the document, the body, or the main region;
- a cumulative layout shift above 0.05 on Home, Explore, Runes, Tools, Activity
  or Portfolio;
- a runtime error in the browser console.

## Where it falls short

The app has not been audited by an external accessibility practitioner, and
automated checks catch roughly a third to a half of real barriers. Colour,
structure, focus order and overflow are covered well. Judgement calls, such as
whether a label reads clearly out of context, are not.

If something blocks you, [open an issue](https://github.com/bitcoinuniverseio/docs-inscribe/issues).
Say what you were doing and what you use to browse. That is more useful than a
rule number.
