window.onload = function(){
	// 获取元素
	var music = document.getElementById("music");
	var audio = document.getElementsByTagName('audio')[0];
	var page1 = document.getElementById("page1");
	var page2 = document.getElementById("page2");
	var page3 = document.getElementById("page3");
	// 音乐播放完自动停止
	audio.addEventListener("ended",function(event){
		music.setAttribute("class","");
	},false);
	// music.onclick = function(){
	// 	if(audio.paused){
	// 		audio.play();
	// 		this.setAttribute("class","play");
	// 	}else{
	// 		audio.pause();
	// 		this.setAttribute("class","");
	// 	}
	// }
	// 添加点击唱片控制音乐播放事件
	music.addEventListener("touchstart",function(event){
		if(audio.paused){
			audio.play();
			this.setAttribute("class","play");
		}else{
			audio.pause();
			this.setAttribute("class","");
		}
	},false);
	// 添加点击屏幕开启好运2018事件
	page1.addEventListener("touchstart",function(event){
		page1.style.display = "none";
		page2.style.display = "block";
		page3.style.display = "block";
		page3.style.top = "100%";
		setTimeout(function(){
			page2.setAttribute("class","page fadeOut");
			page3.setAttribute("class","page fadeIn");
		},5500);
	},false);
}