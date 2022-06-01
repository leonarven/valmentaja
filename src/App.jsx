import { useCallback, useState, useEffect } from 'react';

import { Container, Navbar, Nav, Offcanvas } from 'react-bootstrap';

import 'bootstrap/dist/css/bootstrap.min.css';

import './App.css';

import SettingsForm from './components/SettingsForm.js';
import Trainer      from './components/Trainer.js';

import Valmentaja from './classes/Valmentaja';
import SentenceSayer from './classes/SentenceSayer';
import Settings from './classes/Settings';

import { hit_sets_keys } from './sets';


var valmentaja = new Valmentaja();

valmentaja.addSayer( new SentenceSayer.SpeechApi() );
valmentaja.addSayer( new SentenceSayer.ConsoleLog() );

const initial_settings = Settings.load().toJSON();

function App() {

	var [ page, setPage ] = useState( "TRAINER" );
	var [ settings, setSettings ] = useState( initial_settings );
	var [ isEditorOpen, setIsEditorOpen ] = useState( true );

	const onSettingsChange = useCallback( settings => {

		setSettings( settings );

		Settings.saveJSON( settings );

	}, [ setSettings ]);

	const onSettingsSubmit = useCallback(( event, settings ) => {

		event.preventDefault();

		onSettingsChange( settings );

		setPage("TRAINER");
		setIsEditorOpen( false );

		if (!valmentaja.running) valmentaja.start();

	}, [ onSettingsChange, setPage, setIsEditorOpen ]);


	useEffect(() => {
		if (isEditorOpen) {
			if (valmentaja.running) valmentaja.stop();
			valmentaja.say([]);
		}
	}, [ isEditorOpen ]);

	return (
		<>
			<Offcanvas show={isEditorOpen} onHide={() => setIsEditorOpen(false)} placement="end" backdrop="static">
				<Offcanvas.Header>
					<Offcanvas.Title>Asetukset</Offcanvas.Title>
				</Offcanvas.Header>
				<Offcanvas.Body>
					<SettingsForm initial_settings={initial_settings} onChange={onSettingsChange} onSubmit={onSettingsSubmit} />
				</Offcanvas.Body>
			</Offcanvas>

			<Navbar>
				<Container fluid>
					<Navbar.Brand style={{ cursor: 'default' }}>Valmentaja</Navbar.Brand>
					<Nav className="justify-content-end">
						<Nav.Link onClick={() => setIsEditorOpen(true)} style={{lineHeight:'.8em'}}>
							<svg xmlns="http://www.w3.org/2000/svg" style={{width:'1em',height:'1em'}} fill="currentColor" className="bi bi-gear-fill" viewBox="0 0 16 16">
								<path d="M9.405 1.05c-.413-1.4-2.397-1.4-2.81 0l-.1.34a1.464 1.464 0 0 1-2.105.872l-.31-.17c-1.283-.698-2.686.705-1.987 1.987l.169.311c.446.82.023 1.841-.872 2.105l-.34.1c-1.4.413-1.4 2.397 0 2.81l.34.1a1.464 1.464 0 0 1 .872 2.105l-.17.31c-.698 1.283.705 2.686 1.987 1.987l.311-.169a1.464 1.464 0 0 1 2.105.872l.1.34c.413 1.4 2.397 1.4 2.81 0l.1-.34a1.464 1.464 0 0 1 2.105-.872l.31.17c1.283.698 2.686-.705 1.987-1.987l-.169-.311a1.464 1.464 0 0 1 .872-2.105l.34-.1c1.4-.413 1.4-2.397 0-2.81l-.34-.1a1.464 1.464 0 0 1-.872-2.105l.17-.31c.698-1.283-.705-2.686-1.987-1.987l-.311.169a1.464 1.464 0 0 1-2.105-.872l-.1-.34zM8 10.93a2.929 2.929 0 1 1 0-5.86 2.929 2.929 0 0 1 0 5.858z"/>
							</svg>
						</Nav.Link>
					</Nav>
				</Container>
			</Navbar>
			<div className="App">
				<Container>{
					page == "TRAINER" ? (
						<Trainer settings={settings} valmentaja={valmentaja} />
					) : (
						<h1>404</h1>
					)
				}</Container>
			</div>
		</>
	);
}

export default App;
