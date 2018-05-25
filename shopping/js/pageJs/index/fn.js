define(function(require, exports, module) {  
	//引入util
  var _util=require('../../../js/utilsJs/utils.js');
  //引入接口
  var _interface=require('../../../js/configJs/interface.js');
  //获取
  function getTest(that){
    var beadhouse=  that.vue.$data.beadhouse
    _util.Ajax({city_name:"北京市",content:"",page_num:1,page_size:6},function(res){
      for(var i=0;i<res.beadhouse.length;i++){
        beadhouse.push(res.beadhouse[i])
      }
         that.vue.$data.beadhouse=beadhouse;
         that.vue.$data.swiper=res.swiperList
		new Swiper('.swiper-container', {
			loop: true,
			autoplay: 2000,
			speed:500,
			autoplayDisableOnInteraction : false ,   /* 注意此参数，默认为true */ 
			observer: true, // 修改swiper自己或子元素时，自动初始化swiper
			observeParents: true,   // 修改swiper父元素时，自动初始化swiper
		})
$.hideLoading()
    
    },function(){

    },_interface.beadhouse_url)
  }
  function click(data){
    data.a=0
    var a=data.a+99;
    data.a=a
    console.log(data)
  }
  module.exports = {  // 对外提供接口
    getTest:getTest,
     click:click
  };
});