(( exports ) => {

	var buildSentence = (() => {

		const hits_singles = [ "suora", "koukku", "uppari", "kyynärpää yltä", "kyynärpää alta", "polvi", "kiertopotku" ];

		const hits_sides = hits_singles.reduce(( sides, hit ) => {

			return sides.push( "vasen " + hit ), sides.push( "oikea " +  hit ), sides;

		}, []);

		const hits_sameside = hits_singles.map( v => v );

		const word_sets = [ hits_singles, hits_sides, hits_sameside ];


		return (max_length = 1, min_length = 1, sentence = []) => {
		
			var set = word_sets[ parseInt( Math.random() * word_sets.length ) ];

			if (!(min_length >= 0)) return;
			if (!(min_length <= max_length)) return;

			var count = max_length - min_length + 1;

			count = Math.floor( count * Math.random() );

			var words = word_sets[ parseInt( word_sets.length * Math.random()) ];

			for (var i = 0; i < 100; i++) {

				var word = words[ parseInt( Math.random() * words.length ) ];

				//if (sentence.length > 0 && word == sentence[ sentence.length - 1 ]) continue;
				
				sentence.push( word );

				if (sentence.length >= count) break;
			}

			if (set == hits_sameside) {
				if (sentence.length > 1) sentence.prefix = "Saman puolen";
			}
			
			return sentence;
		}
	})();

	/******************/

	const valmentaja = new Valmentaja(() => buildSentence( 2, 0 ));

	valmentaja.addSayer( new SentenceSayer.HTMLInjector( document.getElementById( "text" ) ));
	valmentaja.addSayer( new SentenceSayer.SpeechApi() );
	valmentaja.addSayer( new SentenceSayer.ConsoleLog() );

	valmentaja.setSpeed( 2500 ); // 2.5s


	exports.start = async function start() {

		var timeout_time_seconds_input      = document.getElementById( "timeout_time_seconds" ) || {};
		var sentences_timeout_seconds_input = document.getElementById( "sentences_timeout_seconds" ) || {};

		
		var timeout_time_seconds = parseInt( timeout_time_seconds_input.value ) || 0;

		if (timeout_time_seconds > 0) setTimeout( async () => {

			await valmentaja.stop();

			alert( "Aika loppui!" );

		}, timeout_time_seconds * 1000 );


		var sentences_timeout_seconds = parseFloat( sentences_timeout_seconds_input.value ) || 0;

		if (sentences_timeout_seconds > 0) valmentaja.setSpeed( sentences_timeout_seconds * 1000 );


		valmentaja.start();

		await initWakeLock();


		/***** DOM-manipulointi *****/
		document.body.classList.add( "running" );
		timeout_time_seconds_input.readOnly = true;
		sentences_timeout_seconds_input.readOnly = true;
		/****************************/
	};


	async function initValmentaja() {
	}


	/** @see {@link https://developer.mozilla.org/en-US/docs/Web/API/Screen_Wake_Lock_API} */
	async function initWakeLock() {

		// Create a reference for the Wake Lock.
		var wakeLock = null;

		// create an async function to request a wake lock
		try {
			wakeLock = await navigator.wakeLock.request('screen');
		} catch (err) {
			// The Wake Lock request has failed - usually system related, such as battery.
			console.error( `${err.name}, ${err.message}` );
			console.error( err );
		}
	}

})( this );

