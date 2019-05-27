
## Other user story assumptions
- As a user, I can see responsive grid layout for sneaker list page, with 2-3-4-6 columns in difference size device, the grid cell border should be drawn properly.

- As a user, I can see responsive layout in sneaker detail page.

- As a user he may want to visit specific sneaker page through human readable URL path like slug
  
- As as user I can see loading properly ( a line of poor text)

- As a user, when I am visiting sneaker detail page, I can _history back_ to list page and see page is scrolled to proper position where I was.

- As a user, I want to see fancy animation during route switching. - `No, the author is too tired to demo it in this exercise`.
  
## Nonfunctionals

- [ ] Error tracking, sending with Snowplow.
- [x] Error page (when API down or some serious issue occurs)
- [x] Redirect to /sneakers when user visiting inexisting page.
- [ ] Animation HOC
- [ ] SSR and SEO friendly
  - create-react-app does not support SSR out of box, need work on tools.
- [ ] Show Sneaker details from lru cache ? (or HTTP API cache is enabled)
- [x] End-to-end test
- [ ] Device supporting ( down to Android 4.4 ?)
- [x] Be able to hack Webpack configuration for:
  - Setting up Rxjs resolve alias
  - setting up SSR build

