users=[
	{
		name:'levi',
		password:123,
		_id:1,
		sex:'男',
		age:27
	},
	{
		name:'miley',
		password:123,
		_id:2,
		sex:'女',
		age:27
	}
]


module.exports={
	findOne:function(user){
		return new Promise((resolve,reject)=>{
			users.forEach(it=>{
				if(it.name==user.name&&it.password==user.password){
					resolve(it)
				}
			})
			resolve(null)
		})
	}
}