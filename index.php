<?php
require_once("user.php");

function ipIsV6($ip) : int
{
	return strpos($ip, ':') !== false;
}

function clientInPrivateNet() : bool
{
	if(substr($_SERVER['REMOTE_ADDR'], 0, 7) == '::ffff:' && strpos($_SERVER['REMOTE_ADDR'], '.') !== false) $_SERVER['REMOTE_ADDR'] = substr($_SERVER['REMOTE_ADDR'], 7);

	if(ipIsV6($_SERVER['REMOTE_ADDR']))
	{
		$ip6 = substr($_SERVER['REMOTE_ADDR'], 0, 6);
		$ip2 = substr($ip6, 0, 2);

		return $ip6 == 'fe80::' || $ip2 == 'fc' || $ip2 == 'fd';
	}
	else
	{
	    $clientIp = ip2long($_SERVER['REMOTE_ADDR']);
	    $bcast10 = ip2long('255.0.0.0');
	    $nmask10 = ip2long('10.0.0.0');
	    $bcast172 = ip2long('255.240.0.0');
	    $nmask172 = ip2long('172.16.0.0');
	    $bcast192 = ip2long('255.255.0.0');
	    $nmask192 = ip2long('192.168.0.0');
	    return (($clientIp & $bcast10) == $nmask10) || (($clientIp & $bcast172) == $nmask172) || (($clientIp & $bcast192) == $nmask192);
	}
}

if((!isset($_SERVER['HTTPS']) || $_SERVER['HTTPS'] != "on") && !clientInPrivateNet()) die('unauthorized');

$user = new User();
if (clientInPrivateNet())
{
	$_SESSION["authorized"] = true;
	$_SESSION["user"] = "homegear";
}
if(!$user->checkAuth(true)) die();

?>
<!DOCTYPE html>
<html lang="en">
	<head>
		<meta charset="utf-8">
		<meta http-equiv="X-UA-Compatible" content="IE=edge">
		<meta name="viewport" content="width=device-width, initial-scale=1">
		<meta name="description" content="">
		<meta name="author" content="">
		<title>Homegear - SmartHome</title>
		<!--link href="bootstrap/css/bootstrap.min.css" rel="stylesheet"-->
		<link href="bootstrap/css/theme.min.css" rel="stylesheet">
		<link href="css/bootstrap.range.slider.css" rel="stylesheet">
		<link href="css/jquery-ui.min.css" rel="stylesheet">
		<link href="css/index.css" rel="stylesheet">
		<link href="css/jquery.switchButton.css" rel="stylesheet">
		<script type="text/javascript" src="js/homegear-ws-1.0.0.min.js"></script>
		<script type="text/javascript" src="js/jquery.2.1.4.min.js"></script>
		<script type="text/javascript" src="js/jquery-ui.min.js"></script>
		<script type="text/javascript" src="js/jquery.switchButton.js"></script>
		<script type="text/javascript" src="js/highcharts/stock/highstock.js"></script>
		<script type="text/javascript" src="js/highcharts/maps/modules/map.js"></script>
		<!--script type="text/javascript" src="https://code.highcharts.com/stock/modules/exporting.js"></script-->
		<script type="text/javascript" src="js/highcharts/theme.js"></script>
		</script><!--[if IE]><script type="text/javascript" src="js/excanvas.js"></script><![endif]-->
		<script src="js/jquery.knob.min.js"></script>
		<script defer src="fontawesome-free-5.1.0-web/js/all.js"></script>
		<script type="text/javascript">
			var _homegear;
			var _initValues = true;
			var _charts = [];
			var _WirkleistungEinspeisungChart;
			var _highchartsTimezoneOffset = <?php print (-1 * (timezone_offset_get(new DateTimeZone("Europe/Berlin"), new DateTime("now")) / 60)); ?>;
			
			var _colorlightbulbSwitchActive = 'rgb(247, 201, 41)';
			var _colorlightbulbSwitchInActive = 'rgb(200, 200, 200)';
			
			
			var _elementTypes = { };
			var _rooms =  { };
			var _caterogies = { };
			
			// {{{ Peer-Definition

			var _peerObjects = [];
			<?php
			include("config.js");
			include("js/functions.js");
			?>
			
			
			function readCookie(key)
			{
			    var result;
			    return (result = new RegExp('(?:^|; )' + encodeURIComponent(key) + '=([^;]*)').exec(document.cookie)) ? (result[1]) : null;
			}

			
			function homegearReady()
			{
				$('.hg-alert-socket-error').remove();
				_homegear.invoke("setLanguage", null, "en-US");
				var peerIds = [];
				var params = [];
				for(var i = 0; i < _peerObjects.length; i++)
				{
					var peer = _peerObjects[i];
					if (peerIds.indexOf(peer.id) == -1)
						peerIds.push(peer.id);
					params.push({ methodName: 'getValue', params: [peer.id, peer.channel, peer.variableName] });
				}
				_homegear.addPeers(peerIds);
				$('#log').html("Added peers: " + peerIds);

				_homegear.invoke("system.multicall", function(message) {
					for(var i = 0; i < message.result.length; i++)
					{
						var peer = _peerObjects[i];
						var variableValue = message.result[i];

						handleHomegearValueChanged(peer, variableValue);
					}
					setInterval("$('#uhrzeit').text(getdatum());", 1000);
					homegearReadyPostprocesses();
					_initValues = false;
				}, params);
				
				
			}
			
			function homegearEvent(message)
			{
				$('#log').html(JSON.stringify(message, null, '\t'));
				var peerId = message["params"][1];
				var channel = message["params"][2];
				var variableName = message["params"][3];
				var variableValue = message["params"][4];

				for(var i = 0; i < _peerObjects.length; i++)
				{
					var peer = _peerObjects[i];
					if ((peerId == peer.id) && (channel == peer.channel) && (variableName == peer.variableName))
					{
						handleHomegearValueChanged(peer, variableValue);
						return;
					}
				}
			}

			$(document).ready(function() {
				
				createRooms();
				
				<?php
				include("js/documentReadyFunctions.js");
				?>
				
				
				var ssl = window.location.protocol == "https:" ? true : false;
				var server = window.location.host.substring(0, window.location.host.lastIndexOf(":"));
				var port = '80';
				if((window.location.host.indexOf("]") != -1 && window.location.host.lastIndexOf(":") > window.location.host.indexOf("]")) || (window.location.host.indexOf("]") == -1 && window.location.host.indexOf(":") != -1)) {
					port = window.location.host.substring(window.location.host.lastIndexOf(":") + 1, window.location.host.length);
				} else if(ssl) {
					port = '443';
				}
				var sessionId = readCookie('PHPSESSID');
				_homegear = new HomegearWS(server, port, 'homegearApp', ssl, sessionId, '', true);
				_homegear.ready(homegearReady);
				_homegear.log = false;
				_homegear.error(function(message) {
					if(!message) return;
					$('.hg-alert-socket-error').remove();
					var errorDiv = $('<div class="hg-alert alert alert-danger alert-dismissible hg-alert-socket-error" role="alert"><button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button>' + message + '</div>');
					$("body").append(errorDiv);
				});
				_homegear.event(homegearEvent);
				_homegear.connect();
			});
		</script>
	</head>
	<body style="height: 100%">
		<nav class="navbar">
			<div class="container">
				<div class="navbar-header">
					<button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar" aria-expanded="false" aria-controls="navbar">
						<span class="sr-only">Menu</span>
						<span class="icon-bar"></span>
						<span class="icon-bar"></span>
						<span class="icon-bar"></span>
					</button>
					<a class="navbar-brand" href="#">Homegear</a>
				</div>
				<div id="navbar" class="navbar-collapse collapse">
					<ul class="nav navbar-nav">
						<li class="active"><a href="#">Home</a></li>
					</ul>
					<div id="uhrzeit" class="pull-right" style="font-size: 24px; margin-top: 8px; margin-left: 10px;">
						<i class="fas fa-spinner fa-pulse"></i> <i>loading...</i>
					</div>
				</div>
			</div>
		</nav>
		<div class="container" role="main" id="mainContainer">

		</div>
		<script type="text/javascript" src="bootstrap/js/bootstrap.min.js"></script>
	</body>
</html>
