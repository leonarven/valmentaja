import { memo, useCallback, createContext, useContext, useEffect, useRef, useState } from 'react';

import { hit_sets_keys } from '../sets';

import { Container, Row, Col } from 'react-bootstrap';
//import { useSettings } from '../settings';

const default_settings = {
	timeout_time_seconds: 120,
	sentences_timeout_seconds: 2.5,
	sentences_min_length: 1,
	sentences_max_length: 3,
	sets: [ ...hit_sets_keys ]
};

var original_settings = { ...default_settings };

try {
	var settings = JSON.parse( window.localStorage.getItem( "valmentaja-settings-v1" ) || "{}" );
	console.info( "Loaded settings", settings );
	original_settings = { ...original_settings, ...settings };
} catch (error) { console.error( error ); }

const SettingsContext = createContext();

function validateSettings( settings ) {

	settings.timeout_time_seconds = parseInt( settings.timeout_time_seconds ) || undefined;
	if (!(settings.timeout_time_seconds > 0)) settings.timeout_time_seconds = undefined;

	settings.sentences_timeout_seconds = parseFloat( settings.sentences_timeout_seconds ) || undefined;
	if (!(settings.sentences_timeout_seconds > 0)) settings.sentences_timeout_seconds = undefined;

	settings.sentences_min_length = parseFloat( settings.sentences_min_length ) || undefined;
	if (!(settings.sentences_min_length > 0)) settings.sentences_min_length = undefined;

	settings.sentences_max_length = parseFloat( settings.sentences_max_length ) || undefined;
	if (!(settings.sentences_max_length > 0)) settings.sentences_max_length = undefined;

	return settings;
}

const SettingsFormRowLabel = memo(function SettingsFormRowLabel({ label, id }) {

	return (
		<label htmlFor={id}>{label}</label>
	);
});

const SettingsFormNumberInputRow = memo(function SettingsFormNumberInputRow({ onChange, label, name, min, max, step }) {

	const { settings } = useContext( SettingsContext );

	return (
		<Row>
			<Col>
				<SettingsFormRowLabel id={"settings_form__" + name} label={label} />
			</Col>
			<Col>
				<input className="w-100" value={settings[ name ] || ""} onChange={onChange} type="number" id={"settings_form__" + name} name={name} min={min || "0"} max={max} step={step || "1"} />
			</Col>
		</Row>
	);
});

const SettingsFormMultiselectInputRow = memo(function SettingsFormMultiselectInputRow({ onChange, label, name, options }) {

	const { settings } = useContext( SettingsContext );

	const onSelectChange = e => {
		const value = Array.prototype.map.call( e.target.querySelectorAll( "option:checked" ), item => item.value );
		onChange({ target: { name, value } });
	};

	return (
		<Row>
			<Col>
				<SettingsFormRowLabel id={"settings_form__" + name} label={label} />
			</Col>
			<Col>
				<select className="w-100" id={"settings_form__" + name} name={name} value={settings[ name ] || []} onChange={onSelectChange} multiple>
					{options}
				</select>
			</Col>
		</Row>
	);
});

export default function SettingsForm({ onChange, onSubmit }) {

	var [ settings, setSettings ] = useState( original_settings );

	const handleSettingChange = useCallback( event => {

		console.log( "handleSettingChange(event)", event );

		const name  = event.target.name;
		const value = event.target.value;

		setSettings( values => ({ ...values, [name]: value }))

		onChange({ ...default_settings, ...validateSettings( settings ) })
	}, [ ]);

	return (
		<SettingsContext.Provider value={{ default_settings, settings}}>
			<Container>
				<form id="training-form" onSubmit={ evt => onSubmit( evt, validateSettings( settings ))}>
					<SettingsFormNumberInputRow
						label="timeout_time_seconds"
						onChange={handleSettingChange}
						name="timeout_time_seconds" />
					<SettingsFormNumberInputRow
						label="sentences_timeout_seconds"
						step="0.1"
						onChange={handleSettingChange}
						name="sentences_timeout_seconds" />
					<SettingsFormNumberInputRow
						label="sentences_min_length"
						onChange={handleSettingChange}
						name="sentences_min_length" />
					<SettingsFormNumberInputRow
						label="sentences_max_length"
						onChange={handleSettingChange}
						name="sentences_max_length" />
					<SettingsFormMultiselectInputRow
						label="Sets"
						options={hit_sets_keys.map( key => (<option key={key} value={key}>{key}</option>) )}
						onChange={handleSettingChange}
						name="sets" />
					<div className="row">
						<div className="col-xs-12">
							<input type="submit" style={{'fontSize':'1em'}} value="Aloita!" />
						</div>
					</div>
				</form>
			</Container>
		</SettingsContext.Provider>
	);
}
