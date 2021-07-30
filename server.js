const express = require("express");
const server = express();
const PORT = 3000;
const path = require('path')
const routes = require('./routes')


server.use(express.urlencoded({ extended: true }));
server.use(express.json())

server.use(express.static(path.resolve(__dirname, 'src', 'public')))

server.set('views', path.resolve(__dirname, 'src', 'views'))
server.set('view engine', 'ejs')

server.use(routes)

server.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
