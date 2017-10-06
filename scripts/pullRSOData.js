const request = require('request');
var cheerio = require('cheerio');


class Scraper {
  constructor(){
    this.url = "https://uws-community.symplicity.com/index.php?s=student_group&au=&ck=";
    this.headers = {
      "User-Agent": "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/56.0.2924.87 Safari/537.36",
      "Accept" : "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8"
    };
    this.cookieJar = request.jar();
    this.options = {
      url: this.url,
      jar: this.cookieJar,
      headers: this.headers
    };
  }

  requestPage(cb){
    request.get(this.options, (error, response, body) => {
      request.get(this.options, (error, response, body) => {
        cb(body)
      });
    });
  }

  getDataForPage(cb){
    this.requestPage((body) => {
      const $ = cheerio.load(body);
      const rsoList = $('.grpl-info').find('a');
      console.log(rsoList[2].html())

    })
  }
}

function main(){
  const scraper = new Scraper();
  scraper.getDataForPage();
}

(function(){
  main()
})()
