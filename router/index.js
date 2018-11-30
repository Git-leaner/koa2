const Router=require('koa-router');
const fs=require('fs');

const router=new Router();
const spider=require('../utils/spyder.js')
const dbutil=require('../utils/mongo.js');
const path=require('path');
console.log(spider);
const type=[
	'in_theaters',
	'top250',
	'coming_soon'
]

async function createRoute(router,api){
	router.get(api, async(ctx, next) =>{
		console.log(ctx)
	    var file = path.join(__dirname, '../json'+api+'.json'); //文件路径，__dirname为当前运行js文件的目录
	    //读取json文件
		ctx.response.type = 'application/json';
		var data=new Promise((resolve,reject)=>{
			fs.readFile(file, 'utf-8', (err, res)=> {
			    if (err) {
			        reject('文件读取失败',err);
					// ctx.body=err;
			    } else {
			    	resolve(res);
					// ctx.body=res;
			    }		
			})	
		})
		ctx.body=await data;
	});
}
type.forEach((api)=>{
	createRoute(router,'/'+api);
})

router.get('/downloadData',async(ctx,next)=>{
	spider.alltype();
})

router.get('/uploadDb',async(ctx,next)=>{
	data=await dbutil.uploadDb();
	ctx.body=data;
})

router.get('/deleteDb',async(ctx,next)=>{
	data=await dbutil.deleteDb();
	ctx.body=data;
})

router.get('/searchAllDb',async(ctx,next)=>{
	data=await dbutil.searchAllDb();
	ctx.body=data;
})

router.get('/searchById',async(ctx,next)=>{
	// ctx.body=ctx.query;
	console.log(ctx.query)
	var id =ctx.query.id;
	data=await dbutil.searchById(id);
	console.log('data',data)
	ctx.body=data;
})

module.exports=router;