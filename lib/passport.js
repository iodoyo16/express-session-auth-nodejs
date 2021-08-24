module.exports= function(app) {
    var authData = {
        email: 'egoing777@gmail.com',
        password: '111111',
        nickname: 'egoing'
    };

    var passport =require('passport'); 
    var LocalStrategy=require('passport-local').Strategy;
    // session을 내부적으로 이용하기 때문에 sesson config 아래에 위치
    app.use(passport.initialize()); 
    app.use(passport.session());
    
    
    passport.serializeUser(function(user,done){   // 로그인 성공시 인자로 전달된 콜백함수 호출 하도록 약속(한번 호출)
      console.log('serializeUser',user);
      //done(null,user.id);
      done(null, user.email); // 사용자의 식별자를 session store 에 저장
    });
    
    passport.deserializeUser(function(id,done){ // 로그인 성공후 페이지 '방문할때마다' 인자로 주어진 콜백을 호출
      console.log('deserializeUser',id); 
      done(null, authData);//  id를 이용해(seriallize에서 done에 주어진 인자) 사용자의 실제 정보가 저장된 곳에서 정보 조회해서 가져옴
      // User.findById(id,function(err,user){
      //   done(err,user);
      // });
    });
    
    passport.use(new LocalStrategy(       //login 성공 실패 여부 결정 및 이후 조치
      {
        usernameField: 'email',
        passwordField: 'pwd'
      },
      function(username, password, done) {
        if(username===authData.email){
          console.log('1');
          if(password==authData.password){
            console.log('2');
            return done(null,authData,{message: 'Welcome'});
          }
          else{
            console.log('3');
            return done(null,false,{ message: 'Incorrect password'});
          }
        }
        else{
          console.log('4');
          return done(null,false,{ message: 'Incorrect username'});
        }
      }
    ));
    return passport;
}
