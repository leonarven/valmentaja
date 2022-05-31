import { hit_sets_keys } from '../sets';

export default class Settings {

	static default_settings = {
		timeout_time_seconds: 120,
		sentences_timeout_seconds: 2.5,
		sentences_min_length: 1,
		sentences_max_length: 3,
		sets: [ ...hit_sets_keys ]
	};

	static keys = [ "timeout_time_seconds", "sentences_timeout_seconds", "sentences_min_length", "sentences_max_length", "sets" ];

	constructor( settings = {} ) {

		settings = { ...Settings.default_settings, ...settings };

		for (var key of Settings.keys) {
			if (typeof settings != "undefined") {
				this[ key ] = settings[ key ]
			}
		}
	}

	toJSON() {
		return Settings.keys.reduce(( settings, key ) => {
			settings[key] = this[ key ];
			return settings;
		}, { });
	}

	static load() {
		return new Settings( Settings.loadJSON() );
	}

	static loadJSON() {
		try {
			var json = JSON.parse( window.localStorage.getItem( "valmentaja-settings-v1" ) || "{}" );
			console.info( "Settings.loadJSON() :: json =", json );
			return json;
		} catch (error) {
			console.error( error );
		}
	}

	static save( json ) {

		if (json instanceof Settings) json = json.toJSON();

		Settings.saveJSON( json );
	}

	static saveJSON( json = null ) {
		try {
			window.localStorage.setItem( "valmentaja-settings-v1", JSON.stringify( json ));
			console.info( "Settings.saveJSON() :: json =", json );
		} catch (error) {
			console.error( error );
		}
	}
}
