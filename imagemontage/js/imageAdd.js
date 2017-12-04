window.onload = function() {

    alert("start");
    var eleUploadFile = document.getElementById('uploadFile');
    var eleImgCover = document.getElementById('imgCover');
    var eleImgUploadX = document.getElementById('imgUploadX');

    if (history.pushState) {
        eleUploadFile.addEventListener('change', function(event) {
            var reader = new FileReader();
            var file = event.target.files[0] || event.dataTransfer.files[0];
            reader.onload = function(e) {
                var base64 = e.target.result;
                if (base64.length > 1024 * 50) {
                    alert('图片尺寸请小于50K');
                    return;
                } else {
                    // 使用canvas合成图片，并base64化
                    imgTogether(base64, function(url) {
                        // 尺寸
                        var size = 180 / (window.devicePixelRatio || 1);
                        // 预览
                        eleImgUploadX.innerHTML = '<img src="' + url + '" width="' + size + '" height="' + size + '">';
                    });
                }
            };
            reader.readAsDataURL(file);
        });

        // canvas图片合成
        var imgTogether = function(url, callback) {
            var canvas = document.createElement('canvas');
            var size = 180;
            canvas.width = size;
            canvas.height = size;

            var context = canvas.getContext('2d');

            // 这是上传图像
            var imgUpload = new Image();
            imgUpload.onload = function() {
                // 绘制
                context.drawImage(imgUpload, 0, 0, size, size, 0, 0, size, size);
                // 再次绘制
                context.drawImage(eleImgCover, 0, 0, size, size, 0, 0, size, size);
                // 回调
                callback(canvas.toDataURL('image/png'));
            };
            imgUpload.src = url;
        };
    } else if (eleImgUploadX) {
        eleImgUploadX.className = 'remind';
        eleImgUploadX.innerHTML = '本演示IE10+下才有效果';
    }
}