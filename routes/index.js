var express = require('express');
var router = express.Router();
var template = require('../lib/template.js');
var auth = require('../lib/auth');

router.get('/', function (request, response) {
  //console.log('requestuser',request.user);  //  passport를 사용하지 않으면 request는 user객체를 가지고 있지 않다.
  var flashMsg=request.flash();
  var feedMsg='';
  if(flashMsg.success){
    feedMsg=flashMsg.success[0];
  }
  var title = 'Welcome';
  var description = 'Hello, Node.js';
  var list = template.list(request.list);
  var html = template.HTML(title, list,
    `
      <div style="color:red">${feedMsg}</div>
      <h2>${title}</h2>${description}
      <img src="/images/hello.jpg" style="width:300px; display:block; margin-top:10px;">
      `,
    `<a href="/topic/create">create</a>`,
    auth.statusUI(request, response)
  );
  response.send(html);
});

module.exports = router;