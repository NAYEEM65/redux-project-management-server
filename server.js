const auth = require('json-server-auth');
const jsonServer = require('json-server');
const express = require('express');
const http = require('http');

const app = express();
const server = http.createServer(app);
const io = require('socket.io')(server);

global.io = io;

const router = jsonServer.router('db.json');

const port = process.env.PORT || 9001;

// Bind the router db to the app
app.db = router.db;

const rules = auth.rewriter({
    users: 640,
    teams: 660,
    projects: 660,
});

app.use(rules);
app.use(auth);
app.use(router);

server.listen(port, () => {
    console.log('server is running');
});
