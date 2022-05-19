(( exports ) => {

	'use strict';

	class Valmentaja {

		running = false;

		timeout_ms = 1000;

		sentenceSayers = [];

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

			if (this.sentenceSayers.length > 0) {

				var prms = [];
				
				for (var sayer of this.sentenceSayers) {

					if (!sayer.disabled) prms.push( sayer.say( sentence ));
				}

				return Promise.all( prms );

			} else {

				console.warn( "No sentenceSayers setted!" );
			}
		}
		
		addSayer( sentenceSayer ) {

			this.sentenceSayers.push( sentenceSayer );
		}

		setSayer( sentenceSayer ) {

			this.sentenceSayers.splice( 0, this.sentenceSayers.length, sentenceSayer );
		}


		setSpeed( timeout_ms ) {

			this.timeout_ms = timeout_ms;
		}
	}

	exports.Valmentaja = Valmentaja;

})( this );
