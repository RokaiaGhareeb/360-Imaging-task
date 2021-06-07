const mongoose = require('mongoose');

const schema = new mongoose.Schema(
    {
        author: {
            type: String,
            required: true,
            
        },
        title : {
            type: String,
            required: true
        },
        post:{
            type: String,
            required: true,
            maxlength: 200
        },
        comments : [
            {
                _id : {
                    type: mongoose.Schema.Types.ObjectId,
                    index: true,
                    required: true,
                    auto: true,
                },
                commenter:{
                    type: String,
                    required: true,
                },
                comment : {
                    type: String,
                    required: true,
                    maxlength: 100
                }
            }
        ]

    },
{timestamps: true});

const Post = mongoose.model('Post', schema);

module.exports = Post;