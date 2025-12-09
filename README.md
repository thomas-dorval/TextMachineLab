# Text Machine Lab Website for Internet and Web Systems I
This website is built off of Vite + React utilizing TypeScript. If someone else is being handed this project after the duration of this class, I heavily suggest you get Vite + React so you can utilizing the dynamic loading of the page while editing, as the config file has been included, unlike the previous version of the site designed in Hugo.

The core of the website is the same as any usual Vite project, being based in the "App.tsx" file, and it utilizes "react-router-dom" to turn the pages into dynamically loaded pages via the router. All pages for the site are contained in "src/assets/pages". 

Most of the actual elements on the pages are components located in "src/assets/components". There are seven components at the time of writing this, the Navigation Bar, Navigation Dropdown, Language Switcher, Image Carousel, Collapsable Cards, and Footer. Most of the content of the pages is contained in Collapsable Cards. The library "react-tabs" is also used in the Collapsable Cards, though I haven't actually tested if this implementation works. It is supposed to load inside of the cards so that the functionality from the original site can be maintained.

All normal language (not including things like URLs or emails) is contained in the "src/assets/translations/translations.ts" file. If I had more time or skill, I would suggest breaking up the translation files into smaller, more easy to digest pieces. Similarly to the "App.css" file, it is a bit of a monster, containing language for the entire website in a single file. Turning it into a directory would make it much easier to navigate. The same with the .css file. There is some CSS code in "index.css" as well, but it is mostly for individual elements across the site rather than named components of the app.

## TO-DO:
- Enable "by tag" search; conglomerate all of the tags at the top of the pages utilizing cards and allow the user to click on the tags to toggle which cards are visible. This was functionality avaliable on the original site.

- Break up "App.css" and "translations.ts" to be less monstrous.

- Fill in the rest of the missing content.

- Add a table of publications based on the Google Scholar API.

- Find a functional API for Twitter and replace the "News" section on the homepage with a Twitter feed.
  - Alternatively, one could implement a blog.

- Break up the elements of translations into interfaces so that interfaces can be passed to the components instead of length strings, in order to make adding new entries less daunting. If possible, mapping an array of interfaces to make the cards instead should be considered because it would be less awful. This could also be database driven, to tie in with the originally desired login page.