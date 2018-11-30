const request=require('request');
const fs=require('fs');
const http=require('http');
const path=require('path');
// const subject=' http://api.douban.com/v2/movie/subject/26004132?apikey=0b2bdeda43b5688921839c8ecb20399b'
const url=[
	'http://api.douban.com/v2/movie/in_theaters?start=0&count=300',
	'http://api.douban.com/v2/movie/top250?start=0&count=300',
	'http://api.douban.com/v2/movie/coming_soon?start=0&count=300'
];

const type=[
	'in_theaters',
	'top250',
	'coming_soon'
]
function writefile(name,data,option){
	fs.writeFile(name,data,option,function(err){
		if(err)	console.log(err);
			console.log('write done!');

	})
}

function getmovie(url,type){
	request(url,function(err,response, data){
		console.log(response.statusCode)
		if(!err&&response.statusCode==200){
			var dir=path.join(__dirname, '../json/'+type+'.json');
			console.log(dir);
			writefile(dir,data,{flag: 'w+', encoding: 'utf8'});
		}
	})
}
function getsubject(url){
	return new Promise((resolve,reject)=>{
		request(url,function(err,response, data){
			console.log(response.statusCode,JSON.parse(data).title)
			if(!err&&response.statusCode==200){
				var dir=path.join(__dirname, '../json/subject/'+JSON.parse(data).title+'.json');
				console.log(dir);
				writefile(dir,data,{flag: 'w+', encoding: 'utf8'});
				resolve(data)
			}else{
				reject('spider err!')
			}
		})
	})
}
module.exports={
	alltype:function(){
		url.forEach((item,i)=>{
			console.log(item)
			getmovie(item,type[i])
		})
	},
	subject:function(id){
		var url='http://api.douban.com/v2/movie/subject/'+id+'?apikey=0b2bdeda43b5688921839c8ecb20399b';
		return getsubject(url)
	}
}
