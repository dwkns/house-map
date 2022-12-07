# Tiny Start

A tiny 11ty Starter

#### Uses: 

- esbuild for JS
- Tailwind via PostCSS for CSS

#### Includes: 

- Nunjucks Macro components based on [Trys Mudford's pattern](https://www.trysmudford.com/blog/encapsulated-11ty-components/).
- Site configuration in `src/_data/site.js` 

#### Requires:

A `CURRENT_ENV` enviroment variable to be set. See `.env-template`

## Usage

#### Install dependencies with:

```bash
$ yarn install
```

Copy `.env-template` to `.env`

#### Run development enviroment with:

```bash
$ yarn start
```

#### Build with:

```bash
$ yarn build
```

#### Build and serve static build folder with:

```bash	
$ yarn serve
```

