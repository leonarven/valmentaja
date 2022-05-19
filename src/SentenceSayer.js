(( exports ) => {

	'use strict';

	class SentenceSayer {

		disabled = false;

		static sentenceToString( sentence ) {

			var string = "";
			for (var i = 0; i < sentence.length; i++) {
				string += sentence[ i ];

				if (i == sentence.length - 2) string += " ja ";
				else if (i < sentence.length - 2 ) string += ", ";
			}

			if (sentence.prefix) string = sentence.prefix + " " + string;

			if (string.length > 0) string = string[0].toUpperCase() + string.substr( 1 ) + ".";

			return string;
		}
	}

	class SentenceSayerConsoleLog extends SentenceSayer {

		async say( sentence ) {

			console.log( SentenceSayer.sentenceToString( sentence ));
		}
	}

	class SentenceSayerHTMLInjector extends SentenceSayer {

		constructor( element = document.createElement( "div" ) ) {

			super();

			this.element = element;
		}

		async say( sentence ) {

			var string = SentenceSayer.sentenceToString( sentence );

			this.element.innerHTML = "<span>" + string + "</span>";

		}
	}

	class SentenceSayerSpeechApi extends SentenceSayer {

		rate = 1;

		pitch = 1;

		volume = 1;

		constructor() {

			super();

			var self = this;

			var speech = this.speech = window.speechSynthesis;

			populateVoiceList();

			if (speech.onvoiceschanged !== undefined) {
				speech.onvoiceschanged = () => populateVoiceList();
			}

			function populateVoiceList() {

				self.setVoices( speech.getVoices() );
			}
		}

		setVoices( voices ) {

			this.voices = voices;

			if (voices.length > 0) {

				if (this.voice) {

					var found;

					for (var voice of voices) {
						if (this.voice.name == voice.name) {
							found = voice;
							break;
						}
					}

					this.voice = found || null;
				}

				if (!this.voice) {
					for (var voice of voices) {
						if (voice.lang == "fi-FI") return this.voice = voice;
					}
				}

				if (!this.voice) {
					for (var voice of voices) {
						if (voice.default && voice.lang == "en-GB") return this.voice = voice;
					}
				}

				if (!this.voice) {
					for (var voice of voices) {
						if (voice.lang == "en-GB") return this.voice = voice;
					}
				}

				if (!this.voice) this.voice = voices[0];

			} else {
				this.voice = null;
			}
		}

		async say( sentence ) {

			if (!this.voice) return;

			var string = SentenceSayer.sentenceToString( sentence );
		
			var utterance = new SpeechSynthesisUtterance( string );

			utterance.rate   = this.rate;
			utterance.pitch  = this.pitch;
			utterance.volume = this.volume;
			utterance.voice  = this.voice;

			return new Promise(( resolve, reject ) => {

				utterance.onend = resolve;
				utterance.onerror = reject;
				
				this.speech.speak( utterance );

			}).catch( error => {
				
				console.error( error );

			});
		}
	}

	SentenceSayer.SpeechApi    = SentenceSayerSpeechApi;
	SentenceSayer.ConsoleLog   = SentenceSayerConsoleLog;
	SentenceSayer.HTMLInjector = SentenceSayerHTMLInjector;

	exports.SentenceSayer = SentenceSayer;

})( this );
