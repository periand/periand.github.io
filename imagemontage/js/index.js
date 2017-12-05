// 获取页面元素
var eleUploadFile = document.getElementById('uploadImg');

var origBase64;

// var coordArr = [{ x: 348, y: 905 }, { x: 372, y: 905 }, { x: 408, y: 905 }, { x: 431, y: 905 }, { x: 88, y: 948 }, { x: 160, y: 948 }, { x: 260, y: 948 }, { x: 335, y: 948 }, { x: 435, y: 948 }, { x: 510, y: 948 }];
var coordArr = [{ x: 0.3625, y: 0.707 }, { x: 0.3875, y: 0.707 }, { x: 0.425, y: 0.707 }, { x: 0.449, y: 0.707 }, { x: 0.0917, y: 0.7406 }, { x: 0.1667, y: 0.7406 }, { x: 0.2708, y: 0.7406 }, { x: 0.349, y: 0.7406 }, { x: 0.4531, y: 0.7406 }, { x: 0.5313, y: 0.7406 }];
// var coordArr = [{ x: 88, y: 948 }, { x: 160, y: 948 },{ x: 260, y: 948 }, { x: 335, y: 948 },{ x: 435, y: 948 }, { x: 510, y: 948 }];
// 上传原图片
eleUploadFile.addEventListener('change', function(event) {
    var reader = new FileReader();
    var file = event.target.files[0] || event.dataTransfer.files[0];
    reader.onload = function(e) {
        origBase64 = e.target.result;
        document.getElementById('origImgDiv').innerHTML = '<img src="' + origBase64 + '">'
    };
    reader.readAsDataURL(file);
});


// 合成图片
var monthInput = document.getElementById("month");
var monthtext;

var dayInput = document.getElementById("day");
var daytext;

var hourInput = document.getElementById("hourTime");
var hourtext;

var minInput = document.getElementById("minTime");
var mintext;

var secInput = document.getElementById("secTime");
var sectext;

function hecheng() {
    if (eleUploadFile.value == "") {
        alert("请先选择原始图片");
        return;
    }
    imgSouceArr = [];
    //月份
    monthtext = monthInput.value
    if (monthtext == "") {
        monthtext = "--";
    } else {
        if (monthtext < 1 || monthtext > 12) {
            alert("月输入超出范围");
            return;
        }
    }
    //只有一位数的时候前面加0
    if (monthtext.length == 1) {
        monthtext = "0" + monthtext;
    }
    for (var m = 0; m < monthtext.length; m++) {
        imgSouceArr.push("numimg/" + monthtext[m] + "_small.png");
    }

    //日期
    daytext = dayInput.value
    if (daytext == "") {
        daytext = "--";
    } else {
        if (daytext < 1 || daytext > 31) {
            alert("日输入超出范围");
            return;
        }
    }
    //只有一位数的时候前面加0
    if (daytext.length == 1) {
        daytext = "0" + daytext;
    }
    for (var d = 0; d < daytext.length; d++) {
        imgSouceArr.push("numimg/" + daytext[d] + "_small.png");
    }

    //小时
    hourtext = hourInput.value
    if (hourtext == "") {
        hourtext = "--";
    } else {
        if (hourtext < 1 || hourtext > 24) {
            alert("小时输入超出范围");
            return;
        }
    }
    //只有一位数的时候前面加0
    if (hourtext.length == 1) {
        hourtext = "0" + hourtext;
    }
    for (var i = 0; i < hourtext.length; i++) {
        imgSouceArr.push("numimg/" + hourtext[i] + "_big.png");
    }

    //分钟
    mintext = minInput.value;
    if (mintext == "") {
        mintext = "--"
    } else {
        if (mintext < 1 || mintext > 59) {
            alert("分钟输入超出范围");
            return;
        }
    }
    //只有一位数的时候前面加0
    if (mintext.length == 1) {
        mintext = "0" + mintext;
    }
    for (var j = 0; j < mintext.length; j++) {
        imgSouceArr.push("numimg/" + mintext[j] + "_big.png");
    }

    //秒
    sectext = secInput.value;
    if (sectext == "") {
        sectext = "--";
    } else {
        if (sectext < 1 || sectext > 59) {
            alert("秒输入超出范围");
            return;
        }
    }

    //只有一位数的时候前面加0
    if (sectext.length == 1) {
        sectext = "0" + sectext;
    }
    for (var k = 0; k < sectext.length; k++) {
        imgSouceArr.push("numimg/" + sectext[k] + "_big.png");
    }

    draw(function() {
        document.getElementById('imgBox').innerHTML = '<p style="padding:10px 0">修改图片成功！</p><img src="' + base64[0] + '">';
    })
}

var base64 = [];

function draw(fn) {
    var origImg = document.getElementsByTagName("img")[0];
    var c = document.createElement('canvas'),
        ctx = c.getContext('2d');
    len = imgSouceArr.length;
    var origWidth  = origImg.naturalWidth;
    var origHeight = origImg.naturalHeight;
    c.width = origWidth;
    c.height = origHeight;
    var scale = origWidth/960;
    // alert(scale);
    // alert(c.width+","+c.height);
    // ctx.rect(0, 0, c.width, c.height);
    // ctx.fillStyle = '#fff';
    // ctx.fill();
    ctx.drawImage(origImg, 0, 0); //先绘制原始图片为底图
    var img;
    

    function drawing(n) {
        if (n < len) {
            if (imgSouceArr[n].indexOf("-") == -1) {
                //img.crossOrigin = 'Anonymous'; //解决跨域
                img = new Image;
                img.src = imgSouceArr[n];
                img.onload = function() {
                    ctx.drawImage(img, coordArr[n].x*origWidth, coordArr[n].y*origHeight,img.naturalWidth*scale,img.naturalHeight*scale);
                    drawing(n + 1); //递归
                }
            } else {
                drawing(n + 1);
            }
        } else {
            //保存生成作品图片
            base64.push(c.toDataURL("image/jpeg", 0.8));
            //alert(JSON.stringify(base64));
            fn();
        }
    }
    drawing(0);
}