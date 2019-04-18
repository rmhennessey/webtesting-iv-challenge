const express = require("express");

const server = express();

server.use(express.json());

const users = [
    {id: 1, name: "Rory", role: "student"},
    {id: 2, name: "Josh", role: "student"},
    {id: 3, name: "Germanicus", role: "student"},
    {id: 4, name: "Rem", role: "student"},
]

server.get('/', async (req, res) => {
  res.status(200).json(users);
});

server.post("/", (req, res) => {
    const { id, name } = req.body;
  
    if (!id || !name) {
      res.status(500).end();
    } else {
      res.status(201).json(req.body);
    }
  });
  
  server.delete("/:id", (req, res) => {
    const { id } = req.params;
    if (!id) {
      res.status(500).end();
    } else {
      res.status(200).json({ id });
    }
  });


// server.get('/users', async (req, res) => {
//     const rows = await users.getAll();
  
//     res.status(200).json(rows);
//   });

module.exports = server;