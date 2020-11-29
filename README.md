<h1 align="center">Proof of concept</h1>
<h3>Data</h3>
Data is currently static. Crawled from Indeed, Stackoverflow, LinkedIn, Lever, Greenhouse, and Workable. It's specific to my personal job search: "javascript node react". Junior-level and low pay jobs are already excluded. Only remote job listings added.

What's unique about this, besides the powerful search? Results are aggregated into one list (JS Object /
dictionary), and each job listing is unique (key = title + employer), even if it appears multiple times
or in multiple sources. Click "ignore", "maybe", or "apply", to categorize the article. The content will
persist in your browser, even after the overall list is updated, until you clear your cache.

**😬 PLEASE NOTE: 🤦 I do write GIT Commit comments when working on a team, even multiline ones sometimes.** Haha. I'm not one of those people that refuses to write Git commits. This was just a quick hackathon, for fun. Please get in touch if you'd like to contribute. I'll be happy to show you around! ~ [https://paulshorey.com](Paul Shorey .com)

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

    .
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
