# Demo project GOAT

React 16 + Rxjs + Typescript + create-react-app

### How to run this demo

#### 1. Build
At root directory, run commands:
```bash
# install dependency
npm i
# build static assets to /build
npm run build 
# Serve HTTP at localhost:3000
npm run start:static
```

#### 2. Start mock API server at localhost:5000
Open another terminal, and run command
```
npm run start:json
```

#### 3. Visit `http://localhost:3000` like a boss
[http://localhost:3000](http://localhost:3000)


### Run end-to-end test
>  Yes, I choose to use my limited time on writing end-to-end test instead of unit test in reality too.

At first time, need to install Webdriver manager and other required dependencies.
```bash
npm run test:init
```

Then run actual test.
```
npm test
```
> During run test, above `start:json` and `start:static` commands should also be kept running.

## Other user story assumptions
- As a user, I can see responsive grid layout for sneaker list page, with 2-3-4-6 columns in difference size device, the grid cell border should be drawn properly.

- As a user, I can see responsive layout in sneaker detail page.

- As a user, I want to visit specific sneaker page through human readable URL path like slug
  
- As as user I can see loading indicator properly ( a line of poor text is for demo only)

- As a user, when I am visiting sneaker detail page, I can _history back_ to list page and see page is scrolled to proper position where I was.

- As a user, I want to see fancy animation during route switching. 
  - `No, the author is too tired to demo it in this exercise`.

- As a SEO crawler, I want see those static pages served in `/sneakers/....` address.
   - `No, the author is too tired to demo it in this exercise`.

## Nonfunctional assumptions

- [ ] Error tracking, sending with Snowplow.
- [x] Error page (when API down or some serious issue occurs)
- [x] Redirect to /sneakers when user visiting inexisting page.
- [ ] Animation HOC
- [ ] SSR and SEO friendly
  - create-react-app does not support SSR out of box, need to work on tools.
- [ ] Show Sneaker details from lru cache ? (or HTTP API cache is enabled)
- [x] End-to-end test
- [ ] Device supporting ( down to Android 4.4 ?)
- [x] Be able to hack Webpack configuration for:
  - Setting up Rxjs resolve alias
  - setting up SSR build
- [ ] i18n support

