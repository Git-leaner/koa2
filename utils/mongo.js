const Monk=require('monk');
// const db=new Monk('192.168.20.137/test');
// const movie=db.get('movie');
const file=require('./file.js');
const db=require('./db.js')
const spider=require('./spyder.js')

console.log(file.jsonfile);
const type=[
	'in_theaters',
	'top250',
	'coming_soon'
]
var movielists=[];

module.exports={
	 uploadDb:async function(){
		return new Promise((resolve,reject)=>{
			var pms=[],ams=[];
			var updata={
				insert:{
					num:0,
					titles:[]
				},
				exists:{
					num:0,
					titles:[]
				}
			}
			let asLoad=tp=>{
				return new Promise(async (resolve,reject)=>{
					var lists=await file.jsonfile(Object,tp);
					movielists=JSON.parse(lists);
					let asget=(mv)=>{
						return new Promise((resolve,reject)=>{
							db.get_one(tp,mv.title).then(res=>{
								updata.exists.num++;
								updata.exists.titles.concat(mv.title)
								resolve(mv.title);
							},err=>{
								updata.insert.num++;
								updata.insert.titles.concat(mv.title)
								resolve(mv.title)
								db.post_create(tp,mv)
							})
						})
					}
					movielists.subjects.forEach(mv=>{
						ams.push(asget(mv));
					})
					console.log(ams.length)
					Promise.all(ams).then(res=>{
						resolve(updata)
					}).catch(err=>{
						resolve(updata)
						// reject(updata)
					})
					console.log(movielists.title,movielists.subjects.length)
				})
			}
			type.forEach(async item=>{
				pms.push(asLoad(item));
			})
			Promise.all(pms).then(ins=>{
				// console.log('ins',ins);
				resolve(updata)
			}).catch(err=>{
				// console.log('err1',err)
				resolve(updata)
			})
		})
	},
	 deleteDb:async function(){
		return new Promise((resolve,reject)=>{
			var dels=[]
			let asdel=(tp)=>{
				return new Promise((resolve,reject)=>{
					db.post_delete_all(tp).then(res=>{
						resolve(res);
					},err=>{
						reject(err);
					})
				})
			}
			type.forEach(async item=>{
				dels.push(asdel(item))
			})
			Promise.all(dels).then(res=>{
				resolve(res)
			}).catch(err=>{
				reject(err)
			})

		})
	},
	 searchAllDb:async function(){
		return new Promise((resolve,reject)=>{
			var movies=[],list=[],error={};
			let search=(mv)=>{
				return new Promise((resolve,reject)=>{
					db.get_all(mv).then(data=>{
						
						// list.push(Array.from(data,mv=>mv.title));
						// console.log(list.length);
						resolve( data)
					},err=>{
						reject( err);
					})
				})
			}

			type.forEach(async (item,i)=>{
				list.push(search(item))
				
			})
			Promise.all(list).then(res=>{
				res.forEach(tp=>{
					tp.forEach(mv=>{
						movies.push(mv.title)
					})
				})
				console.log(movies.length);
				if(movies.length>0){
					resolve(movies)
				}else if(movies.length=0){
					reject('没有记录')
				}else{
					console.log('222',error);
					reject(error)
				}
			})		
		})
	},
	searchById: async function(id){
		return new Promise((resolve,reject)=>{
			db.get_by_id(id).then(res=>{
				resolve(res)
			},err=>{
				var mv=spider.subject(id)
				db.post_create('detail',mv).then(res=>{
					resolve(res)
				},err=>{
					reject(err)
				})
			})
		})
	}

}