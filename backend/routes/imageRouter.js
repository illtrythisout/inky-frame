const { Router } = require('express');
const router = Router();

router.get('/', (req, res) => {
  res.json('Inky says Hi!');
});

module.exports = router;
