# Forrest General Store website

The website for Forrest General Store, a cafe, provedore and post office at 33 Grant St, Forrest VIC 3236.
Scrolling drives the visitor in from the forest road, through the left door and past the coffee, pies and produce, then shows hours, directions and contact details.

Live at https://skunkworks-aus.github.io/forrest-general-store/

## Who owns it

The site and its content belong to Forrest General Store. Skunkworks Australia (https://skunkworksau.com) built it and looks after it. The store can take this repository elsewhere at any time.

## How it is built

One static page, no libraries and no backend. The only outside request is two typefaces from Google Fonts.

| File | What it is |
| --- | --- |
| `index.html` | The built page. GitHub Pages serves this. Do not edit it by hand |
| `src/head.html` | Page structure, text and styles |
| `src/p1.js` to `src/p4.js` | The drawn scroll journey: world, shopfront, interior, loop |
| `src/info.js` | Opening hours and the "open now" line |
| `build.py` | Joins `src/` into `index.html` |
| `404.html` | Page shown for a wrong address |
| `og.jpg` | Picture used when the link is shared |

## Change something

1. Edit the files in `src/`.
2. Run `python3 build.py`.
3. Open `index.html` in a browser and check it, including on a phone-width window.
4. Commit on a branch and open a pull request. Anything merged to `main` goes live.

Common changes:

- **Opening hours:** the three numbers at the top of `src/info.js`, the hours table and the page description in `src/head.html`, and the `openingHoursSpecification` block in `src/head.html`.
- **Phone, email, address:** search `src/head.html` for the old value. It appears in the page and in the structured data.
- **Menu text:** the "Inside the store" section of `src/head.html`.

## Not built yet

- Hampers to order ahead (shown as "coming soon")
- Real photos of the store and its food
- Updates by message from the owner
- The store's own domain name

## Rules for this public repository

No passwords, keys, client notes, reports or proposals. Strip location data from photos before adding them.
