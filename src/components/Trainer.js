
import { useState, useEffect } from 'react';

import Valmentaja from '../classes/Valmentaja';
import SentenceSayer from '../classes/SentenceSayer';
import SentenceBuilder from '../classes/SentenceBuilder';

var valmentaja = new Valmentaja();

export default function({ settings }) {

	const { sentences_timeout_seconds, sentences_max_length, sentences_min_length, sets } = settings;


	useEffect(() => {

		//valmentaja.addSayer( new SentenceSayer.HTMLInjector( document.getElementById( "text" ) ));
		valmentaja.addSayer( new SentenceSayer.SpeechApi() );
		valmentaja.addSayer( new SentenceSayer.ConsoleLog() );

		valmentaja.setSpeed( 2500 ); // 2.5s

		if (sentences_timeout_seconds) valmentaja.setSpeed( sentences_timeout_seconds * 1000 );

		/*********/

		var sentenceBuilder = new SentenceBuilder( sentences_max_length, sentences_min_length, sets );

		valmentaja.sentenceGenerator = sentenceBuilder.getGenerator();

		valmentaja.start();
	}, [ settings ])


	var [ count, setCount ] = useState(0);

	var json = JSON.stringify( settings );

	setTimeout(() => {
		setCount( count + 1 );
	}, 1000 );

	return (
		<>
			{count}
			<br />
			{json}
		</>
	)
}
