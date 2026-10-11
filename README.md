# NxtLvlGaming

Website for Next Level Gaming & Novelties, built with React and Create React App.

## Local development

The frontend lives in [`frontend/`](./frontend/). From that directory, install
the dependencies and start the development server:

```sh
npm ci
npm start
```

The site is available at <http://localhost:3000>.

## Checks

Run the frontend test runner or create a local production build from
`frontend/`:

```sh
npm test
npm run build
```

`npm run build` only creates build output locally. The separate
`npm run deploy` command publishes the site to Firebase Hosting; do not use it
as a local verification step.
