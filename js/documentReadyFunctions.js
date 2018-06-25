

$("input[type=checkbox]").switchButton({
	labels_placement: "right",
	width: 100,
	height: 25,
	on_label: 'Ein',
	off_label: 'Aus',
	button_width: 40
});


$(".knobTemperature").knob({
	release: function (value) {
		var id = this.$.attr('id')
		handleKnobValueChange(id, value)
	},
	format: function (value) {
		return value + ' °C';
	}
});

$(".knobPercentage").knob({
	release: function (value) {
		var id = this.$.attr('id')
		handleKnobValueChange(id, value)
	},
	format: function (value) {
		return value + ' %';
	}
});

function handleKnobValueChange(id, value)
{
	if (_initValues)
		return;
	
	for(var i = 0; i < _peerObjects.length; i++)
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


$(".slider").change(function() {
	if (_initValues)
		return;

	var value = Number($(this).val());
	var id = $(this).attr('id');
	$(this).parent().find('output').val(value + " %");
	for(var i = 0; i < _peerObjects.length; i++)
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
});
$(".switchButton").change(function() {
	if (_initValues)
		return;

	var id = $(this).attr('id');
	for(var i = 0; i < _peerObjects.length; i++)
	{
		var peer = _peerObjects[i];
		if (peer.elementid == id)
		{
			if (peer.id == -1) //Systemvariable
				_homegear.invoke("setSystemVariable", peer.variableName, $(this).prop('checked'));
			else
				_homegear.invoke("setValue", null, peer.id, peer.channel, peer.variableName, $(this).prop('checked'));
			return;
		}
	}
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
	for(var i = 0; i < _peerObjects.length; i++)
	{
		var peer = _peerObjects[i];
		if (peer.elementid == id)
		{
			if (peer.id == -1) //Systemvariable
				_homegear.invoke("setSystemVariable", peer.variableName, state);
			else
				_homegear.invoke("setValue", null, peer.id, peer.channel, peer.variableName, state);
			return;
		}
	}
});