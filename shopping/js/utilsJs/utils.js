define(function(require, exports, module) {  
	//获取发送接口地址
	var _SendPost=require('../configJs/config.js').sendPost;
	//是否进行安全控制,true不能复制链接等,false可以复制链接等
	var _SafetyControl=true;
	//获取url上的查询字段
	function GetUrlPara(str)
	{
		var reg = new RegExp("(^|&)" + str + "=([^&]*)(&|$)");
		var r = window.location.search.substr(1).match(reg);
		if (r != null) 
		return unescape(r[2]); 
		return null;
	}
	//初始化页面
	function InitPageState()
	{
		if(_SafetyControl)
		{
			var useragent=navigator.userAgent;
			if (useragent.match(/MicroMessenger/i)!='MicroMessenger')
			{
				alert('已禁止本次访问：您必须使用微信内置浏览器访问本页面！');
				var opened=window.open('about:blank', '_self');
				opened.opener=null;
				opened.close();
			}
			else
			{
		/*
					if(!_openid)
					{
									$.ShowAlert('请您从菜单进入!');
									var opened=window.open('about:blank', '_self');
									opened.opener=null;
									opened.close();
					}*/
			}
		}
	}
	//Vue实例  {el:ele,data:options,methods}
	function setData(options){

		//var vue=new Vue({el:ele,data:options,methods})
		var vue=new Vue(options)
		return vue
  	}
	//Ajax
	function Ajax(senddata,success,fail,interface,flag){
		//加密
		senddata.signature="EB6EB8B669BA4846";
		//转字符串
		senddata=JSON.stringify(senddata);
		console.log(senddata)
		$.ajax({
			type:'post',
			url:_SendPost+interface,
			data:senddata,
			dataType:'json',
		//	contentType:'application/json',
			contentType:'text/plain',
			async:true,
			success:function(jo)
			{
				//成功获取数据
				if(jo.errcode==0)
				{
					//如果为真，返回整个数据
					if(flag)
					{
						success(jo)
					}
					else//默认返回data数据
					{
						success(jo.data)
					}
				}
				//获取失败
				else if(jo.errcode==1)
				{
						fail(jo)
				}
				else if(jo.status==200){
						success(jo)
				}
			},
			error:function(msg)
			{
				console.log(msg)
			//	window.close();
			//	$(window).attr('location',$.httpType+window.location.host)
			}
		}); 
	}
	//表单序列化 subInfo=$("form").serializeArray()
	function serializeObj(subInfo){
		var subInfoObj={};
		if($.type(subInfo)=='array')
		{
			$.each(subInfo,function(index,item){
						subInfoObj[item.name]=item.value
			})
		}
		return subInfoObj
	}
	//把时间戳转换成正常时间
	function formatTime(date, str, showTime) {
	  var year = date.getFullYear()
	  var month = date.getMonth() + 1
	  var day = date.getDate()

	  var hour = date.getHours()
	  var minute = date.getMinutes()
	  var second = date.getSeconds()
	  //转换成yyyy-m-d
	  var format = [year, month, day].map(ormatNumber).join(str);
	  if (showTime) {
	    //转换成yyyy-m-d h:m
	    format = [year, month, day].map(ormatNumber).join(str) + ' ' + [hour, minute].map(ormatNumber).join(':');
	  }
	  return format
	}
	//时间补位
	function ormatNumber(n) {
	  n = n.toString()
	  return n[1] ? n : '0' + n
	}
	//本地储存数据
	function setLocalStorage(key,value,callback,flag){
			//临时本地储存
			if(flag)
			{
				sessionStorage.setItem(key,value);	
			}
			//永久本地储存
			else
			{
				localStorage.setItem(key,value);
			}
			//执行回调函数
			if($.type(callback)=='function')
			{
				callback()
			}	 
	} 
	//读取本地信息
	function getLocalStorage(key,callback,flag){
		var data=null;
		//读取临时数据
		if(flag)
		{
			data=sessionStorage.getItem(key);
		}
		//读取永久数据
		else
		{
			data=localStorage.getItem(key);
		}
			//执行回调函数
		if($.type(callback)=='function')
		{
			callback(data)
		}
	} 
	//移除数据
	function removeLocaLStorage(key,callback,flag){
		if(flag)
		{
			sessionStorage.removeItem(key);
		}
		else
		{
			localStorage.removeItem(key);
		}
			//执行回调函数
		if($.type(callback)=='function')
		{
			callback()
		}
	}
  module.exports = {  // 对外提供接口
      GetUrlPara:GetUrlPara,
      InitPageState:InitPageState,
      setData:setData,
      Ajax:Ajax,
      serializeObj:serializeObj,
      formatTime:formatTime,
      setLocalStorage:setLocalStorage,
      getLocalStorage:getLocalStorage,
      removeLocaLStorage:removeLocaLStorage
  };
});