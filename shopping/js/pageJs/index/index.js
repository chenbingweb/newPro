//调用seaJs 方法，
seajs.use(['utils','totalControl','./js/pageJs/index/fn.js','config'],function(utils,total,fn,config){
	var _vue=null;
	//页面渲染字段
	var _data={
			a:'222',
			beadhouse:[],
			swiper:[],
			show:true,
			b:0,
			img:config.imgUrl
		}
	//Vue事件绑定
	var _event={}
	//计算属性对象
	var _computed={}
	//全局共有变量
	var _that={}
	$(document).ready(function(){
		InitDocument()
	})
	function InitDocument(){
	//	utils.InitPageState()
		total.InitJsTicket();

		InitData()
	}	
	//数据初始化
	function InitData(){
		//初始化Vue绑定事件computed:computed
		VueCmdPanel();
		//初始化Vue属性计算
		ComputedPro();
		setTimeout(function(){
				//实例Vue,可根据实际情况，可以添加Vue相关配置
		_vue=_that.vue=utils.setData({el:'.shopping_box',data:_data,methods:_event,computed:_computed,created:function(){
				
			}
		})
		
		total.IsLogin(function(){
			$.showLoading()
				fn.getTest(_that)
				CreateCmdPanel()
		})
	},1)
	

	}
	 //JQuery事件
	function CreateCmdPanel(){
		$(this).scroll(function(){
			//  if(!_page) return
			var viewHeight =$(this).height();//可见高度  
			var contentHeight =$("body").get(0).scrollHeight;//内容高度  
			var scrollHeight =$(this).scrollTop();//滚动高度  
			if(scrollHeight/(contentHeight -viewHeight)>=1){ //到达底部100%时,加载新内容  
				console.log(22)
				fn.getTest(_vue)
			}  
		});
		$('button').click(function(){
		//	this._vue.$data.a=999
			fn.click(_vue.$data)
		})

	}
	//Vue绑定事件 this=>vue
	function VueCmdPanel(){
		_event.alert=function(e){
					window.location.href="www.baidu.com"
			console.log(this)
		}
		_event.to=function(url){
			console.log(url)
			window.location.href=url
		}
	}
	//属性计算 this=>vue
	function ComputedPro(){
		_computed.filter=function(){
				
				
		}
	}



  });

	





  function greet(e){
    this.b=2+this.b;
    console.log(e)
  }

  //{city_name:"北京市",content:"",page_num:1,page_size:6}

