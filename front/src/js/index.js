//初始化
function Banner() {

};

//添加一个run方法
Banner.prototype.run = function () {
    var bannerUL = $("#banner-ul");
    //500是间隔时间0.5s
    bannerUL.animate({"left":-798},500)
};

//页面加载完成后执行。创建一个对象，运行方法
$(function () {
    var banner = new Banner();
    banner.run()
});

