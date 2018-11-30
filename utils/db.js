const Monk=require('monk');
const db=new Monk('192.168.20.137/test');

module.exports={
	// post_create:function(table,record){
	// 	db.get(table).insert(record,async (err,data)=>{
	// 		return new Promise((resolve,reject)=>{
	// 			if(!err) reject('5001 数据库异常！')
	// 				resolve(data)
	// 		}
	// 	})
	// }	
	post_create:function(table,record){
		return new Promise((resolve,reject)=>{
			db.get(table).insert(record).then(res=>{
				console.log(res);
				resolve(res)
			}).catch(err=>{
				if(res) reject('5001 数据库异常！'+err)
			})		
		})
	},
	post_delete:function(table,id){
		return new Promise((resolve,reject)=>{
			db.get(table).remove({id:id}).then((err,data)=>{
				console.log(err,data)
				if(err) reject('5002 数据库异常！')
					resolve(data)
			}).catch(err=>{
				reject(err);
			})
		})
	},
	post_delete_all:function(table,id){
		return new Promise((resolve,reject)=>{
			db.get(table).remove().then((res)=>{
				if(!res.result.ok!=0) reject('5005 数据库异常！'+res.result)
					resolve(res.result)
			}).catch(err=>{
				reject(err);
			})
		})
	},
	get_one:function(table,name ){
		return new Promise((resolve,reject)=>{
			db.get(table).findOne({title: name}).then((data)=>{
				if(!data) reject('5003 没有记录!')
					resolve(data)
			})
		})
	},
	get_all:function(table,name ){
		return new Promise((resolve,reject)=>{
			db.get(table).find({}).then((data)=>{
				if(!data) reject('5004 没有记录!')
					resolve(data)
			})
		})
	},
	get_by_id:function(id){
		return new Promise((resolve,reject)=>{
			db.get('detail').findOne({id:id}).then(data=>{
				console.log(data)
				if(!data) reject('5006 没有记录!')
					resolve(data)
			})
		})
	}
}