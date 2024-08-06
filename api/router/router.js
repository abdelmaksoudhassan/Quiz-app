const {Router} = require("express");
const controller = require('../controllers/controller.js');

const router = Router();

router.route('/')

router.route('/questions')
        .get(controller.getQuestions)

router.route('/result')
        .get(controller.getResult)
        .post(controller.storeResult)

module.exports = router;