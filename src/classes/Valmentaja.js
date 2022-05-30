export default class Valmentaja {

	running = false;

	timeout_ms = 1000;

	sentenceSayers = [];

	constructor( sentenceGenerator ) {

		this.sentenceGenerator = sentenceGenerator;
	}

	start() {

		if (this.running) return;

		console.debug( "Valmentaja.start()" );

		if (!this.sentenceGenerator) return;

		this.running = true;

		this.loop();
	}

	async stop() {

		console.debug( "Valmentaja.stop()" );

		this.running = false;

		for (var sayer of this.sentenceSayers) {

			if (!sayer.disabled) await sayer.say( null );
		}
	}

	async loop() {

		if (!this.running) return;

		console.group( "Valmentaja.loop()" );

		try {

			await this.run();

			setTimeout(() => this.loop(), this.timeout_ms );

		} catch (error) {

			console.error( error );

			await this.stop();
		}

		console.groupEnd( "Valmentaja.loop()" );
	}

	async run() {

		var sentence = this.sentenceGenerator();

		if (!sentence || sentence.length == 0) return;

		await this.say( sentence );
	}

	async say( sentence ) {

		if (this.sentenceSayers.length > 0) {

			console.debug( "Valmentaja.say() ::", sentence );

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
};
