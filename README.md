# foodstuffs-technical-exercise

## Getting started

### To build

```bash
pnpm run build
```

### Run unit tests

```bash
pnpm run test
```

### Run dev server

```bash
pnpm run dev
```

### Run automated tests

```bash
pnpm run e2e
```

### Adding UI components

```bash
pnpm dlx shadcn@latest add <component>
```

## Notes on exercise

For this exercise I tried to break the product specification down into the smallest pieces of work I thought they could be while still delivering something meaningful per slice.

I broke the tasks down into four main categories:

- Repository setup
- Core features
- Enhancements
- Bug fixes

### Repo setup

For these tasks I wanted to setup a good foundation for the project by

- choosing a build tool that is fast and user-friendly
- choosing up a styling framework and component library that is flexible and allows for fast developlement
- choosing a robust unit testing and e2e testing framework
- setting up a CI/CD pipeline to validate changes before they're merged

and I recored these architectural decisons in the [/docs/adr/](/docs/adr/) folder.

### Core features

For the core features my thinking was to break up everything into small self contained peices that could be easily tested and reviewed. I landed on two tasks:

- create the initial form layout
- calculate and output the price total

I was tempted to combine these tasks as they do feel incomplete on their own but I think it can be okay to split up the layout and business logic work into separate pieces, especially if they can be worked on in parallel.

The calculation of the price total, including tax and discount, I thought should stay together as one piece of work vs. breaking it down into calculating tax, then applying discounts. It's a small calculation and I don't think it makes sense without all the pieces together.

### Enhancements

These tasks were to iterate on the styling and codebase to improve UX and code maintainability:

- enhance the number input
- enhance the select input
- enhance the submit button

### Bug fixes

Unplanned of course 😅
