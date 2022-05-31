import { memo, useCallback, createContext, useContext, useEffect, useRef, useState } from 'react';

import { hit_sets_keys, hit_sets_titles } from '../sets';

import { Container, Row, Col, Form, Button } from 'react-bootstrap';
//import { useSettings } from '../settings';

import Settings from '../classes/Settings';

const default_settings = {
	timeout_time_seconds: 120,
	sentences_timeout_seconds: 2.5,
	sentences_min_length: 1,
	sentences_max_length: 3,
	sets: [ ...hit_sets_keys ]
};

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

	const id = "settings_form__" + name;

	return (
		<Form.Group as={Row} className="mb-3">
			<Form.Label column={true} md={4} htmlFor={id}>{label}</Form.Label>
			<Col md={8}>
				<Form.Control id={id} value={settings[ name ] || ""} onChange={onChange} type="number" id={"settings_form__" + name} name={name} min={min || "0"} max={max} step={step || "1"} />
			</Col>
		</Form.Group>
	);
});

const SettingsFormMultiselectInputRow = memo(function SettingsFormMultiselectInputRow({ onChange, label, name, options }) {

	const { settings } = useContext( SettingsContext );

	const id = "settings_form__" + name;

	const onSelectChange = e => {
		const value = Array.prototype.map.call( e.target.querySelectorAll( "option:checked" ), item => item.value );
		onChange({ target: { name, value } });
	};

	return (
		<Form.Group as={Row} className="mb-3">
			<Form.Label column={true} md={4} htmlFor={id}>{label}</Form.Label>
			<Col md={8}>
				<Form.Select size="md" id={id} name={name} value={settings[ name ] || []} onChange={onSelectChange} multiple>{options}</Form.Select>
			</Col>
		</Form.Group>
	);
});

export default function SettingsForm({ initial_settings, onChange, onSubmit }) {

	const [ settings, setSettings ] = useState( initial_settings );

	const handleSettingChange = useCallback( event => {

		console.log( "handleSettingChange(event)", event );

		const name  = event.target.name;
		const value = event.target.value;

		setSettings( values => ({ ...values, [name]: value }))

		onChange({ ...default_settings, ...validateSettings( settings ) })
	}, [ ]);




	return (
		<SettingsContext.Provider value={{ default_settings, settings }}>
			<Form onSubmit={ evt => onSubmit( evt, validateSettings( settings ))}>
				<SettingsFormNumberInputRow
					label="Harjoituksen kesto, sekunteja"
					onChange={handleSettingChange}
					name="timeout_time_seconds" />
				<SettingsFormNumberInputRow
					label="Sarjojen väli, sekunteja"
					step="0.1"
					onChange={handleSettingChange}
					name="sentences_timeout_seconds" />
				<SettingsFormNumberInputRow
					label="Sarjan minimipituus"
					onChange={handleSettingChange}
					name="sentences_min_length" />
				<SettingsFormNumberInputRow
					label="Sarjan maksimipituus"
					onChange={handleSettingChange}
					name="sentences_max_length" />
				<SettingsFormMultiselectInputRow
					label="Käytettävät sarjakirjastot"
					options={
						hit_sets_keys.map( key => (
							<option key={key} value={key}>{ hit_sets_titles[key] || key }</option>
						))
					}
					onChange={handleSettingChange}
					name="sets" />

				<Row>
					<Col>
						<Button className="float-end" type="submit">Aloita</Button>
					</Col>
				</Row>
			</Form>
		</SettingsContext.Provider>
	);
}
