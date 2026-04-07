const {Schema, model} = require("mongoose");



const TopicAndQuestionSchema = new Schema({
    gradeLevel:{ type: String, enum:['7', '8', '9', '10', '11', 'abituriyent', 'attestatsiya']},
    maintopicname: { type: String, required: true },
    questionType:{
        type:String,
        enum:["multiple-choice", 'open-ended'],
        default:"multiple-choice",
        required:true
    },
    subtopics: [
        {
            subtopicname: { type: String, required: true },
            questions: [
                {
                    questionId: {type:String, required:true},
                    questionText: { type: String, required: true },
                    questionImage: { type: String, default: null }, // Optional, if a question image exists
                    options: {
                        option1: {
                            text: { type: String, required: false },
                            image: { type: String, default: null }
                        },
                        option2: {
                            text: { type: String, required: false },
                            image: { type: String, default: null }
                        },
                        option3: {
                            text: { type: String, required: false },
                            image: { type: String, default: null }
                        },
                        option4: {
                            text: { type: String, required: false },
                            image: { type: String, default: null }
                        },
                        // option5: {
                        //     text: { type: String, required: false },
                        //     image: { type: String, default: null }
                        // }
                    },
                    answer: {
                        type: String,
                        // enum: ['option1', 'option2', 'option3', 'option4', 'option5'],
                        required: true
                    },
                    solutionImage:{
                        type:String,
                        required: false
                    },
                    status:{
                        type:String,
                        enum: ['b','q','m', null, "null"], // bilish, qo'llash, mulohaza
                        required:false,
                        default:null
                    }
                }
            ]
        }
    ]
}, {timestamps:true, collection: "Topics_And_Questions"})

module.exports = model( "TopicAndQuestion", TopicAndQuestionSchema)
