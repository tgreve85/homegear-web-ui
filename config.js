
// {{ Global definitions

_colorlightbulbSwitchActive = 'rgb(247, 201, 41)';
_colorlightbulbSwitchInActive = 'rgb(200, 200, 200)';


_elementTypes = {
	knob: 0,
	lightbulbSwitch: 1,
	switchButton: 2,
	slider: 3,
	text: 4,
	chart: 5,
	selector: 6,
	windowSwitch: 7
};

_rooms =  {
	Allgemein: 'Allgemein',
	Esszimmer: 'Esszimmer',
	Wohnzimmer: 'Wohnzimmer',
	Kueche: 'Küche'
};

// icons must be font-awesome-icons.
// you can find them on https://fontawesome.com/icons?d=gallery&m=free
_caterogies = {
	Uebersicht: { name: 'Übersicht', icon: 'fab fa-wpexplorer' },
	Einstellungen: { name: 'Einstellungen', icon: 'fas fa-cog' },
	Beleuchtung: { name: 'Beleuchtung', icon: 'far fa-lightbulb' },
	Heizung: { name: 'Heizung', icon: 'fas fa-fire' },
	Zaehlerstaende: { name: 'Zählerstände', icon: 'fas fa-chart-line' },
	Fensterstatus: { name: 'Fenster', icon: 'fas fa-chalkboard-teacher' }
};	
// }}}


// Peer-Definition has maove to variable-Config.js