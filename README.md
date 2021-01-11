# This is a quick proof of concept

Built with React. This codebase can be easily adapted to any type of content - blogs, news, or research articles. Not finished. No testing or CI yet. Just an experiment.

# Sources

## Indeed

https://www.indeed.com/jobs?q=(javascript+or+js)+(node+or+nodejs+or+es6+or+%22+AI+%22+or+ui+or+ux+or+uiux+or+elasticsearch)+(remote+or+wfh+or+telecommute+or+remotely+or+%22work+from%22)+-junior+-jr+-intern+-graduate+-associate+-qa+-temporarily+-%22.net%22+-j2ee&fromage=14

- Puppeteer code: `./src/jobs/apify/indeed.js`

## LinkedIn Jobs (react node) past-month, mid-senior, remote

https://www.linkedin.com/jobs/search/?f_CF=f_WRA&f_E=4&f_TPR=r2592000&keywords=node%20react

- Get a list of job listing pages: use PhantomBuster.com "LinkedIn Search Export" tool
  https://phantombuster.com/4911221409327378/phantoms/4029757401204726/console
- Use Puppeteer to crawl content from each exported page: `./src/jobs/apify/linkedin.js`

## StackOverflow

https://stackoverflow.com/jobs?id=409865&q=(js+or+javascript+or+node+or+nodejs+or+es6+or+%22+AI+%22+or+ui+or+ux+or+uiux+or+elasticsearch)+-backend&r=true&td=.net+asp+java+j2ee

- http://stackoverflow.com/jobs/feed?q=(js+or+javascript+or+node+or+nodejs+or+es6+or+"+AI+"+or+ui+or+ux+or+uiux+or+elasticsearch)+-backend&r=true&td=.net+asp+java+j2ee
- Convert to JSON: https://www.freeformatter.com/xml-to-json-converter.html
- Delete everything in JSON file except the array of items

## Google search - "remote node react site:lever.co OR site:greenhouse.io OR site:workable.com OR site:applytojob.com"

- Collect hrefs
- Crawl each using APIFY: `./src/jobs/apify/justremoteco.js`

# About

Built by [Paul Shorey](https://paulshorey.com) to make job searching less annoying.
