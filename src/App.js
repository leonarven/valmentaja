import { memo, useCallback, createContext, useContext, useEffect, useRef, useState } from 'react';

import './App.css';

import SettingsForm from './components/SettingsForm.js';
import Trainer      from './components/Trainer.js';

function App() {

	var [ page, setPage ] = useState( "EDITOR" );
	var [ settings, setSettings ] = useState(  );

	const onSettingsChange = settings => {
		setSettings( settings );
	};

	const onSettingsSubmit = useCallback(( event, settings ) => {

		event.preventDefault();

		try {
			window.localStorage.setItem( "valmentaja-settings-v1", JSON.stringify( settings ));
			console.info( "Saved settings", settings );
		} catch (error) { console.error( error ); }
		
		setSettings( settings );

		setPage("TRAINER");

	}, [ ]);



	switch (page) {
		case "TRAINER":
			return (
				<div className="App">
					<Trainer settings={settings} />
				</div>
			);
		case "EDITOR":
			return (
				<div className="App">
					<SettingsForm onChange={onSettingsChange} onSubmit={onSettingsSubmit} />
				</div>
			);
	}
}

export default App;
