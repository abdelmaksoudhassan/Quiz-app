const Questions = require("../models/questionSchema.js");
const Results = require("../models/resultSchema.js");
const {questions, answers } = require('../database/data.js')

/** get all questions */
async function getQuestions(req, res) {
    try {
        let q = await Questions.find();
        if (q.length === 0) {
            await Questions.insertMany({ questions, answers });
            q = await Questions.find();
        }
        res.json(q);
    } catch (error) {
        res.json({ error });
    }
}

/** get all result */
async function getResult(req, res) {
    try {
        const r = await Results.find();
        res.json(r)
    } catch (error) {
        res.json({ error })
    }
}

/** post all result */
async function storeResult(req, res) {
    try {
        const { username, result, attempts, points, achived } = req.body;
        if (!username && !result) throw new Error('Data Not Provided...!');

        const newResult = await Results.create({ username, result, attempts, points, achived });
        res.json({ msg: "Result Saved Successfully...!", result: newResult });

    } catch (error) {
        res.json({ error });
    }
}

module.exports = {
    getQuestions,
    getResult,
    storeResult,
}