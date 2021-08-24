var express = require('express');
var router = express.Router();
var path = require('path');
var fs = require('fs');
var sanitizeHtml = require('sanitize-html');
var template = require('../lib/template.js');



router.get('/login', function (request, response) {
  var flashMsg=request.flash();
  var feedMsg='';
  if(flashMsg.error){
    feedMsg=flashMsg.error[0];
  }
  console.log('flash',flashMsg);
  console.log('feed',feedMsg);
  var title = 'WEB - login';
  var list = template.list(request.list);
  var html = template.HTML(title, list, `
    <div style="color:red;">${feedMsg}</div>
    <form action="/auth/login_process" method="post">
      <p><input type="text" name="email" placeholder="email"></p>
      <p><input type="password" name="pwd" placeholder="password"></p>
      <p>
        <input type="submit" value="login">
      </p>
    </form>
  `, '');
  response.send(html);
});

// router.post('/login_process', function (request, response) {
//   var post = request.body;
//   var email = post.email;
//   var password = post.pwd;
//   if(email === authData.email && password === authData.password){
//     request.session.is_logined = true;
//     request.session.nickname = authData.nickname;
//     request.session.save(function(){
//       response.redirect(`/`);
//     });
//   } else {
//     response.send('Who?');
//   }
// });

router.get('/logout', function (request, response) {
  // request.logout();            // logout이 뒤늦게 적용되는 경우 있음
  // response.redirect('/');      //아마도 session store 에 대한 작업이 끝나지 않아서 생기는 문제
                                  // 따라서 session을 직접 지워주는 방법을 사용하면 좀더 안전
  request.logout();
  request.session.save(function(err){
    response.redirect('/');
  });
});


module.exports = router;