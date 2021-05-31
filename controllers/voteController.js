const faker = require('faker');
const Vote = require('../models/vote');

module.exports = {
    async getVotes(req, res) {
        try {
            const votes = await Vote.find({});

            return res.status(200).json({
                success: true,
                votes: [votes]
            })
        } catch (error) {
            console.log(error);
            return res.status(500).send('Error');
        }
    },
    async generateVote(req, res) {
        try {
            const name = faker.fake("{{lorem.sentence}}");
            const count = faker.fake("{{datatype.number}}");

            const vote = new Vote({name, count});
            const newVote = await vote.save();

            return res.status(200).send({
                success: true,
                name: newVote.name,
                _id: newVote._id
            });
        } catch (error) {
            console.log(error);
            return res.status(500).send('Error');
        }
    },
}