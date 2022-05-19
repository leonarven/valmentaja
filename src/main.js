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

	setTimeout( onload, 100 );

	function onload() {

		valmentaja.addSayer( new SentenceSayer.HTMLInjector( document.getElementById( "text" )));
		valmentaja.addSayer( new SentenceSayer.SpeechApi() );
		valmentaja.addSayer( new SentenceSayer.ConsoleLog() );

		valmentaja.setSpeed( 2500 ); // 2.5s

		valmentaja.start();
	}
})();

