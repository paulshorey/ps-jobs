# This is a proof of concept
<p>
  <b>
    Built with React. This codebase can be easily adapted to any type of content - blogs, news, or research
    articles.
  </b>
  <br /> <i>Data is currently static,</i> manually crawled from Indeed, Stackoverflow, LinkedIn, Lever,
  Greenhouse, and Workable.
</p>
<p>
  What's unique about this? The powerful search. Also, results are aggregated into one list (JS Object /
  dictionary), so each job listing is unique (key = title + employer), even if it appears multiple times or in
  multiple sources. Click "ignore", "maybe", or "apply", to categorize the article. It will persist in your
  browser even if the site data or sources are updated, until you clear your cache.
</p>
<p>
  The boon of this invention is also it's also it's bane. The entire content is downloaded to the browser
  (front-end, 8MB). So, searching/browsing is very robust. However, it is slow and not scalable. This interface
  would probably have more use 1. without the keyword highlighting in the left nav items and 2. with data being
  served from an API, from an ElasticSearch database.
</p>

# Sources

1 LinkedIn Jobs (react node) past-month, mid-senior, remote
https://www.linkedin.com/jobs/search/?f_CF=f_WRA&f_E=4&f_TPR=r2592000&keywords=node%20react

2 Indeed advanced search, last 14 days
https://www.indeed.com/jobs?q=(javascript%20or%20js)%20(node%20or%20nodejs%20or%20es6%20or%20%22%20AI%20%22%20or%20ui%20or%20ux%20or%20uiux%20or%20elasticsearch)%20(remote%20or%20wfh%20or%20telecommute%20or%20remotely%20or%20%22work%20from%22)%20-junior%20-jr%20-intern%20-graduate%20-associate%20-qa%20-temporarily%20-%22.net%22%20-j2ee&fromage=18

3 StackOverflow - exclude: .net, asp, java, j2ee - remote only
Used https://phantombuster.com to export the links from my job search to a text file. Then crawled the links in APIFY.
https://stackoverflow.com/jobs?id=409865&q=(js+or+javascript+or+node+or+nodejs+or+es6+or+%22+AI+%22+or+ui+or+ux+or+uiux+or+elasticsearch)+-backend&r=true&td=.net+asp+java+j2ee

4 JustRemote.co - power search - first 150 "developer" results
https://justremote.co/power-search
Actually did not crawl this, but used browser devtools to collect links. Then, crawled the links in APIFY.
In the future I would just search Google "node react site:lever.co OR site:greenhouse.io OR site:workable.com OR site:applytojob.com"

**See `/src/components/Jobs/apify/*` for the Puppeteer APIFY JavaScript code used to crawl these sites.** Data is extracted to JSON files, to `/src/components/Jobs/json`.

# Develop

This is a Gatsby project. No routes right now, only homepage. Mini-app.

# About

Built by [Paul Shorey](https://paulshorey.com) to make job searching more interesting and fun.
