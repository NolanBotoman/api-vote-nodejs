const faker = require('faker');
const Vote = require('../models/vote');
const jwt = require('jsonwebtoken');  
const Helper = require('../helpers');

module.exports = {
    async addVote(req, res) {
        if (!req.body.vote_id) {
            Helper.buildError(res, "Empty fields aren't allowed. Require 'vote_id'");
            return;
        }

        const vote = await Vote.findOne({ "_id": req.body.vote_id });

        if (vote == null) {
            Helper.buildError(res, "Bad provided id.");
            return;
        } 

        if (vote.users.includes(req.partial._id)) {
            Helper.buildError(res, "You've already voted !");
        } else {
            try {
                await Vote.updateOne(
                    { _id: req.body.vote_id }, 
                    { $push: { users: req.partial._id } }
                )

                return res.status(200).json({
                    success: true,
                    vote: vote
                })
            } catch (error) {
                console.log(error);
                return res.status(500).send('Error');
            }
        }
    },
    async getVotes(req, res) {
        try {
            const votes = await Vote.find({});
            return res.status(200).json({
                success: true,
                votes: votes
            })
        } catch (error) {
            console.log(error);
            return res.status(500).send('Error');
        }
    },
    async generateVote(req, res) {
        try {
            const name = faker.fake("{{lorem.sentence}}");

            let empty = [];

            const vote = new Vote({name, empty});
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