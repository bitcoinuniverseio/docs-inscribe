# Accessibility

Inscribe is built to be used with a keyboard, a screen reader, a magnifier, or
none of those. This page says what that means in practice and how it is
checked.

## Colour and contrast

Every colour in the app comes from a named role rather than a value typed into
a component, and each role is measured against the surface it lands on. A
component can say "this is a warning" or "this is the primary action". It
cannot say "this is amber".

That is a rule the build enforces, not a convention. A component that names a
colour fails the tests before it can be merged.

The brand pink is the clearest example of why roles exist. `#ff0066` is the
Bitcoin Universe colour, but white text on it measures 3.85:1, below the 4.5:1
that WCAG AA asks for. So the pink has three jobs and three values:

| Role | What it is for | Measured |
| --- | --- | --- |
| Brand fill | Buttons and chips that carry a white label | 4.80:1 with white |
| Brand text | Pink words on a page background | at least 4.5:1 on every surface it lands on |
| Brand tint | Washes and focus rings | nothing readable sits on it, so the original pink stays |

Success, warning, danger and information work the same way, and each has a
light value and a dark value that were measured separately.

They are measured in the hardest case rather than the easiest. A status chip
inside a status panel inside a section puts three tinted washes over the same
background, and each one shifts it. Every status colour is checked against
three stacked washes on the lightest surface of its theme, because that is what
actually reaches the screen.

## Type size

Nothing renders below 11 pixels. That is a floor the build enforces, not a
guideline: a component asking for a smaller size fails the tests.

The floor exists because small text collects in the places that matter most.
Before it was enforced, the smallest text in the product was on the panel that
lists what a UTXO holds, which is the one screen that tells you an asset is at
risk.

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
  your operating system's reduced-motion setting without being asked. There is
  less to remove than there used to be: the app no longer runs decorative
  animation at all. What moves is reporting something — content loading, a
  panel arriving, a transaction still waiting on the chain.
- **Density** switches between compact, comfortable and spacious spacing.
- **Enhanced focus rings** makes the keyboard focus outline heavier.
- **Screenshot safe** hides balances and addresses so you can share a view.
- **Colour-blind safe** moves the success, warning and danger colours onto a
  blue, yellow and purple set that separates under deuteranopia and
  protanopia. Colour is never the only signal for a state, so this is a
  legibility aid rather than the state itself.

Each of these changes the colour roles rather than a list of components, so it
reaches every screen, including ones written after the control existed.

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
