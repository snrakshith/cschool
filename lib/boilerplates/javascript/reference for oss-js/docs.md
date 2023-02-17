# A website for reference for Opensource JavaScript

> Go to `node.cool` link

- Thought's or Goals
  - Links
  - Example template
  - Reference for Features
  - Files which goes into the project and their purpose
  - Use cases of the files
  - Package used code (npm modules)
  - Folder Stucture
  - Toolings
  - Release process in open source JS
  - Deploy with CI CD
  - Doc's
  - Contribution to the Project

---

### We need a:

- Transpiler => `Babel`
- Test Suit => `Jest`
- Bundler => `Parcel, Rollup`
- Linter => `ESLint`
- Code Formatter => `Preitter`
- CI Server => `CircleCI`
- CD => `Netlify`

---

### `Files and Folders`

- .npmrc
- .vscode
- .github
- .babelrc
- .circleci
- .gitignore
- jsdoc.json
- .npmignore
- .netlify.yml
- .eslintignore
- .editorconfig
- .eslintrc.json
- .gitattributes
- .preitterignore
- .preitterrc.json
- webpack.config.js

---

## Folders

- lib /
- bin /
- scripts /
- packages /
- examples /
- docs /
- tests /
- fixtures /

---

## !! Yarn Workspaces `( use Lerna )`

- `fixtures`

  - The process of fixing something.

    `example :` something in a house that is permanently fixed ie ., `Bathroom.`

  - Some Data for testing that would be used to meet the `testing suite.`

- `lib`
  - Store any code that is not specific to the domain of the application goes in `lib folder.`
    - `( There might be many other patterns in dividing code b/w folders. )`
  - If you are creating a `Button UI`
    - Then the code in `lib` should just outline how ever the `component` works, but doesn't implement any application specific functionality.
    - Then, we can include the `lib content` into the core application and use it as if it were a `3rd party library code..`
  - `Remember Functionality should be cleanly decoupled within your primary application.`
- `scripts`
  - Used for automation.
