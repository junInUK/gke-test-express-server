const router = require('express').Router();

router.post('/patient-session', (req, res) => {
  console.log(req.body);
  res.status(200).json({ message: 'Welcome to send post request!'});
});

router.get('/', (req, res) => {
  console.log(req.body);
  res.status(200).json({ message: 'Welcome to send get request!'});
});

module.exports = router;