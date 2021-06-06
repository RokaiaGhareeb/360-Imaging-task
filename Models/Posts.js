const mongoose = require('mongoose');

const schema = new mongoose.Schema(
    {
        author : String,
        title : String,
        post : String,
        comments : [
            {
                commenter: String,
                comment : String
            }
        ]

    },
{timestamps: true});

const Post = mongoose.model('Post', schema);

module.exports  =  Post;