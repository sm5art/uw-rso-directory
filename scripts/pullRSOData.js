const request = require('request');
const cheerio = require('cheerio');
const mongo = require('mongodb');


class Scraper {
  constructor(){
    this.url = "https://uws-community.symplicity.com/index.php?_so_list_from0951a99aa59405c47d2e937b6ff7bbf7={count}&_so_list_from0951a99aa59405c47d2e937b6ff7bbf7_page={page}";
    this.headers = {
      "User-Agent": "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/56.0.2924.87 Safari/537.36",
      "Accept" : "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8"
    };
    this.loginUrl = "https://uws-community.symplicity.com/index.php?s=student_group&au=&ck="
    this.baseUrl = "https://uws-community.symplicity.com/"
    this.indexPage = this.baseUrl + "index.php"
    this.cookieJar = request.jar();
    this.options = {
      jar: this.cookieJar,
      headers: this.headers
    };
    this.activeCount = 0;
    this.writeToDB = this.writeToDB.bind(this);
    this.countPerPage = 20
  }

  login(cb){
    let options = Object.assign({}, this.options);
    options["url"] = this.loginUrl;
    request.get(options, (error, response, body) => {
      let $ = cheerio.load(body);
      const pageNumList = $("div.list-count").text().trim().split(" ")
      this.rsoCount = parseInt(pageNumList[pageNumList.length - 1])
      this.maxPage = Math.floor(this.rsoCount/20)
      cb()
    });
  }

  pageUrlFactory(pageNum) {
    const count = pageNum * this.countPerPage;
    return this.url.replace("{count}", count).replace("{page}", pageNum);
  }

  requestPage(pageNum, cb) {
    let options = Object.assign({}, this.options);
    options["url"] = this.pageUrlFactory(pageNum);
    request.get(options, (error, response, body) => {
      cb(body);
    });
  }

  getDataForPage(pageNum, cb) {
    const that = this;
    this.requestPage(pageNum, (body) => {
      let $ = cheerio.load(body);
      let rsoObjects = [];
      const rsoList = $('.grpl-grp').each(function() {
        const $obj = $(this);
        const rsoName = $obj.find('h3.grpl-name').find('a').text().trim();
        const rsoDescription = $obj.find('div.grpl-purpose').text().trim();
        const rsoLogoSrc = that.baseUrl + $obj.find('div.grpl-logo').find('img').attr('src');
        const rsoType = $obj.find("span.grpl-type").text().trim();
        const rsoHref = $obj.find('h3.grpl-name').find('a').attr("href");
        const rsoContact = $obj.find('li.grpl-contact').find("a").text().trim();
        const re = /id=(\w+)/;
        const rsoId = rsoHref.match(re)[1];
        const rsoLeaders = [];
        $obj.find("li.grpl-admins").each(function() {
          const $rsoLeader = $(this);
          const re = /([a-zA-Z ]+): (.+)/;
          const rsoLeaderString = $rsoLeader.find("p").text().match(re);
          const rsoLeaderRole = rsoLeaderString[1];
          const rsoLeaderName = rsoLeaderString[2];
          const rsoLeaderObj = {"role": rsoLeaderRole, "name": rsoLeaderName};
          rsoLeaders.push(rsoLeaderObj);
        });
        const rsoObj = {
          "name": rsoName,
          "description": rsoDescription,
          "logo": rsoLogoSrc,
          "type": rsoType,
          "id": rsoId,
          "contact": rsoContact,
          "leaders": rsoLeaders,
          "href": rsoHref
        };
        rsoObjects.push(rsoObj);
        that.activeCount += 1;
      })
      cb(rsoObjects);
    })
  }

  writeToDB(rsoObjects){
    var that = this;
    this.getDB((db) => {
      db.collection('rsoInformation').insertMany(rsoObjects, function(err, result) {
        if(err)
          throw err;
        if(that.activeCount == that.rsoCount){
          process.exit(0);
        }
      })
    });
  }

  getData(cb) {
    this.login(() => {
      for(var i = 0; i <= this.maxPage; i++){
        this.getDataForPage(i, this.writeToDB)
      }
    });
  }

  getDB(cb) {
    mongo.MongoClient.connect(process.env.MONGODB_URI, function(err, db) {
      if(err)
        throw err;
      cb(db);
    });
  }
}

function main(){
  const scraper = new Scraper();
  scraper.getData(() => {

  })
}

(function(){
  main()
})()
