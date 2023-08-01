const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const port = 5000;

// app.use(
//   cors({
//     //   origin: ['http://localhost:3000', 'https://edemprojects.rf.gd', 'https://edemprojects.netlify.app',
//     // 'https://projects.edemmine.ru']
//     origin: '*',
//   })
// );
app.use(cors());
app.use(express.json());
dotenv.config();

mongoose.connect(`${process.env.MONGODB_URL}`).then(() => {
  console.log('Database connected');

  app.listen(port, () => {
    console.log(`Server listening on port ${port}!`);
  });
});

const projectSchema = new mongoose.Schema(
  {
    name: String,
    creators: [String],
    description: String,
    resources: [{ name: String, count: Number }],
    coordinates: { x: Number, z: Number },
    images: [String],
  },
  {
    timestamps: true,
  }
);

const registrySchema = new mongoose.Schema({
  nickname: String,
});

const Project = mongoose.model('project', projectSchema);
const Player = mongoose.model('player', registrySchema);

app.get('/', (req, res) => {
  res.send('EdemProjects API');
});

app.post('/api/projects/new', async (req, res) => {
  if (req.body) {
    const { name, creators, description, resources, coordinates, images } =
      req.body;
    if (name && creators && description && resources && coordinates && images) {
      await Project.create(req.body);
      try {
        for (let i = 0; i < creators.length; i++) {
          const player = await Player.findOne({nickname: creators[i]});
          if (!player) {
            await Player.create({nickname: creators[i], isInRegistry: false});
          } else {
            continue;
          };
        };
        res.send({ status: 'ok' });
      } catch (error) {
        console.log(error);
        res.send({ status: 'error' });
      }
    } else {
      res.send({ status: 'error' });
    }
  } else {
    res.send({ status: 'error' });
  }
});

app.get('/api/projects', async (req, res) => {
  const projects = await Project.find();
  res.send({status: 'ok', data: projects});
});

app.get('/api/players', async (req, res) => {
  if (req.query.nickname) {
    try {
      const player = await Player.findOne({nickname: req.query.nickname});
      res.send({status: 'ok', data: player});
    } catch (error) {
      console.log(error);
      res.send({ status: 'error' });
    }
  } else {
    const players = await Player.find();
    res.send({status: 'ok', data: players})
  };
});
