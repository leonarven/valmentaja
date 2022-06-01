
import { useState, useEffect, useCallback } from 'react';

import { Container, Navbar, Nav, Button } from 'react-bootstrap';

import SentenceSayer from '../classes/SentenceSayer';
import SentenceBuilder from '../classes/SentenceBuilder';

export default function Tainer({ settings, valmentaja }) {

	const { sentences_timeout_seconds, sentences_max_length, sentences_min_length, sets } = settings;

	const [ sentenceString, setSentenceString ] = useState();

	const [ isRunning, setIsRunning ] = useState( valmentaja.running );

	const refreshIsRunning = useCallback(() => setIsRunning( valmentaja.running ), [ valmentaja, setIsRunning ]);

	const restartValmentaja = useCallback(() => { valmentaja.start(); refreshIsRunning(); }, [ valmentaja, refreshIsRunning ]);
	const stopValmentaja    = useCallback(() => { valmentaja.stop();  refreshIsRunning(); }, [ valmentaja, refreshIsRunning ]);

	useEffect(() => {
		valmentaja.addSayer( new SentenceSayer.Callback(( sentence, string ) => {
			setSentenceString( string );
		}));
	}, [ valmentaja, setSentenceString ]);

	useEffect(() => {
		valmentaja.setSpeed( 2500 ); // 2.5s

		if (sentences_timeout_seconds) valmentaja.setSpeed( sentences_timeout_seconds * 1000 );

		/*********/

		var sentenceBuilder = new SentenceBuilder( sentences_max_length, sentences_min_length, sets );

		valmentaja.sentenceGenerator = sentenceBuilder.getGenerator();

	}, [ valmentaja, refreshIsRunning, sentences_timeout_seconds, sentences_max_length, sentences_min_length, sets ]);

	useEffect(() => {
		refreshIsRunning();
	});
	return (
		<>
			<h1 className="mt-5 text-center">{sentenceString}</h1>
			<Navbar fixed="bottom">
				<Container fluid className="justify-content-center">
					<Nav>{ isRunning ?
						(<Button variant="warning" onClick={stopValmentaja}>Pysäytä ⨯</Button>) :
						(<Button variant="primary" onClick={restartValmentaja}>Aloita!</Button >)
					}</Nav>
				</Container>
			</Navbar>
		</>
	)
}
