
// {{ Global definitions

_colorlightbulbSwitchActive = 'rgb(247, 201, 41)';
_colorlightbulbSwitchInActive = 'rgb(200, 200, 200)';


_elementTypes = { knob: 0, lightbulbSwitch: 1, switchButton: 2, slider: 3, text: 4, chart: 5 };
_rooms =  { Allgemein: 'Allgemein', Esszimmer: 'Esszimmer', Wohnzimmer: 'Wohnzimmer', Kueche: 'Küche' };
_caterogies = {
		Uebersicht: { name: 'Übersicht', icon: 'glyphicon-info-sign' },
		Einstellungen: { name: 'Einstellungen', icon: 'glyphicon-cog' },
		Beleuchtung: { name: 'Beleuchtung', icon: 'glyphicon-lamp' },
		Heizung: { name: 'Heizung', icon: 'glyphicon-dashboard' }
	};
	
// }}}


// {{{ Peer-Definition
/*
Peers were displayed in the ui in defined order

needed parameters for peers:
	name:			(String)	remark that is shown as label before the element
	id:				(Integer)	peer-ID from homegear (0 for Systemvariables)
	channel:		(Integer)	peer-Channel from homegear (-1 for Systemvariables)
	variableName:	(String)	variablename from device
	elementType:	(Integer)	what kind of element. Selected from _elementTypes
	room:			(Integer)	in which room is the element. Selected from _rooms
	category:		(Integer)	in which room is the element. Selected from _caterogies

optional parameters for peers:
	valueMin:		(Int/Float)	minimum scale of the value						(Default: 0)
	valueMax:		(Int/Float)	maximum scale of the value						(Default: 100)
	valueStep:		(Int/Float)	step of the value								(Default: 1)
	readOnly:		(Boolean)	shall the value be editable or just displayed	(Default: false)
	valueDimension:	(String)	the Dimension of the value.						(Default: '')
	decimalPoints:	(Integer)	the decimalplaces of the value.					(Default: 0)
*/





// {{{ Übersicht
_peerObjects.push({
	name: 'Eco-Mode',
	id: 0,
	channel: -1,
	variableName: 'EcoMode',
	elementType: _elementTypes.switchButton,
	room: _rooms.Allgemein,
	category: _caterogies.Uebersicht
});

_peerObjects.push({
	name: 'Akt. Leistung',
	id: 0,
	channel: -1,
	variableName: 'WirkleistungEinspeisung',
	elementType: _elementTypes.text,
	room: _rooms.Allgemein,
	category: _caterogies.Uebersicht,
	readOnly: true,
	valueDimension: 'W'
});

_peerObjects.push({
	name: 'Außentemperatur',
	id: 67,
	channel: 1,
	variableName: 'TEMPERATURE',
	elementType: _elementTypes.text,
	room: _rooms.Allgemein,
	category: _caterogies.Uebersicht,
	readOnly: true,
	valueDimension: '°C',
	decimalPoints: 1
});

_peerObjects.push({
	name: 'AußenLuftfeuchte',
	id: 67,
	channel: 1,
	variableName:
	'HUMIDITY',
	elementType: _elementTypes.text,
	room: _rooms.Allgemein,
	category: _caterogies.Uebersicht,
	readOnly: true,
	valueDimension: '%'
});

_peerObjects.push({
	name: 'Wirkleistung Einspeisung',
	id: 0,
	channel: -1,
	variableName: 'WirkleistungEinspeisungChart',
	elementType: _elementTypes.chart,
	room: _rooms.Allgemein,
	category: _caterogies.Uebersicht,
	readOnly: true,
	valueDimension: 'W'
});

// Übersicht }}}




// {{{ Esszimmer
_peerObjects.push({
	name: 'Helligkeit Deckenlampe',
	id: 29,
	channel: 1,
	variableName: 'LEVEL',
	elementType: _elementTypes.knob,
	room: _rooms.Esszimmer,
	category: _caterogies.Beleuchtung,
	valueDimension: '%'
});
	
_peerObjects.push({
	name: 'Helligkeit Nanoleaf',
	id: 87,
	channel: 1,
	variableName: 'BRIGHTNESS',
	elementType: _elementTypes.knob,
	room: _rooms.Esszimmer,
	category: _caterogies.Beleuchtung,
	valueDimension: '%'
});

// Esszimmer }}}




// {{{ Wohnzimmer
_peerObjects.push({
	name: 'Helligkeit Stehlampe',
	id: 63,
	channel: 1,
	variableName: 'LEVEL',
	elementType: _elementTypes.knob,
	room: _rooms.Wohnzimmer,
	category: _caterogies.Beleuchtung,
	valueDimension: '%'
});

_peerObjects.push({
	name: 'Deckenlampe',
	id: 12,
	channel: 2,
	variableName: 'STATE',
	elementType: _elementTypes.lightbulbSwitch,
	room: _rooms.Wohnzimmer,
	category: _caterogies.Beleuchtung,
	valueDimension: '%'
});

_peerObjects.push({
	name: 'Temperatur',
	id: 14,
	channel: 2,
	variableName: 'ACTUAL_TEMPERATURE',
	elementType: _elementTypes.knob,
	room: _rooms.Wohnzimmer,
	category: _caterogies.Heizung,
	valueMin: 4.5,
	valueMax: 30,
	valueStep: 0.1,
	readOnly: true,
	valueDimension: '°C',
	decimalPoints: 1
});

_peerObjects.push({
	name: 'Luftfeuchte',
	id: 14,
	channel: 1,
	variableName: 'HUMIDITY',
	elementType: _elementTypes.knob,
	room: _rooms.Wohnzimmer,
	category: _caterogies.Heizung,
	readOnly: true,
	valueDimension: '%'
});

_peerObjects.push({
	name: 'Temperatur Soll',
	id: 14,
	channel: 2,
	variableName: 'SET_TEMPERATURE',
	elementType: _elementTypes.knob,
	room: _rooms.Wohnzimmer,
	category: _caterogies.Einstellungen,
	valueMin: 4.5,
	valueMax: 30,
	valueStep: 0.5,
	valueDimension: '°C',
	decimalPoints: 1
	});

// Wohnzimmer }}}


	
// {{{ Küche

_peerObjects.push({
	name: 'Helligkeit Gang',
	id: 27,
	channel: 1,
	variableName: 'LEVEL',
	elementType: _elementTypes.slider,
	room: _rooms.Kueche,
	category: _caterogies.Beleuchtung,
	valueDimension: '%'
});

_peerObjects.push({
	name: 'Helligkeit Spüle',
	id: 26,
	channel: 1,
	variableName: 'LEVEL',
	elementType: _elementTypes.slider,
	room: _rooms.Kueche,
	category: _caterogies.Beleuchtung,
	valueDimension: '%'
});

_peerObjects.push({
	name: 'Helligkeit Arbeitsplatte',
	id: 30,
	channel: 1,
	variableName: 'BRIGHTNESS',
	elementType: _elementTypes.slider,
	room: _rooms.Kueche,
	category: _caterogies.Beleuchtung,
	valueMax: 255,
	valueDimension: '%'
});

_peerObjects.push({
	name: 'Temperatur',
	id: 44,
	channel: 2,
	variableName: 'ACTUAL_TEMPERATURE',
	elementType: _elementTypes.knob,
	room: _rooms.Kueche,
	category: _caterogies.Heizung,
	valueMin: 4.5,
	valueMax: 30,
	valueStep: 0.1,
	readOnly: true,
	valueDimension: '°C',
	decimalPoints: 1
});

_peerObjects.push({
	name: 'Luftfeuchte',
	id: 44,
	channel: 1,
	variableName: 'HUMIDITY',
	elementType: _elementTypes.knob,
	room: _rooms.Kueche,
	category: _caterogies.Heizung,
	readOnly: true,
	valueDimension: '%'
});

_peerObjects.push({
	name: 'Temperatur Soll',
	id: 44,
	channel: 2,
	variableName: 'SET_TEMPERATURE',
	elementType: _elementTypes.knob,
	room: _rooms.Kueche,
	category: _caterogies.Einstellungen,
	valueMin: 4.5,
	valueMax: 30,
	valueStep: 0.5,
	valueDimension: '°C'
});

// Küche }}}
