
function createRooms()
{
	var html = "";
	$.each(_rooms, function( key, value ) {
		html += '<div class="panel panel-warning"> \
			<div class="panel-heading"> \
				<b style="color: #000; font-size:1.5em;">' + value + '</b> \
			</div> \
			<div class="panel-body"> \
				<ul class="nav nav-tabs">';
		var categories = [];
		for(var i = 0; i < _peerObjects.length; i++)
		{
			var peer = _peerObjects[i];
			_peerObjects[i].elementid = peer.variableName + '-' + peer.channel + '-' + peer.id;
			if (peer.valueMin === undefined)
				_peerObjects[i].valueMin = 0;
			
			if (peer.valueMax === undefined)
				_peerObjects[i].valueMax = 100;
			
			if (peer.valueStep === undefined)
				_peerObjects[i].valueStep = 1;
			
			if (peer.readOnly === undefined)
				_peerObjects[i].readOnly = false;
			
			if (peer.valueDimension === undefined)
				_peerObjects[i].valueDimension = '';
			
			if (peer.decimalPoints === undefined)
				_peerObjects[i].decimalPoints = 0;
			
			if ((peer.room == value) && (categories.indexOf(peer.category.name) == -1))
			{
				html += '<li ' + (categories.length == 0 ? 'class="active"' : '') + '> <a href="#' + key + peer.category.name + '" data-toggle="tab"><span class="glyphicon ' + peer.category.icon + '"></span> ' + peer.category.name + '</a></li>';
				categories.push(peer.category.name);
			}
		}
		html += '</ul> \
				<div class="tab-content clearfix">';
		for(var i = 0; i < categories.length; i++)
		{
			html += '<div class="tab-pane ' + (i == 0 ? 'active' : '') + '" id="' + key + categories[i] + '"> \
						<br /> \
						<div class="row">';
			for(var x = 0; x < _peerObjects.length; x++)
			{
				var peer = _peerObjects[x];
				if ((peer.room == value) && (peer.category.name == categories[i]))
				{
					if (peer.elementType == _elementTypes.slider)
					{
						html += '<div class="col-sm-6"> \
									<label for="' + peer.elementid + '">' + peer.name + ':</label> \
									<div class="range"> \
										<input type="range" class="slider" id="' + peer.elementid + '" min="' + peer.valueMin + '" max="' + peer.valueMax + '" value="0"> \
										<output>0</output> \
									</div> \
								</div>';
					}
					else if (peer.elementType == _elementTypes.switchButton)
					{
						html += '<div class="col-sm-3"> \
									<div class="form-group buttonSwitch"> \
										<label for="' + peer.elementid + '">' + peer.name + ':</label><br /> \
										<input id="' + peer.elementid + '" class="switchButton" type="checkbox" /> \
									</div> \
								</div>';
					}
					else if (peer.elementType == _elementTypes.knob)
					{
						html += '<div class="col-sm-6"> \
									<div class="form-group text-center"> \
										<label for="' + peer.elementid + '">' + peer.name + ':</label><br /> \
										<input id="' + peer.elementid + '" class="' + (peer.valueDimension == '%' ? 'knobPercentage' : 'knobTemperature' )+ '" data-width="200" data-height="120" data-min="' + peer.valueMin + '" data-max="' + peer.valueMax + '" data-step="' + peer.valueStep + '" data-angleOffset="-90" data-angleArc="180" data-displayPrevious="true" data-cursor="true" data-fgColor="' + (peer.readOnly ? '#87ceeb' : '#f89406' )+ '" data-readOnly="' + (peer.readOnly ? 'true' : 'false' )+ '" /> \
									</div> \
								</div>';
					}
					else if (peer.elementType == _elementTypes.lightbulbSwitch)
					{
						html += '<div class="col-sm-6"> \
									<div class="form-group text-center lightbulbSwitch"> \
										<label for="' + peer.elementid + '">' + peer.name + ':</label><br /> \
										<i id="' + peer.elementid + '" class="far fa-lightbulb fa-8x" style="cursor: pointer;"></i> \
									</div> \
								</div>';
					}
					else if (peer.elementType == _elementTypes.text)
					{
						html += '<div class="col-sm-3"> \
									<div class="form-group buttonSwitch"> \
										<label for="' + peer.elementid + '">' + peer.name + ':</label><br /> \
										<span id="' + peer.elementid + '" data-suffix=" ' + peer.valueDimension + '" data-decimals="' + peer.decimalPoints + '"></span> \
									</div> \
								</div>';
					}
					else if (peer.elementType == _elementTypes.chart)
					{
						html += '<div class="col-sm-6"> \
									<div class="form-group"> \
										<div id="' + peer.elementid + '" style="width: 100%; height: 300px;"></div> \
									</div> \
								</div>';
					}
					else
					{
					}
				}
			}
			html += '	</div> \
					</div>';
		}
		html += '	</div> \
				</div> \
				</div>';
	});
	html += '<br /> \
	<br /> \
	<div class="panel panel-primary"> \
		<div class="panel-heading"> \
			Console-Log \
		</div> \
		<div class="panel-body"> \
			<pre id="log"></pre> \
		</div> \
	</div> \
	<footer> \
		<p>&copy; 2014-2015 Homegear UG</p> \
	</footer>';
	$('#mainContainer').html(html);
}


function handleHomegearValueChanged(peer, variableValue)
{
	if (peer.elementType == _elementTypes.slider)
	{
		$("#" + peer.elementid).val(variableValue);
		$("#" + peer.elementid).parent().find('output').val(variableValue + " %");
	}
	else if (peer.elementType == _elementTypes.switchButton)
		$("#" + peer.elementid).switchButton({ checked: variableValue });
	else if (peer.elementType == _elementTypes.knob)
		$("#" + peer.elementid).val(variableValue).trigger('change');
	else if (peer.elementType == _elementTypes.lightbulbSwitch)
	{
		if (variableValue)
			$("#" + peer.elementid).css('color', _colorlightbulbSwitchActive);
		else
			$("#" + peer.elementid).css('color', _colorlightbulbSwitchInActive);
	}
	else if (peer.elementType == _elementTypes.text)
	{
		var suffix = $("#" + peer.elementid).data("suffix");
		var decimals = $("#" + peer.elementid).data("decimals");
		
		if (decimals !== undefined)
			variableValue = variableValue.toFixed(Number(decimals));;
		if (suffix !== undefined)
			variableValue += suffix;
		$("#" + peer.elementid).text(variableValue);
	}
	else
		$("#" + peer.elementid).val(variableValue);
}



function updateLegendLabel()
{
	var chrt = !this.chart ? this : this.chart;
	chrt.update({
		legend: {
			labelFormatter: function() {
				var lastVal = this.yData[this.yData.length - 1],
				chart = this.chart,
				xAxis = this.xAxis,
				points = this.points,
				avg = 0,
				counter = 0,
				min, max;

				points.forEach(function(point, inx) {
					if (!min || min > point.y) {
						min = point.y;
					}

					if (!max || max < point.y) {
						max = point.y;
					}

					counter++;
					avg += point.y;
				});

				counter--;
				avg /= counter;
				var dimension = this.userOptions.dimension;
				var decimals = Number(this.userOptions.decimals);
				if (min === undefined)
					min = 0;
				if (max === undefined)
					max = 0;
				return '<table style="border:none;"><tr><th colspan="2">' + this.name + '</th></tr> \
						<tr style="font-size:0.8em;"><td style="padding-right: 5px;">Min:</td><td style="text-align:right;">' + Number(min).toFixed(decimals) + ' ' + dimension + '</td></tr> \
						<tr style="font-size:0.8em;"><td style="padding-right: 5px;">Max:</td><td style="text-align:right;">' + Number(max).toFixed(decimals) + ' ' + dimension + '</td></tr> \
						<tr style="font-size:0.8em;"><td style="padding-right: 5px;">Avg:</td><td style="text-align:right;">' + avg.toFixed(decimals) + ' ' + dimension + '</td></tr>';
			}
		}
	});
}

function getdatum(date = new Date())
{
	var d = date.getDate();
	if (d < 10)
	d = "0" + d;
	var m = parseInt(date.getMonth() +1);
	if (m < 10)
	m = "0" + m;
	var y = date.getFullYear();
	var h = date.getHours();
	if (h < 10)
	h = "0" + h;
	var i = date.getMinutes();
	if (i < 10)
	i = "0" + i;
	var s = date.getSeconds();
	if (s < 10)
	s = "0" + s;
	var datum = d + "." + m + "." + y + " " + h + ":" + i + ":" + s;

	return datum;
}