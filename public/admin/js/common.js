	 function serializeToJson(from){
		 var result = {};
		 // serializeArray 获取到表单中用户输入的内容
		// [{name:'email',value:'用户输入的值'},{name:'passname',value:'用户输入的值'}]
		 var f = from.serializeArray()
		 f.forEach(function(item){
			 result[item.name] = item.value
		 })
		 return result
	 }