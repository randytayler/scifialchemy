function svg(x,elid) {
	var shapes = x.split(";");
	var ret=[];
	var music;
	var s=document.createElement('svg');
	s.setAttribute('width',99);
	s.setAttribute('height',99);
	for (var i=0;i<shapes.length;i++){
		var t=shapes[i].substr(0,1);
		switch(t){
			case 'r':
				s.appendChild(svgR(shapes[i]));
				break;
			case 'y':
				s.appendChild(svgY(shapes[i]));
				break;
			case 'p':
				s.appendChild(svgP(shapes[i]));
				break;
			case 'e':
				s.appendChild(svgE(shapes[i]));
				break;
			case 'i':
				s.appendChild(svgI(shapes[i]));
				break;
			case 'c':
				s.appendChild(svgC(shapes[i]));
				break;
			case 'm':
				music = shapes[i].substr(1);
				break;
			default:
				break;
		}
	}
	s.setAttribute('version','1.1');
	var xml = (new XMLSerializer).serializeToString(s).replace(/1999\/xhtml/,'2000/svg');
	var m=document.createElement('img');
	m.width=m.height=99;
	m.src = "data:image/svg+xml;charset=utf-8,"+xml;
	m.setAttribute('class','pantryIngredient drag');
	m.setAttribute('id','i'+(ingredients.length));
	m.setAttribute('elid',elid);
	//m.setAttribute('style', 'left:' + (ingredients.length*56) + 'px');
	ingredients[ingredients.length] = 'i'+(ingredients.length);
	document.getElementById('pantrySlot'+elid).appendChild(m);
	var desc = document.createElement('span');
	desc.innerText = elements[elid][0];
	document.getElementById('pantrySlot'+elid).appendChild(desc);
	document.getElementById('pantrySlot'+elid).style.display='none';
	m.addEventListener('touchmove', function(e){
		e.preventDefault();
		var tl=e.targetTouches[0];
		m.style.left=tl.pageX+'px';
		m.style.top=tl.pageY+'px';
	}, )
}
function svgR(x){
	var a=document.createElement('rect');
	a.setAttribute('x',x.substr(1,2));
	a.setAttribute('y',x.substr(3,2));
	a.setAttribute('width',x.substr(5,2));
	a.setAttribute('height',x.substr(7,2));
	a.setAttribute('fill',hex2rgb(x.substr(9,3)));
	a.setAttribute('stroke',hex2rgb(x.substr(12)));
	if (x.length>13) a.setAttribute('stroke-width',x.substr(15,2));
	return a;
}
function svgY(x){
	var a=document.createElement('polygon');
	a.setAttribute('fill',hex2rgb(x.substr(1,3)));
	a.setAttribute('stroke',hex2rgb(x.substr(4,3)));
	var p='';
	for(var j=7;j<x.length;j+=4){
		p+=x.substr(j,2)+','+x.substr(j+2,2)+' ';
	}
	a.setAttribute('points',p.trim());
	return a;
}
function svgP(x){
	var a=document.createElement('path');
	a.setAttribute('fill',hex2rgb(x.substr(1,3)));
	a.setAttribute('stroke',hex2rgb(x.substr(4,3)));
	a.setAttribute('stroke-width',x.substr(7,2));
	a.setAttribute('d',x.substr(9));
	return a;
}
function svgE(x){
	var a=document.createElement('ellipse');
	a.setAttribute('stroke',hex2rgb(x.substr(9,3)));
	a.setAttribute('fill',hex2rgb(x.substr(12,3)));
	if (x.length>13) a.setAttribute('stroke-width',x.substr(15,2));
	a.setAttribute('cx',x.substr(1,2));
	a.setAttribute('cy',x.substr(3,2));
	a.setAttribute('rx',x.substr(5,2));
	a.setAttribute('ry',x.substr(7,2));
	return a;
}
function svgI(x){
	var a=document.createElement('line');
	a.setAttribute('stroke-width',x.substr(15,2));
	a.setAttribute('stroke',hex2rgb(x.substr(9,3)));
	a.setAttribute('fill',hex2rgb(x.substr(12,3)));
	a.setAttribute('x1',x.substr(1,2));
	a.setAttribute('y1',x.substr(3,2));
	a.setAttribute('x2',x.substr(5,2));
	a.setAttribute('y2',x.substr(7,2));
	return a;
}
function svgC(x){
	var a=document.createElement('circle');
	a.setAttribute('stroke',hex2rgb(x.substr(7,3)));
	a.setAttribute('fill',hex2rgb(x.substr(10,3)));
	if (x.length>13) a.setAttribute('stroke-width',x.substr(13,2));
	a.setAttribute('cx',x.substr(1,2));
	a.setAttribute('cy',x.substr(3,2));
	a.setAttribute('r',x.substr(5,2));
	return a;
}
function hex2rgb(c){
	if (c=='non') return "none";
	return 'rgba('+parseInt(c.substr(0,1)+c.substr(0,1),16)+','+parseInt(c.substr(1,1)+c.substr(1,1),16)+','+parseInt(c.substr(2,1)+c.substr(2,1),16)+',255)';
}