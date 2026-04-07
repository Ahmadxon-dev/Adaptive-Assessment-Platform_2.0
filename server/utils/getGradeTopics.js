const TopicsAndQuestions = require('../models/TopicAndQuestion')

async function getGradeOnlyTopics(grade, questionType){
    const data = await TopicsAndQuestions.find({gradeLevel:String(grade), questionType})
    return data
}

module.exports = getGradeOnlyTopics