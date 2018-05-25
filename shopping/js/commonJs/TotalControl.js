define(function(require, exports, module) {  
	//全局uid
	$.uid=undefined;
	$.httpType="http://"
	var _util=require('../utilsJs/utils.js');
	var _interface=require('../configJs/interface.js');
		
	//获取wxJSDK
	function InitJsTicket(callback,shareFlag){
		var hiddenList=[
						'menuItem:share:appMessage',
						'menuItem:share:timeline',
						'menuItem:share:qq',
						'menuItem:share:weiboApp',
						'menuItem:favorite',
						'menuItem:share:facebook',
						'menuItem:share:QZone',
						'menuItem:editTag',
						'menuItem:delete',
						'menuItem:copyUrl',
						'menuItem:originPage',
						'menuItem:readMode',
						'menuItem:openWithQQBrowser',
						'menuItem:openWithSafari',
						'menuItem:share:email',
						'menuItem:share:brand'
					]
		if(shareFlag)
		{
			hiddenList=[
						'menuItem:share:qq',
						'menuItem:share:weiboApp',
						'menuItem:favorite',
						'menuItem:share:facebook',
						'menuItem:share:QZone',
						'menuItem:editTag',
						'menuItem:delete',
						'menuItem:copyUrl',
						'menuItem:originPage',
						'menuItem:readMode',
						'menuItem:openWithQQBrowser',
						'menuItem:openWithSafari',
						'menuItem:share:email',
						'menuItem:share:brand'
					]
		}
		var href=window.location.href;
		var sendData={
				url:href
		}
		_util.Ajax(sendData,function(jo){
			wx.config({
			debug: false,
			appId: jo.appId,
			timestamp: jo.timestamp,
			nonceStr: jo.nonceStr,
			signature: jo.signature,
			jsApiList:[
				'getLocation',
				'previewImage',
				'chooseWXPay',
				'chooseImage',
				'uploadImage',
				'hideMenuItems',
				'hideAllNonBaseMenuItem',
				'onMenuShareTimeline',
				'onMenuShareAppMessage',
				'onMenuShareQQ',
				'onMenuShareWeibo',
				'onMenuShareQZone'
				]
				});
			wx.ready(function(){
				wx.checkJsApi({
					jsApiList:[
						'hideMenuItems',
						'hideAllNonBaseMenuItem'
					],
					success:function(res){
					//要隐藏的菜单项,只能隐藏"传播类"和"保护类"按钮,所有menu项见附录3
					wx.hideMenuItems({
						menuList:hiddenList
					});
					},
					fail:function(res){
						}
				});
			}); 
		},function(){

		},_interface.jsdk_url);
	}
	//判断是否授权登录
	function IsLogin(callback){
		//var uid= $.GetUrlPara('uid')
		_util.getLocalStorage('userInfo',function(res){
			$.uid=res;
			if(!$.uid)
			{	
				var code= _util.GetUrlPara('code');
				//将code值传到后台服务器，以获取用户信息
				if(code)
				{
					var hostname=window.location.hostname
					//拼写传送报文
					var sendData={
						url:$.httpType+hostname,
						code:code
					};
					//调用用户登陆接口
					_util.Ajax(sendData,function(data){
							$.uid=data.id;
							//储存本地
							_util.setLocalStorage('userInfo',data.user_id,callback,true);
							_util.setLocalStorage('userInfoData',JSON.stringify(data),undefined,true);
							},function(err){

					})
				}	
				else//url上没有code值
				{
					//调用腾讯授权接口
					GetPower(function(data){
						window.location.href=data
						},function(err){

						})
					}
								
			}
			else
			{
				callback()

			}
		},true);
		//用户基本信息
		_util.getLocalStorage('userInfoData',function(res){
				try{
						$.userInfo=JSON.parse(res) 
				}
				catch(e)
				{

				}
		},true);
	}
	//用户登陆操作发送报文
	function GetPower(success,fail)
	{
		var hostname=window.location.href;
		//拼写传送报文
		var senddata={
			url:hostname
		};
		_util.Ajax(senddata,success,fail,_interface.power)
	}
	//导出方法
	module.exports={
		InitJsTicket:InitJsTicket,
		IsLogin:IsLogin
	}
})