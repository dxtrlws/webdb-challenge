const express = require('express');
const db = require('../helpers/projectDb');
const actionDb = require('../helpers/actionDb');

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const projects = await db.get();
    res.status(200).json(projects);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/:id', async (req, res) => {
  try {
    const project = await db.findById(req.params.id);
    const actions = await actionDb.findById(req.params.id);
    project[0].actions = actions;
    res.status(200).json(project);
  } catch (err) {
    res.status(500).json(err.message);
  }
});

router.post('/', async (req, res) => {
  try {
    const project = await db.insert(req.body);
    res.status(201).json(project);
  } catch (err) {
    res.status(500).json(err);
  }
});

// post new action
router.post('/:id/action', async (req, res) => {
    try {
      const action = await actionDb.insert(req.body);
      res.status(200).json(action);
    } catch (err) {
      res.status(500).json(err);
    }
  });

module.exports = router;
