var AllowedMAC = ["AA:BB:CC:DD:EE:FF","xx"];
var http = require("http"),
    url = require("url"),
    path = require("path"),
    fs = require("fs"),
    port = process.argv[2] || 80;
const cProc = require('child_process'),
      exec = require('child_process').exec;
let getMAC = require("ezarp").getMAC;


http.createServer(function(request, response) {

  try
    {
      var uri = url.parse(request.url).pathname;
      var resVal="OK";

      var ip = request.headers['x-forwarded-for'] || request.connection.remoteAddress;
      if (ip.substr(0, 7) == "::ffff:") { ip = ip.substr(7) }

      //1. Check the originating MAC Address whether it is allowed or not
    isAllowed(ip, function(AllowedMAC){
     console.log(AllowedMAC);

      if (AllowedMAC==true) {

      switch (uri) {
        //lock machine
          case '/lockwin' : {
            resVal = "OK";
            cProc.execFile('rundll32.exe', ['user32.dll,LockWorkStation']);
            break;
          }
          //stop PlexService
          case '/stopplex' : {
            cProc.exec('sc.exe stop PlexService', (error, stdout, stderr) => {
                  if (error) {
                   //service already stopped
                    if (stdout.indexOf("1062") != 27) {
                       console.error(`exec error: ${error}`);
                       resVal = "KO";
                       } else { resVal = "OK"; }
                  } //else
                  response.writeHead(200);
                  response.write(resVal + "\n");
                  response.end();
            });
            return;
            break;
          }
          //Start PlexService
          case '/startplex' : {
             resVal = "OK";
            cProc.exec('sc.exe start PlexService', (error, stdout, stderr) => {
                  if (error) {
                   //service already started
                    if (stdout.indexOf("1056") != 25) {
                       console.error(`exec error: ${error}`);
                       resVal = "KO";
                       } else { resVal = "OK"; }
                  } //else
                  response.writeHead(200);
                  response.write(resVal + "\n");
                  response.end();
            });
            return;
            break;
          }
          case '/tdoqla' : {
            //send response back and exec timed sleep routine
            resVal = "OK";
            // https://social.technet.microsoft.com/Forums/windows/en-US/f2835363-9512-413d-a6c9-17df2327cd7a/no-hibernation-just-sleep?forum=w7itproperf
            // As stated in earlier replies, C:\Windows\System32\rundll32.exe powrprof.dll,SetSuspendState 0,1,0
            // does not perform Sleep or Hybrid Sleep unless Hibernate is turned OFF. Instead, it enters into Hibernate state.
            // https://msdn.microsoft.com/en-us/library/windows/desktop/aa373201(v=vs.85).aspx
            setTimeout(cProc.execFileSync('rundll32.exe', ['powrprof.dll,SetSuspendState']), 3000);
          break;
          }
          default: {
                response.writeHead(404, {"Content-Type": "text/plain"});
                response.write("404 Not Found\n");
                response.end();
                return;
              }
       }
         response.writeHead(200);
         response.write(resVal + "\n");
         response.end();
        // console.log(request.socket.remoteAddress + " " + uri);
          return;
    } else {
      //MAC Address not allowed
      response.writeHead(403, {"Content-Type": "text/plain"});
      response.write("403 Forbidden\n");
      response.end();
      return;
    }

     });

     //If MAC Address is in allowed list then return true
     function isAllowed(ipaddr,cBack) {
       getMAC(ipaddr, result => {
      // console.log(result.mac);
      // console.log(AllowedMAC.indexOf(result.mac));
      return (AllowedMAC.indexOf(result.mac) > -1) ? cBack(true) : cBack(false);
       },{ separator: ":"});
     }

}
catch(error) {
  console.log(error.toString());
  // expected output: SyntaxError: unterminated string literal
  // Note - error messages will vary depending on browser
  response.writeHead(500, {"Content-Type": "text/plain"});
  response.write("KO\n");
  response.end();
  return;
}

}).listen(parseInt(port, 10));

console.log("rSOL server running at\n  => http://127.0.0.1:" + port + "/\nCTRL + C to shutdown");
