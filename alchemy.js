var ingredients=[];
var discoveries=[];
var pantry=[];
var lastrand=-1;
var sound=true;
var moves=0;

function findResult(id1,id2){
	for (var i=0; i<recipes.length; i++){
		if ((recipes[i].i[0] == id1) && (recipes[i].i[1] == id2)) return [recipes[i].r,recipes[i].m];
		if ((recipes[i].i[0] == id2) && (recipes[i].i[1] == id1)) return [recipes[i].r,recipes[i].m];
	}
	return [];
}

function makeCanvas(i) {
	var cnew = ctmp.cloneNode(true);
	cnew.setAttribute('id','c' + i);
	document.body.appendChild(cnew);
	return cnew;
}

function drawEmoji(i, emoji, x, y, size){
	var cnew = document.getElementById('c'+i);
	if (cnew == null) cnew = makeCanvas(i);
	ctxnew = cnew.getContext('2d');
	ctxnew.font = size + 'px sans-serif';
	ctxnew.textAlign = 'left';
	ctxnew.fillText(emoji, x, y);
}

function prepSlots(){
	for (var e=0; e<elements.length; e++) {
		var slot = document.createElement('div');
		slot.id = 'pantrySlot' + e;
		slot.className = 'pantrySlot copy';
		document.getElementById('pantry').appendChild(slot);
		if (elements[e][4]) {
			var slot = document.createElement('div');
			slot.id = 'trophySlot' + e;
			slot.className = 'pantrySlot';
			document.getElementById('collectioncontent').appendChild(slot);
		}
	}
}

function prepElements(){
	for (var e=0; e<elements.length; e++){
		var name = elements[e][0];
		var icon = elements[e][1];
		var pos = elements[e][2];
		var desc = elements[e][3];
		if (Array.isArray(icon)) {
			for (var b = 0; b < icon.length; b++) {
				if (pos[b]) {
					var x = pos[b][0];
					var y = pos[b][1];
					if (pos[b][2]) var size = pos[b][2];
					else var size = 70;
				} else {
					console.log('big');
					var x = 0;
					var y = 99;
					var size = 70;
				}
				drawEmoji(e, icon[b], x, y, size);
			}
		} else if (pos=="svg") {
			svg(icon,e);
		} else drawEmoji(e, icon,0,70,70);
	}
}

function prepIcons(){
	for (var e=0; e<elements.length; e++){
		if (document.getElementById('c'+e)) {
			var img = document.createElement('img');
			img.src = document.getElementById('c' + e).toDataURL();
			var final = elements[e][4] == 1 ? true : false;
			img.className = 'pantryIngredient drag';
			img.id = 'i' + (ingredients.length);
			img.setAttribute('elid',e);
			ingredients[ingredients.length] = 'i' + (ingredients.length);
			var desc = document.createElement('span');
			desc.innerText = elements[e][0];
			document.getElementById('pantrySlot'+e).appendChild(img);
			document.getElementById('pantrySlot'+e).appendChild(desc);
			document.getElementById('pantrySlot'+e).style.display='none';
			if (final) {
				console.log(e);
				var img2 = img.cloneNode();
				img2.id = 'coll' + e;
				document.getElementById('trophySlot' + e).appendChild(img2);
				document.getElementById('trophySlot' + e).appendChild(desc);
				document.getElementById('trophySlot' + e).style.display = 'none';
			}
		} else {
			var final = elements[e][4] == 1 ? true : false;
			if (final) {
				console.log(e);
				var pantrySlot = document.getElementById('pantrySlot'+e);
				var img = pantrySlot.children[0];
				var desc = pantrySlot.children[1].cloneNode(true);
				var img2 = img.cloneNode();
				desc.id = 'descoll' + e;
				img2.id = 'coll' + e;
				document.getElementById('trophySlot' + e).appendChild(img2);
				document.getElementById('trophySlot' + e).appendChild(desc);
				document.getElementById('trophySlot' + e).style.display = 'none';
			}
		}
	}
}

function finalize(){
	for (var i=0; i<elements.length; i++){
		pantry[document.getElementById('i' + i).getAttribute('elid')] = i;
		if (document.getElementById('trophySlot' + i)) document.getElementById('trophySlot' + i).style.display = 'none';
		discoveries[i] = false;
	}
	for (var i=0; i<=3; i++){
		discoveries[i] = true;
	}
	if (localStorage.getItem('sfa_discoveries')) {
		discoveries = localStorage.getItem('sfa_discoveries').split(',');
	}
	for (var i=0; i<discoveries.length; i++){
		discoveries[i] = (discoveries[i] == 'false' || !discoveries[i]) ? false : true;
		if (discoveries[i]) {
			if (elements[i][4]){
				document.getElementById('trophySlot'+i).style.display='inline';
			} else {
				document.getElementById('pantrySlot' + i).style.display = 'inline';
			}
		} else {
			document.getElementById('pantrySlot'+i).style.display='none';
		}
	}
}

function prepHome(){
	var hcx = document.getElementById('homecanvas').getContext("2d");
	hcx.globalAlpha = .5;
	hcx.drawImage(document.getElementById('i3'),0,0);
	hcx.drawImage(document.getElementById('i3'),159,20);
	hcx.drawImage(document.getElementById('i3'),189,0);
	hcx.drawImage(document.getElementById('i3'),20,158);
	hcx.drawImage(document.getElementById('i3'),80,158);
	hcx.drawImage(document.getElementById('i3'),299,158);
	hcx.globalAlpha = .3;
	hcx.drawImage(document.getElementById('i3'),0,298);
	hcx.drawImage(document.getElementById('i3'),159,320);
	hcx.drawImage(document.getElementById('i3'),189,298);
	hcx.globalAlpha = .2;
	hcx.drawImage(document.getElementById('i3'),20,450);
	hcx.drawImage(document.getElementById('i3'),80,450);
	hcx.drawImage(document.getElementById('i3'),299,450);
	hcx.globalAlpha = .4;
	hcx.filter = 'blur(1px)';
	hcx.drawImage(document.getElementById('i15'),0,29);
	hcx.drawImage(document.getElementById('i33'),275,29);
	hcx.globalAlpha = .3;
	hcx.drawImage(document.getElementById('i72'),10,230);
	hcx.drawImage(document.getElementById('i30'),270,230);
}

function store(discoveredElements) {
	localStorage.setItem('sfa_discoveries', discoveredElements);
}
function storeMoves() {
	localStorage.setItem('sfa_moves', moves);
}
function toggleFullScreen() {
	var doc = window.document;
	var docEl = doc.documentElement;

	var requestFullScreen = docEl.requestFullscreen || docEl.mozRequestFullScreen || docEl.webkitRequestFullScreen || docEl.msRequestFullscreen;
	var cancelFullScreen = doc.exitFullscreen || doc.mozCancelFullScreen || doc.webkitExitFullscreen || doc.msExitFullscreen;

	if(!doc.fullscreenElement && !doc.mozFullScreenElement && !doc.webkitFullscreenElement && !doc.msFullscreenElement) {
		requestFullScreen.call(docEl);
		document.getElementById('fullscreenbutton').innerText='WINDOWED';
	}
	else {
		cancelFullScreen.call(doc);
		document.getElementById('fullscreenbutton').innerText='FULL SCREEN';
	}
}
function scrollUp(){
	document.getElementById('pantry').scrollTop -= 400;
}
function scrollDown(){
	document.getElementById('pantry').scrollTop += 400;
}
function score(){
	var score = 0;
	for (var e=0;e<discoveries.length;e++){
		if (discoveries[e]) score++;
	}
	document.getElementById('score').innerText = score;
	document.getElementById('max').innerText = discoveries.length;
	if (score == discoveries.length) {
		win();
	}
}
function win(){
	document.getElementById('wincontent').style.display="block";
	document.getElementById('moves').innerText = "You found every element in " + moves + " moves.";
	goColl();
}
function closeModal(){
	modal.style.display="none";
}
function closeCollection(){
	collection.style.display="none";
}
function clearForge(){
	var forgeElements = document.getElementById('forge').getElementsByTagName('img');
	var count = forgeElements.length;
	for (var f=0; f<count; f++) forgeElements[0].remove();
}
function goHome(){
	home.style.display="block";
	if (document.monetization) {
		document.monetization.addEventListener('monetizationstart', () => {
			hintTime = 15000;
		})
	}
}
function goColl(){
	collection.style.display="block";
}
function play(){
	hintInterval = setInterval(enableHint, hintTime);
	finalize();
	score();
	home.style.display="none";
	document.getElementById('playbutton').innerText = 'CONTINUE';
}
function toggleSound(){
	if (sound) {
		document.getElementById('soundbutton').innerText = 'SOUND OFF';
		sound = false;
	} else {
		document.getElementById('soundbutton').innerText = 'SOUND ON';
		sound = true;
	}
}
function newgame(){
	localStorage.removeItem('sfa_discoveries');
	localStorage.removeItem('sfa_moves');
	discoveries = [];
	moves = 0;
	document.getElementById('wincontent').style.display='none';
	resetHints();
	closeCollection();
	clearForge();
	play();
}
function enableHint(){
	document.getElementById('hint').style.opacity = 1;
	hintsEnabled = true;
}
function showHint(){
	document.getElementById('discovery').innerText = findHint();
	document.getElementById('discoveryimage').style.display = 'none';
	document.getElementById('discoverydesc').innerHTML = '';
	modal.style.display = 'block';
}
function findHint(){
	var hints = [];
	for (var d=0; d<discoveries.length; d++){
		for (var e=0; e<discoveries.length; e++){
			if (discoveries[d] && discoveries[e]){
				var result = findResult(d,e);
				if (discoveries[result[0]]) {
					continue;
				} else if (result.length > 1) {
					hints[hints.length] = "Try creating " + elements[result[0]][0] + " with " + elements[e][0];
				}
			}
		}
	}
	var hintNumber = Math.floor(Math.random()*hints.length);
	resetHints();
	return hints[hintNumber];
}
function resetHints(){
	hintsEnabled = false;
	clearInterval(hintInterval);
	hintInterval = setInterval(enableHint, hintTime);
	document.getElementById('hint').style.opacity = .3;
}