var hintTime = 30000;
var hintInterval = false;
var hintsEnabled = false;
var touchinprogress=false;
var listened=false;
bugfix=v=>{
	var imgs = document.getElementsByTagName("img");
	for (var i=0; i<imgs.length; i++){
		if (imgs[i].parentNode.nodeName=='BODY'){
			imgs[i].remove();
		}
	}
};
prepSlots();
prepElements();
prepIcons();
setTimeout(prepHome,0);
goHome();