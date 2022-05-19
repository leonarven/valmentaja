(( exports ) => {

	var buildSentence = (() => {
		
		const hit_sets_obj = {}
		const hit_sets = [];

		function inject_hit( hit, key ) {
			if (!hit_sets_obj[key]) {
				hit_sets_obj[key] = [];
				hit_sets.push( hit_sets_obj[key] );
			}
			hit_sets_obj[key].push( hit );
		}


		function xh( string ) {
			string = new String( string );
			string.hand = true;
			string.backside = true;
			string.frontside = true;
			inject_hit( string, "xh" );
			inject_hit( string, "xx" );
			return string;
		}

		function bh( string ) {
			string = new String( string );
			string.hand = true;
			string.backside = true;
			inject_hit( string, "bh" );
			inject_hit( string, "bx" );
			return string;
		}

		function fh( string ) {
			string = new String( string );
			string.hand = true;
			string.frontside = true;
			inject_hit( string, "fh" );
			inject_hit( string, "fx" );
			return string;
		}

		function zhd( string ) {
			string = new String( string );
			string.hand = true;
			string.defensive = true;
			inject_hit( string, "zhd" );
			return string;
		}

		function zzd( string ) {
			string = new String( string );
			string.defensive = true;
			inject_hit( string, "zzd" );
			return string;
		}


		function xf( string ) {
			string = new String( string );
			string.foot = true;
			string.backside = true;
			string.frontside = true;
			inject_hit( string, "xf" );
			inject_hit( string, "xx" );
			return string;
		}

		function bf( string ) {
			string = new String( string );
			string.foot = true;
			string.backside = true;
			inject_hit( string, "bf" );
			inject_hit( string, "bx" );
			return string;
		}

		function ff( string ) {
			string = new String( string );
			string.foot = true;
			string.frontside = true;
			inject_hit( string, "ff" );
			inject_hit( string, "fx" );
			return string;
		}
		
		function xfd( string ) {
			string = new String( string );
			string.foot = true;
			string.defensive = true;
			inject_hit( string, "xfd" );
			return string;
		}
		
		function ffd( string ) {
			string = new String( string );
			string.foot = true;
			string.frontside = true;
			string.defensive = true;
			inject_hit( string, "ffd" );
			return string;
		}		
		
		function bfd( string ) {
			string = new String( string );
			string.foot = true;
			string.backside = true;
			string.defensive = true;
			inject_hit( string, "ffd" );
			return string;
		}		
		
		

		const hits = [
			xh("suora"),
			fh("etusuora"),
			bh("takasuora"),

			xh("uppari"),
			fh("etukäden uppari"),
			bh("takakäden uppari"),

			xh("koukku"),
			fh("etukäden koukku"),
			bh("takakäden koukku"),
			
			xh("kyynärpää yltä"),
			fh("etukäden kyynärpää yltä"),
			bh("takakäden kyynärpää yltä"),
			
			xh("kyynärpää alta"),
			fh("etukäden kyynärpää alta"),
			bh("takakäden kyynärpää yltä"),

			xf("polvi"),
			ff("etujalan polvi"),
			bf("takajalan polvi"),

			xf("kiertopotku"),
			ff("etujalan kiertopotku"),
			bf("takajalan kiertopotku"),

			xf("jalkatorjunta"),
			ff("etujalan torjunta"),
			bf("takajalan torjunta"),

			zhd("pään torjunta"),
			zzd("lyönnin väistö"),
			zzd("potkun väistö"),
			zzd("askel taakse josta väistö"),

			xfd("pysäri"),
			ffd("etujalan pysäri"),
			bfd("takajalan pysäri"),

			xfd("työntö polvella"),
			ffd("työntö etujalan polvella"),
			bfd("työntö takajalan polvella"),
		];

		console.debug( "Using hit sets", hit_sets_obj );

		return (max_length = 1, min_length = 1, sentence = []) => {
		
			var set = hit_sets[ parseInt( Math.random() * hit_sets.length ) ];

			if (!(min_length >= 0)) return;
			if (!(min_length <= max_length)) return;

			var count = max_length - min_length + 1;

			count = Math.floor( count * Math.random() );

			var words = hit_sets[ parseInt( hit_sets.length * Math.random()) ];

			count = Math.min( count, words.length );

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

	const valmentaja = new Valmentaja(() => buildSentence( 3, 0 ));

	valmentaja.addSayer( new SentenceSayer.HTMLInjector( document.getElementById( "text" ) ));
	valmentaja.addSayer( new SentenceSayer.SpeechApi() );
	valmentaja.addSayer( new SentenceSayer.ConsoleLog() );

	valmentaja.setSpeed( 2500 ); // 2.5s
	

	setTimeout(() => {

		var training_form                   = document.getElementById( "training-form" ) || {};
		var timeout_time_seconds_input      = document.getElementById( "timeout_time_seconds" ) || {};
		var sentences_timeout_seconds_input = document.getElementById( "sentences_timeout_seconds" ) || {};

		
		var default_settings = {
			timeout_time_seconds      : 60,
			sentences_timeout_seconds : 2.5,
		};

		var settings = {};

		try {
			settings = JSON.parse( window.localStorage.getItem( "valmentaja-settings-v1" ) || "{}" );
		} catch (error) { console.error( error ); }

		settings = { ...default_settings, ...settings };

		for (var key in settings) {
			var elem = training_form.querySelector( "[name=" + key + "]" );
			if (elem) elem.value = settings[ key ];
		}

		training_form.onsubmit = async function( event ) {
			
			event.preventDefault();

			var nsettings = {};

			for (var key in settings) {
				var elem = training_form.querySelector( "[name=" + key + "]" );
				if (elem) nsettings[ key ] = elem.value;
			}

			settings.timeout_time_seconds = parseInt( nsettings.timeout_time_seconds ) || undefined;
			if (!(settings.timeout_time_seconds > 0)) settings.timeout_time_seconds = undefined;


			settings.sentences_timeout_seconds = parseFloat( nsettings.sentences_timeout_seconds ) || undefined;
			if (!(settings.sentences_timeout_seconds > 0)) settings.sentences_timeout_seconds = undefined;

			settings = { ...default_settings, ...settings }


			try {
				window.localStorage.setItem( "valmentaja-settings-v1", JSON.stringify( settings ) );
			} catch (error) { console.error( error ); }

			/*********/
			
			var { timeout_time_seconds, sentences_timeout_seconds } = settings;
			
	
			if (timeout_time_seconds) setTimeout( async () => {
	
				await valmentaja.stop();
	
				alert( "Aika loppui!" );
	
			}, timeout_time_seconds * 1000 );
	
	
			if (sentences_timeout_seconds) valmentaja.setSpeed( sentences_timeout_seconds * 1000 );

			/*********/
	
			valmentaja.start();
	
			await initWakeLock();
	
			/***** DOM-manipulointi *****/
			document.body.classList.add( "running" );
			timeout_time_seconds_input.readOnly = true;
			sentences_timeout_seconds_input.readOnly = true;
			/****************************/

			return false;
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
	});

})( this );

