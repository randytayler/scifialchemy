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

function prepButtons(){
	var buttons = [
		[['S','E']],
		[['↖'],[10,10]]
	];
	for (var i = 0; i < buttons.length; i++) {
		var icon = buttons[i];
		for (var b = 0; b < icon[0].length; b++) {
			if (icon[1]) {
				var x = icon[1][b][0];
				var y = icon[1][b][1];
				if (icon[1][b][2]) var size = icon[1][b][2];
				else var size = 35;
			} else {
				var x = 0;
				var y = 99;
				var size = 70;
			}
			drawEmoji(i + 1000, icon[0][b], x, y, size);
		}
	}
	//var button = document.getElementById('goFS');
	//button.style.backgroundImage = document.getElementById('c' + 1000).toDataURL();
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

function sortSlots(){
	var slots = document.getElementById('pantry').childNodes;
	for (var i = 0; i < slots.length; i++){
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
		}
	}
}

function finalize(){
	for (var i=0; i<elements.length; i++){
		pantry[document.getElementById('i' + i).getAttribute('elid')] = i;
		discoveries[i] = false;
	}
	for (var i=0; i<=3; i++){
		discoveries[i] = true;
	}
	if (localStorage.getItem('discoveries')) {
		discoveries = localStorage.getItem('discoveries').split(',');
	}
	for (var i=0; i<discoveries.length; i++){
		discoveries[i] = (discoveries[i] == 'false' || !discoveries[i]) ? false : true;
		if (discoveries[i]) {
			//if (elements[i][4]){
			//	document.getElementById('trophySlot'+i).style.display='inline';
			//} else {
				document.getElementById('pantrySlot' + i).style.display = 'inline';
			//}
		} else {
			document.getElementById('pantrySlot'+i).style.display='none';
		}
	}
}