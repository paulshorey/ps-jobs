<h1 align="center">Proof of concept</h1>
<h3>Data</h3>
Data is currently static. Crawled from Indeed, Stackoverflow, LinkedIn, Lever, Greenhouse, and Workable. It's specific to my personal job search: "javascript node react". Junior-level and low pay jobs are already excluded. Only remote job listings added.

What's unique about this? The powerful search. Also, results are aggregated into one list (JS Object /
dictionary), and each job listing is unique (key = title + employer), even if it appears multiple times
or in multiple sources. Click "ignore", "maybe", or "apply", to categorize the article. The content will
persist in your browser, even after the overall list is updated, until you clear your cache.

    1 LinkedIn Jobs (react node) past-month, mid-senior, remote
    https://www.linkedin.com/jobs/search/?f_CF=f_WRA&f_E=4&f_TPR=r2592000&keywords=node%20react

    2 Indeed advanced search, last 14 days
    https://www.indeed.com/jobs?q=(javascript%20or%20js)%20(node%20or%20nodejs%20or%20es6%20or%20%22%20AI%20%22%20or%20ui%20or%20ux%20or%20uiux%20or%20elasticsearch)%20(remote%20or%20wfh%20or%20telecommute%20or%20remotely%20or%20%22work%20from%22)%20-junior%20-jr%20-intern%20-graduate%20-associate%20-qa%20-java%20-temporarily%20-%22.net%22%20-j2ee&fromage=14

    3 StackOverflow - exclude: .net, asp, java, j2ee - remote only
    Used https://phantombuster.com to export the links from my job search to a text file. Then crawled the links in APIFY.
    https://stackoverflow.com/jobs?id=409865&q=(js+or+javascript+or+node+or+nodejs+or+es6+or+%22+AI+%22+or+ui+or+ux+or+uiux+or+elasticsearch)+-backend&r=true&td=.net+asp+java+j2ee

    4 JustRemote.co - power search - first 150 "developer" results
    https://justremote.co/power-search
    Actually did not crawl this, but used browser devtools to collect links. Then, crawled the links in APIFY.
    In the future I would just search Google "node react site:lever.co OR greenhouse.io OR workable.com"

**See `/src/components/Jobs/apify/*` for JavaScript Puppeteer APIFY code used to crawl these sites.**

<p>&nbsp;</p>

<p align="center">
  <a href="https://www.gatsbyjs.com">
    <img alt="Gatsby" src="https://www.gatsbyjs.com/Gatsby-Monogram.svg" width="60" />
  </a>
</p>
<h1 align="center">
  This project uses Gatsby
</h1>
<h4>+ React + Styled Components</h4>

### Inside the /src folder:

    ├── components
        ├── Jobs
            ├── apify   -- saved copy of Puppeteer code used on APIFY.com
            ├── json    -- output from APIFY.com
            ├── lib     -- functions to filter and fix json output
            ├── notes   -- various notes, like where and how to search
            index.js
            Jobs.js - import from "/src/components/Jobs" (index.js serves this file)
            Job.js - sidebar nav item, click to select
            JobFull.js - main content, selected job
            Home.js - when no job selected, instructions, quotes
        ├── Quotes
    ├── pages    -- routes (see Gatsby documentation)
    ├── scss    -- .scss stylesheets (not Styled Components)
    ├── package.json -- so you can refer to "/src" as an absolute path, instead of "../../../src"
