// see https://apify.com/apify/web-scraper#page-function
async function pageFunction(context) {
  const $ = context.jQuery;
  //
  // lib
  function host_from_url(url) {
    let host_start = url.indexOf("//") + 2
    if (host_start === 1) return // if was -1
    let host_end = url.indexOf("/", host_start)
    if (host_end === -1) return
    return url.substring(host_start, host_end)
  }

  //
  // job
  let job = {
    url: context.request.url,
    source: host_from_url(context.request.url)
  };
  let BASE_URL = 'https://'+job.source
  let emp_start = job.url.indexOf('/',10)+1
  let emp_end = job.url.indexOf('/',emp_start)
  let url_firstPath = job.url.substring(emp_start,emp_end)
  let title = $('title').first().text()
  let tit_start = 0
  let tit_end = title.indexOf(' -')
  let url_firstTitle = title.substring(tit_start,tit_end)
  //
  // job page - save content
  if (job.source==='jobs.lever.co') {
    // job info
    job.original = job.url+'/apply'
    job.title = ' '+$('.content h2').text().trim()
    job.body = ' '+$('.content > div:last-child').html().trim()
    if (url_firstTitle||url_firstPath){
      job.employer = url_firstTitle||url_firstPath
    }
  } else if (job.source==='boards.greenhouse.io'){
    // job info
    job.original = job.url+'#app'
    job.title = ' '+$('#app_body h1').text().trim()
    job.body = ' '+$('#app_body #content').html().trim()
    job.meta = ' '+$('#app_body .location').text().trim()
    job.employer = ' '+$('#app_body .company-name').text().trim()
    if (job.employer.substring(0,3)==='at ') {
      job.employer = job.employer.substr(3).trim()
    }
    if (job.employer.substring(0,4)===' at ') {
      job.employer = job.employer.substr(4).trim()
    }
  } else if (job.source==='apply.workable.com'){
    // job info
    job.original = job.url+'/apply'
    job.title = ' '+$('#app_body h1').text().trim()
    job.body = ' '+document.querySelector('[data-ui="job-description"').innerHTML.trim()
    job.body = job.body.replace('<h4>Description</h4>','').trim()
    job.meta = ' '+document.querySelector('[class*="job-styles__headerDetails"').innerText.trim()
    if (url_firstPath){
      job.employer = url_firstPath
    }
  } else {
    return;
  }

  //
  // success
  return {job:job}
}
