(() => {

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

			for (var i = 0; i < count; i++) {

				var idx = parseInt( Math.random() * words.length );
				
				sentence.push( words[idx] );
			}

			if (set == hits_sameside) {
				if (sentence.length > 1) sentence.prefix = "Saman puolen";
			}
			
			return sentence;
		}
	})();

	/******************/

	const valmentaja = new Valmentaja(() => buildSentence( 2, 0 ));

	setTimeout( onload, 100 );

	function onload() {

		var sayer;

		//sayer = new SentenceSayer.HTMLInjector( document.getElementById( "content" ) );
		sayer = new SentenceSayer.SpeechApi();
		//sayer = new SentenceSayer.ConsoleLog();

		valmentaja.setSayer( sayer );

		valmentaja.setSpeed( 2500 ); // 2.5s

		valmentaja.start();
	}
})();

