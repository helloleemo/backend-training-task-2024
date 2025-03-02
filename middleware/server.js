const express = require('express');
const app = express();

app.get('/',function(req,res){
    res.status(200).json({
        "status":"success",
        "message":"你目前造訪到首頁"
    })
})
app.use(function(req,res,next){
    console.log('有人進來了');
    next();
})


app.get('/user',function(req,res){
    res.status(200).json({
        "status":"success",
        "message":"你目前造訪到 user 頁面"
    })
})

const checkKeyword = function(req,res,next){
    if(req.query.q){
        next()
    }else{
        res.status(400).json({

        "message":`您並未輸入關鍵字`
    })
    }
}

app.get('/search',checkKeyword,function(req,res){
    res.status(200).json({
        "status":"success",
        "keyword":`你搜尋到的是${req.query.q}`
    })
})


// 404 錯誤處理：預期內的
app.use(function(req, res, next) {
  res.status(404).json({
    status: 'error',
    message: '無此路由資訊',
  });
});


// Express 錯誤處理
//當有錯誤被 throw 或在 next(err) 時，會自動進入到這個函式，並在此將 err.message 回傳給前端。
// 預期外的錯誤處理
app.use(function(err, req, res, next) { // err只有一個地方有
  res.status(500).json({
    err: err.message,
  });
});





// 監聽 port
const port = process.env.PORT || 3003;
app.listen(port);
