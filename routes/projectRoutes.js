const express = require('express');
const router = express.Router();

const db = require('../helpers/projectDb');
const actionDb = require('../helpers/actionDb');

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
    let project = await db.findById(req.params.id);
    const actions = await actionDb.findById(req.params.id);
    project.actions = actions;
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

router.delete('/:id', async (req, res) => {
  try {
    const project = await db.remove(req.params.id);
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
