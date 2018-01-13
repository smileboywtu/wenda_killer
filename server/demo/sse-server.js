const express = require('express')
const serveStatic = require('serve-static')
const SseStream = require('ssestream')
const request = require('request')

const app = express()
app.use(serveStatic(__dirname))
app.get('/sse', (req, res) => {
  console.log('new connection')

  const sseStream = new SseStream(req)
  sseStream.pipe(res)
  var id_xigua = id_huajiao = id_cddh = ''
  
  const pusher = setInterval(() => {

    var options_xigua = {
    url: 'http://wd.sa.sogou.com/api/ans?key=xigua',
    headers: {
      'User-Agent': 'Mozilla/5.0 (iPhone; CPU iPhone OS 11_2_2 like Mac OS X) AppleWebKit/604.4.7 (KHTML, like Gecko) Mobile/15C202 Sogousearch/Ios/5.9.7'
    }
    };
    function callback_xigua(error, response, body) {
      if (!error && response.statusCode == 200) {
        var info1 = JSON.parse(body)
        var result1 = JSON.parse(info1.result[1])
        if (id_xigua=='' || id_xigua!=result1.cd_id){
          sseStream.write({
            event: 'xigua',
            data: result1.title+'\n【答案】:【'+result1.result+'】'
          })
          id_xigua = result1.cd_id
//console.log(result1.title)
        }

      }
    }
    request(options_xigua, callback_xigua);
  
    var options_huajiao = {
    url: 'http://wd.sa.sogou.com/api/ans?key=huajiao',
    headers: {
      'User-Agent': 'Mozilla/5.0 (iPhone; CPU iPhone OS 11_2_2 like Mac OS X) AppleWebKit/604.4.7 (KHTML, like Gecko) Mobile/15C202 Sogousearch/Ios/5.9.7'
    }
    };
    function callback_huajiao(error, response, body) {
      if (!error && response.statusCode == 200) {
        var info2 = JSON.parse(body)
        var result2 = JSON.parse(info2.result[1])
        if (id_huajiao=='' || id_huajiao!=result2.cd_id){
          sseStream.write({
            event: 'huajiao',
            data: result2.title+'\n【答案】:【'+result2.result+'】'
          })
          id_huajiao = result2.cd_id
        }
//console.log(result2.title)
      }
    }
    request(options_huajiao, callback_huajiao);

    var options_cddh = {
    url: 'http://wd.sa.sogou.com/api/ans?key=cddh',
    headers: {
      'User-Agent': 'Mozilla/5.0 (iPhone; CPU iPhone OS 11_2_2 like Mac OS X) AppleWebKit/604.4.7 (KHTML, like Gecko) Mobile/15C202 Sogousearch/Ios/5.9.7'
    }
    };
    function callback_cddh(error, response, body) {
      if (!error && response.statusCode == 200) {
        var info3 = JSON.parse(body)
        var result3 = JSON.parse(info3.result[1])
        if (id_cddh=='' || id_cddh!=result3.cd_id){
          sseStream.write({
            event: 'cddh',
            data: result3.title+'\n【答案】:【'+result3.result+'】'
          })
          id_cddh = result3.cd_id
        }
//console.log(result3.title)
      }
    }
    request(options_cddh, callback_cddh);
  }, 1000)

  res.on('close', () => {
    console.log('lost connection')
    clearInterval(pusher)
    sseStream.unpipe(res)
  })
})

app.listen(80, (err) => {
  if (err) throw err
  console.log('server ready on http://localhost:80')
})
