(( exports ) => {

	'use strict';

	class Valmentaja {

		running = false;

		timeout_ms = 1000;

		constructor( sentenceGenerator ) {

			this.sentenceGenerator = sentenceGenerator;
		}

		start() {

			if (!this.sentenceGenerator) return;

			this.running = true;

			this.loop();
		}

		stop() {

			this.running = false;
		}

		async loop() {

			if (!this.running) return;

			try {

				await this.run();

				setTimeout(() => this.loop(), this.timeout_ms );

			} catch (error) {

				console.error( error );

				this.stop();
			}
		}

		async run() {

			var sentence = this.sentenceGenerator();

			if (!sentence || sentence.length == 0) return;

			await this.say( sentence );
		}

		async say( sentence ) {

			console.debug( SentenceSayer.sentenceToString( sentence ));

			if (this.sentenceSayer) {

				this.sentenceSayer.say( sentence );

			} else {

				console.error( new Error( "No sentenceSayer setted!" ));
			}
		}

		setSayer( sentenceSayer ) {

			this.sentenceSayer = sentenceSayer;
		}


		setSpeed( timeout_ms ) {

			this.timeout_ms = timeout_ms;
		}
	}

	exports.Valmentaja = Valmentaja;

})( this );
