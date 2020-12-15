/*
 * Get jobs from localStorage
 *    TODO: convert to IndexedDB
 */
export function get_all_ss_jobs_in_list(list) {
  let jobsDict = {}
  for (let company in window.localStorage) {
    let jobJSON = window.localStorage[company]
    if (typeof jobJSON !== "string") continue
    // console.log(uid, jobJSON.substring(0, 50))
    if (jobJSON.includes(`"list":"${list}"`)) {
      jobsDict[company] = JSON.parse(jobJSON)
    }
  }
  return jobsDict
}
/*
 * Save job to localStorage
 *    TODO: convert to IndexedDB
 */
export function set_ss_job(key, value) {
  if (typeof window === "object") {
    window.localStorage.setItem(key, JSON.stringify(value))
  }
}

/*
 * Combine from sources, use fix_job() to convert to standard structure
 */
export function aggregate_jobs(lists) {
  let jobsDict = {}
  for (let list of lists) {
    for (let obj of list) {
      if (!obj) continue
      // handle individual job
      if (obj.job && obj.job.body) {
        // fix url
        if (!obj.job.url && obj.url) {
          obj.job.url = obj.url
        }
        let job = obj.job
        // unique ?
        job.uid = (job.title + (job.employer || job.company)).toLowerCase()
        // duplicate
        if (jobsDict[job.uid]) continue
        // new - add
        jobsDict[job.uid] = fixJob(job)
        continue
      }
      // handle stackoverflow rss feed
      if (obj.pubDate) {
        let job = obj
        if (!job || !job.description) continue
        job = fixStackoverflowRSS(job)
        // unique ?
        job.uid = (job.title + (job.employer || job.company)).toLowerCase()
        // duplicate
        if (jobsDict[job.uid]) continue
        // new - add
        jobsDict[job.uid] = fixJob(job)
        continue
      }
      // // handle list of jobs (from APIFY stackoverflow-based output)
      // if (obj.jobs && typeof obj.jobs === "object") {
      //   for (let uid in obj.jobs) {
      //     let job = obj.jobs[uid]
      //     if (!job || !job.body) continue
      //     job = fixStackoverflowRSS(obj.job)
      //     // unique ?
      //     let uid = job.title + (job.employer || job.company)
      //     if (jobsDict[uid]) continue
      //     // add
      //     jobsDict[uid] = job
      //     continue
      //   }
      // }
      // console.warn("skipped job", obj)
    }
  }
  return jobsDict
}

/*
 * Temporary logic, to standardize job objects.
 *    TODO: move to web-crawlers, then remove from here!
 */
export function fixJob(job) {
  job.subtitle = job.subtitle||''
  let com_i = job.title.indexOf(",")
  if (com_i !== -1) {
    job.subtitle += job.title.substr(com_i)
    job.title = job.title.substring(0, com_i)
  }
  if (job.title) job.title = job.title.trim()
  if (job.employer) {
    job.employer = job.employer.trim()
    if (job.employer.substring(0, 3) === "at ") job.employer = job.employer.substr(3)
  }
  job.title = job.title.replace("(allows remote)", "")
  {
    let title_par = job.title.indexOf("(")
    if (title_par >= 5) {
      job.subtitle += job.title.substr(title_par)
      job.title = job.title.substring(0, title_par)
      // job.body = "<h4>" + job.subtitle + "</h4>" + job.body
    }
  }
  {
    let title_par = job.title.indexOf("|")
    if (title_par >= 20) {
      job.subtitle += job.title.substr(title_par + 1)
      job.title = job.title.substring(0, title_par)
      // job.body = "<h4>" + job.subtitle + "</h4>" + job.body
    }
  }
  {
    let title_par = job.title.indexOf(" - ")
    if (title_par >= 30) {
      job.subtitle += job.title.substr(title_par + 3)
      job.title = job.title.substring(0, title_par)
      // job.body = "<h4>" + job.subtitle + "</h4>" + job.body
    }
  }
  if (job.company) job.company = job.company.trim()
  if (job.meta) job.meta = job.meta.replace(" ago", " ago ").replace(/[\w]+/g, " ")
  if (job.company) {
    job.body += "\n<b> Company: " + job.company + "</b><br />"
  } else {
    job.body += "\n<b> Employer: " + job.employer + "</b><br />"
  }
  job.body += "\n<b> Etc: <b>" + job.subtitle + "</b> " + job.meta + "</b><br />"
  return job
}
export function fixStackoverflowRSS(job) {
  job.employer = (job.author.name || {}).__text
  job.body = job.description
  job.body = job.body.replace("()", "")
  job.url = job.link
  job.meta = (job.location || {}).__text + " - " + (job.category || []).toString()
  delete job.link
  delete job.description
  delete job.author
  delete job.guid
  delete job.location
  delete job.category
  job.source = "Stackoverflow"
  return job
}
