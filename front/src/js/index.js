//初始化
function Banner() {
    this.bannerGroup = $("#banner-group");
    this.index = 0;
    this.leftArrow = $('.left-arrow');
    this.rightArrow = $('.right-arrow');
    //获取li标签的数量，去控制点轮播图的箭头，下一张上一张图片
    this.bannerUL = $("#banner-ul");
    this.liList = this.bannerUL.children("li");
    this.bannerCount = this.liList.length;
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

Banner.prototype.animate = function () {
    var self = this;
    self.bannerUL.animate({"left":-798*self.index},500);
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
        self.animate();
    },2000);
};


Banner.prototype.listenArrowClick = function () {
    var self = this;
    self.leftArrow.click(function () {
       if(self.index === 0){
           self.index = self.bannerCount - 1;
       }else{
           self.index --;
       }
       self.animate();
    });

    self.rightArrow.click(function () {
       if(self.index === self.bannerCount - 1){
           self.index = 0;
       }else{
           self.index ++;
       }
       self.animate();
    });
};

//添加一个run方法
Banner.prototype.run = function () {
    this.loop();
    this.listenArrowClick();
};

//页面加载完成后执行。创建一个对象，运行方法
$(function () {
    var banner = new Banner();
    banner.run();
});

