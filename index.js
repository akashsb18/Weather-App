const fs = require("fs");
const http = require("http");
var requests = require("requests");

const homeFile = fs.readFileSync('home.html', 'utf-8');

//

const replaceVal = (tempVal, orgVal) => {
    let temperature = tempVal.replace("{%tempVal%}", orgVal.main.temp);
    temperature = temperature.replace("{%minTemp%}", orgVal.main.temp_min);
    temperature = temperature.replace("{%maxTemp%}", orgVal.main.temp_max);
    temperature = temperature.replace("{%country%}", orgVal.sys.country);
    // console.log(temperature);
    return temperature;
}

// console.log(replaceVal);

const server = http.createServer((req, res) => {
    if (req.url == '/') {
        requests('https://api.openweathermap.org/data/2.5/weather?q=Pune&appid=0bfd89f4982a2d416a4ac5d299d03f9e&units=metric')
            .on('data', function (chunk) {
                const objData = JSON.parse(chunk);
                const arr = [objData];
                // console.log(arr);
                const realTimeData = arr.map(val => {
                    return replaceVal(homeFile, val);
                }).join("");
                res.write(realTimeData);
                // console.log(realTimeData);
                // console.log(arr[0].main.temp);
            })

            .on('end', function (err) {
                if (err) return console.log('connection closed due to errors', err);

                // console.log('end');
                res.end();
            });
    }

});
server.listen(8000, "127.0.0.1");


