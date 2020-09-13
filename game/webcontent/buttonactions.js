function toggleaudio() {
	try {
		if (music != undefined) {
			if (audioState) {
				jingle.pause();
				music.pause();
				audioState = false;
			} else {
				music.play();
				audioState = true;
			}
		}
	} catch (v) {
		alert(v.message);
	}
}