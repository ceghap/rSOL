# rSOL

> Remote Sleep-On-LAN 

Lock, Sleep, Start/Stop PlexService.

Currently only support Windows. macOS and Linux will follow later.


## Requirement / Dependencies

```
$ npm i connect serve-static node-arp
```


## Usage
You can navigate to the page using a web browser or simply calling the url using curl. I use this method for my HASS.
```bash
curl http://<ip>:<port>/<function>
```


## API

### /lockwin

Locks the machine.

Throws an `Error` if executing the lock command fails or if the OS is not supported.


### /tdoqla

Put the machine to sleep

Return "OK" or otherwise "KO" should any error occurs.


### /startplex

Start the PlexService

Return "OK" or otherwise "KO" should any error occurs.


### /stopplex

Start the PlexService

Return "OK" or otherwise "KO" should any error occurs.



##  Running as service


### Bundling rSOL.js and run as windows service using nssm

```bash
pkg -t node6-win rSOL.js
```
A bundled exe file will be created. eg. rSOL.exe
Note that pkg@4.4.6 may not generate the binaries. Downgrade it to version 4.3.8.


### Installing as windows service

Using nssm to install rSOL as service

```bash
nssm install rSOL rSOL.exe
```

Check the windows service manager and start the rSOL service.
By default the endpoint would be listening at ```http://127.0.0.1/<function>```

## Related
- [Home Assistant](https://www.home-assistant.io/) - Open-source home automation platform running on Python 3
- [Home Assistant Github](https://github.com/home-assistant/home-assistant) - Home-Assistant Github repo
- [lock-system](https://github.com/sindresorhus/lock-system) - lock-system
- [pkg](https://www.npmjs.com/package/pkg)  - Single-command Node.js binary compiler
- [nssm](http://www.nssm.cc/) - NSSM - the Non-Sucking Service Manager
- [PlexService](https://forums.plex.tv/discussion/93994/pms-as-a-service) - Running Plex Media Server as service

## License

[![WTFPL](http://www.wtfpl.net/wp-content/uploads/2012/12/wtfpl-badge-1.png "WTFPL")](http://www.wtfpl.net/) © [yusri](https://blog.yusri.com.my)
