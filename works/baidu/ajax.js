 // ajax({
	// 		url:'http://www.baidu.com/a.php',
	// 		type:'get | post',
	// 		data:{user:zs,age:19} | user=zs&age=19,
	// 		dataType:'text | xml | json',
	// 		asynch:'true | false',
	// 		
	// 		success:function(data){

	// 		}

	// })

	// 	function ajax(option){
	// 		option.url
	// 		option.type
	// 		option.asynch
	// 		option.data
	// 		option.success
			
	// 	}	

function ajax(option){

	if(!option.url){
		return;
	}
	var type=option.type||'get';
	var asynch=option.asynch==undefined?true:option.asynch;
	var dataType=option.dataType||'text';
	var data='';
	if(typeof option.data=='string'){//user=zs&age=19
		data=option.data;
	}else if(typeof option.data=='object'){//{user:zs,age:19} 
		var str='';
		for(var i in option.data){
			str+=i+'='+option.data[i]+'&';
		}
		data=str.slice(0,-1);
	}



//jsonp
//	ajax({
//		url:'',
//		dataType:'jsonp',
//		data:{out:'a'},
//		jsonpCallback:{callback:'get'},
//		success:function(data){
//			console.log(data);
//		}
//	})

	if(dataType=='jsonp'){//判断写入的dataType值是不是jsonp
		//先给属性名和属性值一个默认值，当不传入的时候为默认
		var callbackKey='callback';//将属性callback赋值给callbackKey
		var callbackVal='J'+new Date().getTime();//J1445688032 用时间戳自动生成函数名 jsonp的属性值就是函数名
		if(!(option.jsonpCallback==undefined)){//判断jsonCallback属性值是否不为空
			//不为空 用for in遍历传入的属性名
			for(var i in option.jsonpCallback){
				callbackKey=i;//i就是传入的json中的属性名

				//如果给jsonpCallback传入了问号，说明要自动生成函数名，函数名就为时间戳，否则函数名就为传入的函数名
				callbackVal= option.jsonpCallback[i]=='?'?callbackVal:option.jsonpCallback[i];
			}
		}
		//回调函数，函数名为callbackVal
		window[callbackVal]=function (data){
			option.success(data);//将返回的数据传给data
			delete window[callbackVal];//删除函数，防止反复调用
		}
	
		var spt=document.createElement('script');
		var urls='';
		if(!data){//判断是否给data传入了数据
			//如果data没有传入数据
			if(option.url.indexOf('?')!=-1){//判断url中是否有问号
				//url中有问号
				urls=option.url+'&'+callbackKey+'='+callbackVal;
			}else{//url中没有问号
				urls=option.url+'?'+callbackKey+'='+callbackVal;
			}
		}else{
			//如果data有数据传入
			if(option.url.indexOf('?')!=-1){
				//有问号，说明问号后有属性名与属性值，所以直接连接&
				urls=option.url+'&'+data+'&'+callbackKey+'='+callbackVal;
			}else{
				//没有问号
				urls=option.url+'?'+data+'&'+callbackKey+'='+callbackVal;
			}
		}
		spt.src=urls;//将urls赋值给script的src属性
		document.getElementsByTagName('head')[0].appendChild(spt);//往head中插入script标签
		
		return;//退出函数，只执行jsonp，不执行下面的ajax
	}

	

// Ajax

	var xhr=window.XMLHttpRequest?new XMLHttpRequest():new ActiveXObject("Microsoft.XMLHTTP");
	
	if(type=='get'){
		xhr.open('get',option.url+'?'+data,asynch);
		xhr.send();
	}else if(type==post){
		xhr.setRequestHeader("Content-type","application/x-www-form-urlencoded");
		xhr.open('post',option.url,asynch);
		xhr.send(data);
	}
	
	xhr.onreadystatechange=function(){
		if(xhr.readyState==4){
			if(xhr.status==200){
				if(dataType=='text'){
					option.success(xhr.responseText);
				}else if(dataType=='json'){
					var josn=eval('('+xhr.responseText+')');
					option.success(json);
				}else if(dataType=='xml'){
					option.success(xhr.responseXML);
				}
			}
		}
	}

}