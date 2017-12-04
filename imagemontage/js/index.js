// 获取页面元素
var eleUploadFile = document.getElementById('uploadImg');

var origBase64;

var hourcoordArr = [{ x: 88, y: 948 }, { x: 160, y: 948 }];
var mincoordArr = [{ x: 250, y: 948 }, { x: 330, y: 948 }];

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
var hourImgSouceArr = [];

var minInput = document.getElementById("minTime");
var mintext;
var minImgSouceArr = [];

function hecheng() {
    if (eleUploadFile.value == "") {
        alert("请先选择原始图片");
        return;
    }
    hourImgSouceArr = [];
    hourtext = hourInput.value
    if (hourtext < 1 || hourtext > 24) {
        alert("小时输入超出范围");
        return;
    } else {
        //只有一位数的时候前面加0
        if (hourtext.length == 1) {
            hourtext = "0" + hourtext;
        }
        for (var i = 0; i < hourtext.length; i++) {
            hourImgSouceArr.push("numimg/" + hourtext[i] + "_big.png");
        }

        // alert(hourtext);
        // return;
    }
    minImgSouceArr = [];
    mintext = minInput.value;
    if (mintext < 1 || mintext > 59) {
        alert("分钟输入超出范围");
        return;
    } else {
        //只有一位数的时候前面加0
        if (mintext.length == 1) {
            mintext = "0" + mintext;
        }
        for (var j = 0; j < mintext.length; j++) {
            minImgSouceArr.push("numimg/" + mintext[j] + "_big.png");
        }
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
    len = hourImgSouceArr.length;
    c.width = origImg.naturalWidth;
    c.height = origImg.naturalHeight;
    // ctx.rect(0, 0, c.width, c.height);
    // ctx.fillStyle = '#fff';
    // ctx.fill();
    ctx.drawImage(origImg, 0, 0, origImg.naturalWidth, origImg.naturalHeight); //先绘制原始图片为底图
    if(hourtext!=""){
        function drawing(n) {
            if (n < len) {
                var img = new Image;
                //img.crossOrigin = 'Anonymous'; //解决跨域
                img.src = hourImgSouceArr[n];
                img.onload = function() {
                    ctx.drawImage(img, hourcoordArr[n].x, hourcoordArr[n].y, img.naturalWidth, img.naturalHeight);
                    drawing(n + 1); //递归
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
}
