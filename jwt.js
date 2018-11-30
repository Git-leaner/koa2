const router = require('koa-router')();
const jwt = require('jsonwebtoken');
const userModel = require('./models/userModel.js');
const koa = require('koa');
const koajwt = require('koa-jwt');
const bodyparser=require('koa-bodyparser');
const app = new koa();
// app.use(bodyparser());


router.post('/login', async (ctx) => {
    let pastData=await parsePostData(ctx);
        ctx.body=pastData;
    const data = ctx.body;
    console.log('ctx', data)
    if(!data.name || !data.password){
        return ctx.body = {
            code: '000002',
            data: null,
            msg: '参数不合法'
        }
    }
    const result = await userModel.findOne({
        name: data.name,
        password: data.password
    })
    console.log(result)
    if(result){
        const token = jwt.sign({
            name: result.name,
            _id: result._id
        }, 'my_token', { expiresIn: '2h' });
        console.log(token)
        return ctx.body = {
            code: '000001',
            data: token,
            msg: '登录成功',
            user:result
        }
    }else{
        return ctx.body = {
            code: '000002',
            data: null,
            msg: '用户名或密码错误'
        }
    }
});

// 解析上下文里node原生请求的POST参数
function parsePostData( ctx ) {
  return new Promise((resolve, reject) => {
    try {
      let postdata = "";
      ctx.req.addListener('data', (data) => {
        postdata += data
      })
      ctx.req.addListener("end",function(){
        // let parseData = parseQueryStr( postdata )
        let parseData = JSON.parse( postdata )
        resolve( parseData )
      })
    } catch ( err ) {
      reject(err)
    }
  })
}

// 将POST请求参数字符串解析成JSON
function parseQueryStr( queryStr ) {
  let queryData = {}
  let queryStrList = queryStr.split('&')
  for (  let [ index, queryStr ] of queryStrList.entries()  ) {
    let itemList = queryStr.split('=')
    queryData[ itemList[0] ] = decodeURIComponent(itemList[1])
  }
  return queryData
}


app.use(router.routes());
app.use((ctx, next) => {
    return next().catch((err) => {
        if(err.status === 401){
            ctx.status = 401;
            ctx.body = 'Protected resource, use Authorization header to get access\n';
        }else{
            throw err;
        }
    })
})

app.use(koajwt({
    secret: 'my_token'
}).unless({
    path: [/\/user\/login/]
}));

var port=3050;

var server=app.listen(port,function(e){
    console.log('Example app listening at http://localhost:', port);
})
