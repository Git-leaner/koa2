const path=require('path');
const fs=require('fs');

function writefile(name,data,option){
	fs.writeFile(__dirname+name,data,option,function(err){
		if(err)	console.log(err);
			console.log('write done!');
	})
}

const jsonfile=async (ctx,api)=> {
	var file = path.join(__dirname, '../json/'+api+'.json'); //文件路径，__dirname为当前运行js文件的目录
	//读取json文件
	console.log(file);
	return new Promise((resolve,reject)=>{
		fs.readFile(file, 'utf-8', function(err, data) {
		    if (err) {
		    	console.log(err);
		        reject('文件读取失败');
		    } else {
		    	resolve(data);
		    }		
		})	
	})	
}

module.exports={
	writefile,
	jsonfile
}