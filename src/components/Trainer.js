
import { useState, useEffect } from 'react';

import Valmentaja from '../classes/Valmentaja';
import SentenceSayer from '../classes/SentenceSayer';
import SentenceBuilder from '../classes/SentenceBuilder';

var valmentaja = new Valmentaja();
valmentaja.addSayer( new SentenceSayer.SpeechApi() );
valmentaja.addSayer( new SentenceSayer.ConsoleLog() );

export default function({ settings }) {

	const { sentences_timeout_seconds, sentences_max_length, sentences_min_length, sets } = settings;

	const [ sentenceString, setSentenceString ] = useState();

	useEffect(() => {
		valmentaja.addSayer( new SentenceSayer.Callback(( sentence, string ) => {
			setSentenceString( string );
		}));
	}, [ setSentenceString ])



	useEffect(() => {
		valmentaja.setSpeed( 2500 ); // 2.5s

		if (sentences_timeout_seconds) valmentaja.setSpeed( sentences_timeout_seconds * 1000 );

		/*********/

		var sentenceBuilder = new SentenceBuilder( sentences_max_length, sentences_min_length, sets );

		valmentaja.sentenceGenerator = sentenceBuilder.getGenerator();

		valmentaja.start();

	}, [ settings ])

	return (
		<>
			{sentenceString}
		</>
	)
}
