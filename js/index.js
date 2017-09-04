/**
 * Created by xusheng on 2017/9/4.
 */

//  天空背景 部分的开始

//  天空的构造函数的部分
function Sky(info){
    //  图片
    this.image = info.image;
    //  位置
    this.x = info.x;
    //  画图工具
    this.context = info.context;
    //  画布
    this.canvas = info.canvas;
    //  速度
    this.speed = 2;
}

//  天空的对象原型
Sky.prototype = {
    constructor:Sky,
    draw:function(){
        //  移动
        this.x -= this.speed;
        //  如果走出舞台
        if(this.x <= -this.canvas.width){
            //  就提到队伍的最后面
            this.x = this.canvas.width;
        }
        //  将图片绘制到画布上
        this.context.drawImage(this.image,this.x,0,this.image.width,this.image.height);
    }
}

//  天空背景 部分的结束

//  陆地背景 部分的开始
function Land(info) {
    this.image = info.image;
    this.x = info.x;
    this.canvas = info.canvas;
    this.context = info.context;
    this.speed = 2;
}

Land.prototype = {
    constructor:Land,
    draw:function (){
        //  向左移动
        this.x -= this.speed;
        //  如果走出舞台,就排到队伍的后面去
        if(this.x <= -this.image.width){
            this.x = this.image.width * 3;
        }
        //  绘制到画布上
        this.context.drawImage(this.image,this.x,this.canvas.height-this.image.height,this.image.width,this.image.height);
    }
}
//  陆地背景 部分的结束

//  管道背景 部分的开始
/*
function Pipe(info){
    //  图片
    this.image = info.image;
    //  水平位置
    this.x = info.x;
    //  画布和画图工具
    this.canvas = info.canvas;
    this.context = info.context;
    //  移动速度
    this.speed = 2;
    //  管道之间的间隔
    this.gap = info.gap;
}

//  管道的对象原型
Pipe.prototype = {
    constructor: Pipe,
    //  绘制方法
    draw:function () {
        //  改变位置
        this.x -= this.speed;
        //  如果移出舞台,跑到屏幕的外面
        if(this.x <= -this.image.width){
            this.x = this.image.width * 5 + this.gap * 6;
        }
        //  开始画图
        this.context.drawImage(this.image,this.x,0,this.image.width,this.image.height);
    }
}

*/
//  管道背景 部分的结束

//  完整版管道部分的开始-------------------------------------------
//  构造函数
function Pipe2(info){
    //  上部分的图片
    this.topImage = info.topImage;
    //  下部分的图片
    this.bottomImage = info.bottomImage;
    //  水平位置
    this.x = info.x;
    //  画布和画图工具
    this.canvas = info.canvas;
    this.context = info.context;
    //  移动速度
    this.speed = 2;
    //  管道之间的间隔
    this.gap = info.gap;
    //  上管道与下管道之间的间隔
    this.space = 100;
    //  底部的间隔
    this.bottomOffset = info.bottomOffset;

    //  上下两个管道的高度
    this.topHeight = 0;
    this.bottomHeight = 0;

    //  初始化管道的高度
    this.initHeight();
}

//  构造函数原型
Pipe2.prototype = {
    constructor:Pipe2,
    //  绘制方法
    draw:function (){
        //  改变位置
        this.x -= this.speed;
        //  如果移出舞台,跑到屏幕的外面
        if(this.x <= -this.topImage.width){
            this.x = this.topImage.width * 5 + this.gap*6;
        }

        //  开始画图
        //  上面的管道
        this.context.drawImage(this.topImage,this.x,0,this.topImage.width,this.topHeight);
        //  下面的管道
        this.context.drawImage(this.bottomImage,this.x,this.topHeight+this.space,this.bottomImage.width,this.bottomHeight);

        //  上面柱子的路径
        this.context.rect(this.x,0,this.topImage.width,this.topHeight);
        //  下面柱子的路径
        this.context.rect(this.x,this.topHeight + this.space,this.bottomImage.width,this.bottomHeight);

    },

    //  计算出两个管道的高度
    initHeight:function(){
        //  代表这个管道的高度是一个100到250的一个随机值
        //  上管道的高度
        this.topHeight = Math.random() * 150 + 100;
        //  下管道的高度
        this.bottomHeight = this.canvas.height - this.topHeight - this.space - this.bottomOffset;
    }
}
//  完整版管道部分的结束-------------------------------------------

//  展翅翱翔的小鸡的开始--------------------------------------------
//  小鸟的构造函数

function Bird(info) {
    this.context = info.context;
    this.canvas = info.canvas;
    this.x = info.x;
    this.y = info.y;
    this.image = info.image;
    this.w = this.image.width/3;
    this.h = this.image.height;
    this.index = 0;
    //  加速度
    this.aspeed = 0.0005;
    this.speed = 0;
    this.startTime = new Date();

    //  最大速度
    this.maxspeed = 0.6;
    //  最大角度
    this.maxAngle = 45;
}

//  小鸟的构造函数原型

Bird.prototype = {
    constructor:Bird,
    draw: function () {
        this.index += 1;
        //  计算水平方向第几张图片
        var xindex = this.index%3;

        //  计算小鸟从上一帧到当前帧移动了多远
        var now = new Date();
        var deltaTime = now - this.startTime;
        //  从上一帧到当前帧小鸟的位移
        var s = this.speed * deltaTime + this.aspeed*deltaTime * deltaTime /2;
        //  当前帧的小鸟的速度
        this.speed = this.speed + this.aspeed*deltaTime;
        //  把当前帧的时间,设为下一帧计算参考的起始时间
        this.startTime = now;

        //  改变小鸟的y坐标
        this.y += s;

        //  平移坐标系
        this.context.save();
        //translate 是累加的
        this.context.translate(this.x + this.w/2,this.y + this.h/2);

        //  计算小鸟的旋转的角度
        var percent = this.speed / this.maxspeed;
        var radian = (this.maxAngle*percent)/180*Math.PI;
        this.context.rotate(radian);

        //  切图显示
        this.context.drawImage(this.image,xindex*this.w,0,this.w,this.h,-this.w/2,-this.h/2,this.w,this.h);
        this.context.restore();
    }
}



//  展翅翱翔的小鸡的结束--------------------------------------------
















