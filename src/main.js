(( exports ) => {

	var buildSentence = (() => {
		
		const hit_sets_obj = {}

		function inject_hit( hit, key ) {
			if (!hit_sets_obj[key]) hit_sets_obj[key] = [];
			hit_sets_obj[key].push( hit );
		}

		function bothsides_hand( string ) {
			string = new String( string );
			string.hand = true;
			string.backside = true;
			string.frontside = true;
			inject_hit( string, "bothsides_hand" );
			return string;
		}

		function backside_hand( string ) {
			string = new String( string );
			string.hand = true;
			string.backside = true;
			inject_hit( string, "backside_hand" );
			return string;
		}

		function frontside_hand( string ) {
			string = new String( string );
			string.hand = true;
			string.frontside = true;
			inject_hit( string, "frontside_hand" );
			return string;
		}

		function noside_hand_defensive( string ) {
			string = new String( string );
			string.hand = true;
			string.defensive = true;
			inject_hit( string, "noside_hand_defensive" );
			return string;
		}

		function noside_defensive( string ) {
			string = new String( string );
			string.defensive = true;
			inject_hit( string, "noside_defensive" );
			return string;
		}


		function bothsides_foot( string ) {
			string = new String( string );
			string.foot = true;
			string.backside = true;
			string.frontside = true;
			inject_hit( string, "bothsides_foot" );
			return string;
		}

		function backside_foot( string ) {
			string = new String( string );
			string.foot = true;
			string.backside = true;
			inject_hit( string, "backside_foot" );
			return string;
		}

		function frontside_foot( string ) {
			string = new String( string );
			string.foot = true;
			string.frontside = true;
			inject_hit( string, "frontside_foot" );
			return string;
		}
		
		function bothsides_foot_defensive( string ) {
			string = new String( string );
			string.foot = true;
			string.defensive = true;
			inject_hit( string, "bothsides_foot_defensive" );
			return string;
		}
		
		function frontside_foot_defensive( string ) {
			string = new String( string );
			string.foot = true;
			string.frontside = true;
			string.defensive = true;
			inject_hit( string, "frontside_foot_defensive" );
			return string;
		}		
		
		function backside_foot_defensive( string ) {
			string = new String( string );
			string.foot = true;
			string.backside = true;
			string.defensive = true;
			inject_hit( string, "backside_foot_defensive" );
			return string;
		}		


		var xh  = bothsides_hand;
		var xf  = bothsides_foot;
		var xfd = bothsides_foot_defensive;

		var bh  = backside_hand;
		var bf  = backside_foot;
		var bfd = backside_foot_defensive;

		var fh  = frontside_hand;
		var ff  = frontside_foot;
		var ffd = frontside_foot_defensive;

		var zhd = noside_hand_defensive
		var zd  = noside_defensive;



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
			zd("lyönnin väistö"),
			zd("potkun väistö"),
			zd("askel taakse josta väistö"),

			xfd("pysäri"),
			ffd("etujalan pysäri"),
			bfd("takajalan pysäri"),

			xfd("työntö polvella"),
			ffd("työntö etujalan polvella"),
			bfd("työntö takajalan polvella"),
		];

		hit_sets_obj.bothsides = [ ...hit_sets_obj.bothsides_hand, ...hit_sets_obj.bothsides_foot, ...hit_sets_obj.bothsides_foot_defensive ];

		hit_sets_obj.backside = [ ...hit_sets_obj.backside_hand, ...hit_sets_obj.backside_hand, ...hit_sets_obj.backside_foot_defensive ];

		hit_sets_obj.frontside = [ ...hit_sets_obj.frontside_hand, ...hit_sets_obj.frontside_foot, ...hit_sets_obj.frontside_foot_defensive ];

		hit_sets_obj.hands = [ ...hit_sets_obj.noside_defensive, ...hit_sets_obj.noside_hand_defensive ];

		hit_sets_obj.feets = [ ...hit_sets_obj.bothsides_hand, ...hit_sets_obj.backside_hand, ...hit_sets_obj.frontside_hand, ...hit_sets_obj.noside_hand_defensive ];
		
		hit_sets_obj.defensives = [ ...hit_sets_obj.noside_defensive, ...hit_sets_obj.noside_hand_defensive ];

		const hit_sets = Object.keys( hit_sets_obj ).map( key => hit_sets_obj[key] );


		console.group( "Using hit sets:" );
		for (var key in hit_sets_obj) console.debug( key, hit_sets_obj[key] );
		console.groupEnd( "Using hit sets:" );

		var buildSentence =  function buildSentence(max_length = 1, min_length = 1, sentence = [], set_keys = Object.keys( hit_sets_obj ) ) {

			console.debug( "buildSentence( max_length, min_length, sentence, set_keys ) ::", arguments );

			var set = set_keys.reduce(( out, set_key ) => {
				for (var word of hit_sets_obj[ set_key ]) if (out.indexOf( word ) == -1) out.push( word );
				return out;
			}, [ ]);

			if (!(min_length >= 0)) return;
			if (!(min_length <= max_length)) return;

			var count = max_length - min_length + 1;

			count = Math.floor( count * Math.random() );

			count = Math.min( count, set.length );

			for (var i = 0; i < 100; i++) {

				var word = set[ parseInt( Math.random() * set.length ) ];
				
				sentence.push( word );

				if (sentence.length >= min_length + count) break;
			}

			if (set == hit_sets_obj.bothsides || set == hit_sets_obj.bothsides_hand || set == hit_sets_obj.bothsides_foot || set == hit_sets_obj.bothsides_foot_defensive) {
				if (sentence.length > 1) sentence.prefix = "Saman puolen";
			}
			
			return sentence;
		}

		buildSentence.set_keys = Object.keys( hit_sets_obj );

		return buildSentence;
	})();

	/******************/

	const valmentaja = new Valmentaja();

	valmentaja.addSayer( new SentenceSayer.HTMLInjector( document.getElementById( "text" ) ));
	valmentaja.addSayer( new SentenceSayer.SpeechApi() );
	valmentaja.addSayer( new SentenceSayer.ConsoleLog() );

	valmentaja.setSpeed( 2500 ); // 2.5s
	

	setTimeout(() => {

		var training_form                   = document.getElementById( "training-form" ) || {};
		var timeout_time_seconds_input      = document.getElementById( "timeout_time_seconds" ) || {};
		var sentences_timeout_seconds_input = document.getElementById( "sentences_timeout_seconds" ) || {};
		var sets_select                     = document.getElementById( "sets" ) || {};

		
		var default_settings = {
			timeout_time_seconds      : 60,
			sentences_timeout_seconds : 2.5,
			sentences_min_length      : 0,
			sentences_max_length      : 3
		};

		var settings = {};

		try {
			settings = JSON.parse( window.localStorage.getItem( "valmentaja-settings-v1" ) || "{}" );
			console.info( "Loaded settings", settings );
		} catch (error) { console.error( error ); }

		settings = { ...default_settings, ...settings };

		for (var key in default_settings) {
			var elem = training_form.querySelector( "[name=" + key + "]" );
			if (elem) elem.value = settings[ key ];
		}

		for (var set_key of settings.sets) {
			var elem = sets_select.querySelector("[value=" + set_key + "]" );
			if (elem) elem.selected = "selected";
		}

		training_form.onsubmit = async function( event ) {
			
			event.preventDefault();

			var nsettings = {}, elem;

			for (var key in default_settings) {
				elem = training_form.querySelector( "[name=" + key + "]" );
				if (elem) nsettings[ key ] = elem.value;
			}

			elem = training_form.querySelector( "[name=sets]" );
			if (elem) settings.sets = Array.prototype.slice.call( training_form.querySelectorAll( "[name=sets] option:checked" ), 0) .map(function(v,i,a) { 
				return v.value; 
			});

			settings.timeout_time_seconds = parseInt( nsettings.timeout_time_seconds ) || undefined;
			if (!(settings.timeout_time_seconds > 0)) settings.timeout_time_seconds = undefined;


			settings.sentences_timeout_seconds = parseFloat( nsettings.sentences_timeout_seconds ) || undefined;
			if (!(settings.sentences_timeout_seconds > 0)) settings.sentences_timeout_seconds = undefined;

			settings.sentences_min_length = parseFloat( nsettings.sentences_min_length ) || undefined;
			if (!(settings.sentences_min_length > 0)) settings.sentences_min_length = undefined;

			settings.sentences_max_length = parseFloat( nsettings.sentences_max_length ) || undefined;
			if (!(settings.sentences_max_length > 0)) settings.sentences_max_length = undefined;

			settings = { ...default_settings, ...settings };


			try {
				window.localStorage.setItem( "valmentaja-settings-v1", JSON.stringify( settings ));
				console.info( "Saved settings", settings );
			} catch (error) { console.error( error ); }

			/*********/
			
			var { sets: set_keys, timeout_time_seconds, sentences_timeout_seconds, sentences_min_length, sentences_max_length } = settings;
			
	
			if (timeout_time_seconds) setTimeout( async () => {
	
				await valmentaja.stop();
	
				alert( "Aika loppui!" );

				location.reload();
	
			}, timeout_time_seconds * 1000 );
	
	
			if (sentences_timeout_seconds) valmentaja.setSpeed( sentences_timeout_seconds * 1000 );

			/*********/

			valmentaja.sentenceGenerator = () => buildSentence( sentences_max_length, sentences_min_length, [], set_keys );
	
			valmentaja.start();
	
			await initWakeLock();
	
			/***** DOM-manipulointi *****/
			document.body.classList.add( "running" );
			Array.prototype.slice.call( training_form.querySelectorAll( "input, select" ), 0 ).forEach( elem => ( elem.disabled = true ));
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

