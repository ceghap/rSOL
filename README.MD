# rSOL

> Remote Sleep your machine 

Lock, Sleep, Start/Stop PlexService.

Currently only support Windows. macOS and Linux will follow later.


## requirement / dependencies

```
$ npm i connect serve-static
```


## Usage

```bash
curl http://<ip>:<port>/<function>
```


## API

### lockwin

Locks the machine.

Throws an `Error` if executing the lock command fails or if the OS is not supported.


### startplex

Start the PlexService

Return "OK" or otherwise "KO" should any error occurs.


### stopplex

Start the PlexService

Return "OK" or otherwise "KO" should any error occurs.


## Related
- [lock-system](https://github.com/sindresorhus/lock-system) - lock-system


## License

[![WTFPL](http://www.wtfpl.net/wp-content/uploads/2012/12/wtfpl-badge-1.png "WTFPL")](http://www.wtfpl.net/) © [yusri](https://blog.yusri.com.my)
