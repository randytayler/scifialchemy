n=(e,x)=>{
	for(V = x,
		    b = (e, t, a, i) => Math.sin(e / t * 6.28 * a + i),
		    w=(e,t)=>Math.sin(e / 44100 * t * 6.28 + b(e, 44100, t, 0) ** 2 + .75 * b(e, 44100, t, .25) + .1 * b(e, 44100, t, .5)),
		    D = [],
		    i = 0;
	    i < 44100 * V;
	    i++
	){
		D[i] =
			i < 88
				? i / 88.2 * w(i, e)
				: (1 - (i - 88.2) / (44100 * (V - .002))) ** ((.5 * Math.log(1e4 * e / 44100)) ** 2) * w(i, e);
	}

	// Play the note
	A = new AudioContext,
		m = A.createBuffer(1, 1e6, 44100),
		m.getChannelData(0).set(D),
		s = A.createBufferSource(),
		s.buffer = m,
		s.connect(A.destination),
		s.start()
};

var soundInterval = false;
var currentSong = false;
var currentNote = false;
playSong=s=>{
	if (sound) {
		currentSong = s;
		currentNote = 0;
		soundInterval = setInterval(playNote, 100);
	}
};
playNote=()=>{
	for(var i=0;i<currentSong.length;i++){
		if (currentSong[i][currentNote]) {
			var noteData = currentSong[i][currentNote].split("-");
			n(notes[noteData[0]],noteData[1]);
		}
	}
	currentNote++;
	if (currentNote > currentSong[0].length) clearInterval(soundInterval);
};