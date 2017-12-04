// 获取页面元素
var eleUploadFile = document.getElementById('uploadImg');

var origBase64;

var coordArr = [{ x: 88, y: 948 }, { x: 160, y: 948 },{ x: 250, y: 948 }, { x: 330, y: 948 },{ x: 430, y: 948 }, { x: 510, y: 948 }];

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
        document.getElementById('imgBox').innerHTML = '<p style="padding:10px 0">合成图片成功！可以鼠标另存图片查看我是否是一张图片~~！</p><img src="' + base64[0] + '">';
    })
}

var base64 = [];

function draw(fn) {
    var origImg = document.getElementsByTagName("img")[0];
    var c = document.createElement('canvas'),
        ctx = c.getContext('2d');
    len = imgSouceArr.length;
    c.width = origImg.naturalWidth;
    c.height = origImg.naturalHeight;
    // ctx.rect(0, 0, c.width, c.height);
    // ctx.fillStyle = '#fff';
    // ctx.fill();
    ctx.drawImage(origImg, 0, 0, origImg.naturalWidth, origImg.naturalHeight); //先绘制原始图片为底图

    function drawing(n) {
        if (n < len) {
            if(imgSouceArr[n].indexOf("-"==-1)){
                var img = new Image;
                //img.crossOrigin = 'Anonymous'; //解决跨域
                img.src = imgSouceArr[n];
                img.onload = function() {
                    ctx.drawImage(img, coordArr[n].x, coordArr[n].y, img.naturalWidth, img.naturalHeight);
                    drawing(n + 1); //递归
                }
            }else{
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