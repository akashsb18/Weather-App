const fs = require("fs");
const http = require("http");
var requests = require("requests");

const homeFile = fs.readFileSync('home.html', 'utf-8');

const server = http.createServer((req, res) => {
    if (req.url == '/') {
        requests('https://api.openweathermap.org/data/2.5/weather?q=Pune&appid=0bfd89f4982a2d416a4ac5d299d03f9e')
            .on('data', function (chunk) {
                console.log(chunk)
            })

            .on('end', function (err) {
                if (err) return console.log('connection closed due to errors', err);

                console.log('end');
            });
    }

});
server.listen(8000, "127.0.0.1");



// const server = http.createServer((req, res) => {
//     if (req.url == '/') {
//         requests("https://api.openweathermap.org/data/2.5/weather?q=kolkata&appid=0bfd89f4982a2d416a4ac5d299d03f9e")

//         server.on('data', (chunk) => {
//             console.log(chunk);
//         })
//         server.on('end', (err) => {
//             if (err) {
//                 return console.log("connection lost due to errors", err);
//             }
//             console.log('end');
//         })
//     }
//     else {

//     }
// });


