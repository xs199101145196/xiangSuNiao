/**
 * Created by xusheng on 2017/9/4.
 */

//  ��ձ��� ���ֵĿ�ʼ

//  ��յĹ��캯���Ĳ���
function Sky(info){
    //  ͼƬ
    this.image = info.image;
    //  λ��
    this.x = info.x;
    //  ��ͼ����
    this.context = info.context;
    //  ����
    this.canvas = info.canvas;
    //  �ٶ�
    this.speed = 2;
}

//  ��յĶ���ԭ��
Sky.prototype = {
    constructor:Sky,
    draw:function(){
        //  �ƶ�
        this.x -= this.speed;
        //  ����߳���̨
        if(this.x <= -this.canvas.width){
            //  ���ᵽ����������
            this.x = this.canvas.width;
        }
        //  ��ͼƬ���Ƶ�������
        this.context.drawImage(this.image,this.x,0,this.image.width,this.image.height);
    }
}

//  ��ձ��� ���ֵĽ���

//  ½�ر��� ���ֵĿ�ʼ
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
        //  �����ƶ�
        this.x -= this.speed;
        //  ����߳���̨,���ŵ�����ĺ���ȥ
        if(this.x <= -this.image.width){
            this.x = this.image.width * 3;
        }
        //  ���Ƶ�������
        this.context.drawImage(this.image,this.x,this.canvas.height-this.image.height,this.image.width,this.image.height);
    }
}
//  ½�ر��� ���ֵĽ���

//  �ܵ����� ���ֵĿ�ʼ
/*
function Pipe(info){
    //  ͼƬ
    this.image = info.image;
    //  ˮƽλ��
    this.x = info.x;
    //  �����ͻ�ͼ����
    this.canvas = info.canvas;
    this.context = info.context;
    //  �ƶ��ٶ�
    this.speed = 2;
    //  �ܵ�֮��ļ��
    this.gap = info.gap;
}

//  �ܵ��Ķ���ԭ��
Pipe.prototype = {
    constructor: Pipe,
    //  ���Ʒ���
    draw:function () {
        //  �ı�λ��
        this.x -= this.speed;
        //  ����Ƴ���̨,�ܵ���Ļ������
        if(this.x <= -this.image.width){
            this.x = this.image.width * 5 + this.gap * 6;
        }
        //  ��ʼ��ͼ
        this.context.drawImage(this.image,this.x,0,this.image.width,this.image.height);
    }
}

*/
//  �ܵ����� ���ֵĽ���

//  ������ܵ����ֵĿ�ʼ-------------------------------------------
//  ���캯��
function Pipe2(info){
    //  �ϲ��ֵ�ͼƬ
    this.topImage = info.topImage;
    //  �²��ֵ�ͼƬ
    this.bottomImage = info.bottomImage;
    //  ˮƽλ��
    this.x = info.x;
    //  �����ͻ�ͼ����
    this.canvas = info.canvas;
    this.context = info.context;
    //  �ƶ��ٶ�
    this.speed = 2;
    //  �ܵ�֮��ļ��
    this.gap = info.gap;
    //  �Ϲܵ����¹ܵ�֮��ļ��
    this.space = 100;
    //  �ײ��ļ��
    this.bottomOffset = info.bottomOffset;

    //  ���������ܵ��ĸ߶�
    this.topHeight = 0;
    this.bottomHeight = 0;

    //  ��ʼ���ܵ��ĸ߶�
    this.initHeight();
}

//  ���캯��ԭ��
Pipe2.prototype = {
    constructor:Pipe2,
    //  ���Ʒ���
    draw:function (){
        //  �ı�λ��
        this.x -= this.speed;
        //  ����Ƴ���̨,�ܵ���Ļ������
        if(this.x <= -this.topImage.width){
            this.x = this.topImage.width * 5 + this.gap*6;
        }

        //  ��ʼ��ͼ
        //  ����Ĺܵ�
        this.context.drawImage(this.topImage,this.x,0,this.topImage.width,this.topHeight);
        //  ����Ĺܵ�
        this.context.drawImage(this.bottomImage,this.x,this.topHeight+this.space,this.bottomImage.width,this.bottomHeight);

        //  �������ӵ�·��
        this.context.rect(this.x,0,this.topImage.width,this.topHeight);
        //  �������ӵ�·��
        this.context.rect(this.x,this.topHeight + this.space,this.bottomImage.width,this.bottomHeight);

    },

    //  ����������ܵ��ĸ߶�
    initHeight:function(){
        //  ��������ܵ��ĸ߶���һ��100��250��һ�����ֵ
        //  �Ϲܵ��ĸ߶�
        this.topHeight = Math.random() * 150 + 100;
        //  �¹ܵ��ĸ߶�
        this.bottomHeight = this.canvas.height - this.topHeight - this.space - this.bottomOffset;
    }
}
//  ������ܵ����ֵĽ���-------------------------------------------

//  չ�᰿���С���Ŀ�ʼ--------------------------------------------
//  С��Ĺ��캯��

function Bird(info) {
    this.context = info.context;
    this.canvas = info.canvas;
    this.x = info.x;
    this.y = info.y;
    this.image = info.image;
    this.w = this.image.width/3;
    this.h = this.image.height;
    this.index = 0;
    //  ���ٶ�
    this.aspeed = 0.0005;
    this.speed = 0;
    this.startTime = new Date();

    //  ����ٶ�
    this.maxspeed = 0.6;
    //  ���Ƕ�
    this.maxAngle = 45;
}

//  С��Ĺ��캯��ԭ��

Bird.prototype = {
    constructor:Bird,
    draw: function () {
        this.index += 1;
        //  ����ˮƽ����ڼ���ͼƬ
        var xindex = this.index%3;

        //  ����С�����һ֡����ǰ֡�ƶ��˶�Զ
        var now = new Date();
        var deltaTime = now - this.startTime;
        //  ����һ֡����ǰ֡С���λ��
        var s = this.speed * deltaTime + this.aspeed*deltaTime * deltaTime /2;
        //  ��ǰ֡��С����ٶ�
        this.speed = this.speed + this.aspeed*deltaTime;
        //  �ѵ�ǰ֡��ʱ��,��Ϊ��һ֡����ο�����ʼʱ��
        this.startTime = now;

        //  �ı�С���y����
        this.y += s;

        //  ƽ������ϵ
        this.context.save();
        //translate ���ۼӵ�
        this.context.translate(this.x + this.w/2,this.y + this.h/2);

        //  ����С�����ת�ĽǶ�
        var percent = this.speed / this.maxspeed;
        var radian = (this.maxAngle*percent)/180*Math.PI;
        this.context.rotate(radian);

        //  ��ͼ��ʾ
        this.context.drawImage(this.image,xindex*this.w,0,this.w,this.h,-this.w/2,-this.h/2,this.w,this.h);
        this.context.restore();
    }
}



//  չ�᰿���С���Ľ���--------------------------------------------
















