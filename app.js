const Koa=require('koa');
const path=require('path');

const router=require('./router');
const app=new Koa();

// const url=[
// 	'http://api.douban.com/v2/movie/in_theaters',
// 	'http://api.douban.com/v2/movie/top250',
// 	'http://api.douban.com/v2/movie/coming_soon'
// ];
// const type=[
// 	'in_theaters',
// 	'top250',
// 	'coming_soon'
// ]

// const main = async (ctx,next) => {
// 	const start = Date.now();
// 	const data= await movie.find({},(err,data)=>{
// 		console.log(err,data);
// 	});
// 	console.log(start,data);
// 	ctx.body = data;
// };



app.use(router.routes())

port=3115
app.listen(port,function(){
	console.log('服务器运行在127.0.0.1:'+port);
});