const mongoose = require("mongoose");

const Matches = new mongoose.Schema({
    data: {
        id: Number,
        started_at: Date,
        completed_at: Date,
        map: String,
        bg_url: String,
        team_size: String,
        round_mode: String,
        match_type: String,
        match_type_url: String,
        is_available: Boolean,
        watch: {
            name: String,
            status: String,
            peak_views: Number,
            downloads: Number,
            expires_at: String,
            link: String,
        },
        periods: [
            {
                period: Number,
                rounds: Number,
                team_1: {
                    side: String,
                    score: Number
                },
                team_2: {
                    side: String,
                    score: Number
                }
            }
        ],
        outcome_type: String,
        outcome_team_at_fault: String,
        additional_stats_processed: Boolean,
        additional_stats_processing_info: String, //idk
        team_1: {
            id: Number,
            team: Number,
            name: String,
            score: Number,
            players: [
                {
                    id: Number,
                    alias: String,
                    avatar_url: String,
                },
                {
                    id: Number,
                    alias: String,
                    avatar_url: String,
                },
                {
                    id: Number,
                    alias: String,
                    avatar_url: String,
                },
                {
                    id: Number,
                    alias: String,
                    avatar_url: String,
                },
                {
                    id: Number,
                    alias: String,
                    avatar_url: String,
                }
            ]
        },
        team_2: {
            id: Number,
            team: Number,
            name: String,
            score: Number,
            players: [
                {
                    id: Number,
                    alias: String,
                    avatar_url: String,
                },
                {
                    id: Number,
                    alias: String,
                    avatar_url: String,
                },
                {
                    id: Number,
                    alias: String,
                    avatar_url: String,
                },
                {
                    id: Number,
                    alias: String,
                    avatar_url: String,
                },
                {
                    id: Number,
                    alias: String,
                    avatar_url: String,
                }
            ]
        },
        comments_count: Number
    }
})

module.exports = mongoose.model("matches", Matches)