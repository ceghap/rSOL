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


### startPlex

Start the PlexService

Return "OK" or otherwise "KO" should any error occurs.


### stopPlex

Start the PlexService

Return "OK" or otherwise "KO" should any error occurs.


## Related

- [lock-cli](https://github.com/sindresorhus/lock-cli) - CLI for this module
- [alfred-lock](https://github.com/sindresorhus/alfred-lock) - Alfred workflow


## License

WTFPL © [yusri](https://blog.yusri.com,my)
