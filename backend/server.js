const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const port = 5000;

app.use(cors({
  origin: ['http://localhost:3000', 'https://edemprojects.rf.gd', 'https://edemprojects.netlify.app']
}));
app.use(express.json());
dotenv.config();

mongoose.connect(process.env.MONGODB_URL).then(() => {
  console.log('Database connected');

  app.listen(port, () => {
    console.log(`Server listening on port ${port}!`);
  });
});

const projectSchema = new mongoose.Schema({
  name: String,
  creators: [String],
  description: String,
  resources: [{name: String, count: Number}],
  coordinates: {x: Number, z: Number},
  images: [String]
}, {
  timestamps: true
});

const Project = mongoose.model('project', projectSchema);

app.get('/', (req, res) => {
  res.send('EdemProjects API');
});

app.post('/api/projects/new', async (req, res) => {
  if (req.body) {
    const { name, creators, description, resources, coordinates, images } = req.body;
    if (name && creators && description && resources && coordinates && images) {
      await Project.create(req.body);
      res.send({status: 'ok'});
    } else {
      res.send({status: 'error'});
    };
  } else {
    res.send({status: 'error'});
  }
});

app.get('/api/projects', async (req, res) => {
  const projects = await Project.find();
  res.send(projects);
});

app.get('/api/players', async (req, res) => {
  const projects = await Project.find();
  const players = [];

  projects.forEach(project => {
    project.creators.forEach(creator => {
      if (!players.includes(creator)) {
        players.push(creator);
      };
    });
  });

  res.send(players);
});