//初始化
function Banner() {
    this.bannerGroup = $("#banner-group");
    this.index = 0;
    this.leftArrow = $('.left-arrow');
    this.rightArrow = $('.right-arrow');
    this.listenBannerHover();
};

Banner.prototype.toggleArrow = function (isShow) {
    if(isShow) {
        var self = this;
        self.leftArrow.show();
        self.rightArrow.show();
    }else{
        self.leftArrow.hide();
        self.rightArrow.hide();
    }
};

Banner.prototype.listenBannerHover = function (){
  var self = this;
  this.bannerGroup.hover(function () {
      //鼠标移动到上面
      clearInterval(self.timer);
      self.toggleArrow(true);
  },function () {
      //鼠标离开
      self.loop();
      self.toggleArrow(false);
  });
};

Banner.prototype.loop = function(){
    var self = this;
    var bannerUL = $("#banner-ul");
    this.timer = setInterval(function () {
        if(self.index >= 3){
            self.index = 0
        }else{
            self.index++;
        }
        bannerUL.animate({"left":-798*self.index},500);
    },2000);
};

//添加一个run方法
Banner.prototype.run = function () {
    this.loop();
};

//页面加载完成后执行。创建一个对象，运行方法
$(function () {
    var banner = new Banner();
    banner.run();
});

