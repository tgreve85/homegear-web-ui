

$(".switchButton").switchButton({
	labels_placement: "right",
	width: '100%',
	height: 34,
	show_labels: false,
	on_label: 'Ein',
	off_label: 'Aus',
	button_width: '40%'
});


$(".knobTemperature").knob({
	release: function (value) {
		var id = this.$.attr('id')
		setUiControl(id, value)
	},
	format: function (value) {
		return value + ' °C';
	}
});

$(".knobPercentage").knob({
	release: function (value) {
		var id = this.$.attr('id')
		setUiControl(id, value)
	},
	format: function (value) {
		return value + ' %';
	}
});


$(".slider").change(function() {
	var value = Number($(this).val());
	var id = $(this).attr('id');
	$(this).parent().find('output').val(value + " %");
	setUiControl(id, value);
});


$(".switchButton").change(function() {
	var id = $(this).attr('id');
	setUiControl(id, $(this).prop('checked'));
});

		
$('.lightbulbSwitch').on('click', '[data-fa-i2svg]', function () {
	var id = $(this).attr('id');
	var color = $(this).css('color');
	var state = false;
	if (color != _colorlightbulbSwitchActive)
	{
		$(this).css('color', _colorlightbulbSwitchActive);
		state = true;
	}
	else
	{
		$(this).css('color', _colorlightbulbSwitchInActive);
	}
	setUiControl(id, state);
});

$(".valueselector").change(function() {
	var id = $(this).attr('id');
	var value = $(this).val();
	setUiControl(id, value);
});


function setUiControl(id, value)
{
	if (_initValues)
		return;
	
	for (var i = 0; i < _peerObjects.length; i++)
	{
		var peer = _peerObjects[i];
		if (peer.elementid == id)
		{
			if (peer.id == -1) //Systemvariable
				_homegear.invoke("setSystemVariable", peer.variableName, value);
			else
				_homegear.invoke("setValue", null, peer.id, peer.channel, peer.variableName, value);
			return;
		}
	}
}


