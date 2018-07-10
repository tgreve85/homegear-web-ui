# homegear-web-ui


This is a websocket-based visualization for homegear.

just clone it into `/var/lib/homegear/www/rpc`
```
cd /var/lib/homegear/www/rpc
git clone https://github.com/tgreve85/homegear-web-ui.git
```

and set up your devices in the `/var/lib/homegear/www/rpc/homegear-web-ui/config.js` as described.


The login-credentials are the same as in homegear

(default: homegear:homegear)


To configure the rooms and categories, edit the config.js:
```
nano /var/lib/homegear/www/rpc/homegear-web-ui/config.js
```

To configure the ui-elements, edit the variableConfig.js:
```
nano /var/lib/homegear/www/rpc/homegear-web-ui/variableConfig.js
```


After you have completed your setup in config.js and variableConfig, you can reach your web-ui under:

https://homegear-ip:2002/homegear-web-ui

And this is how it looks like:

![homegear-web-ui-screenshot](https://forum.homegear.eu/uploads/default/optimized/1X/353c82ae7584557d6c137446801561ae34f52eb3_1_549x499.PNG)


At this time, only one chart is working!
