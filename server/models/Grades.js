const {model, Schema} = require("mongoose")

const gradeSchema = new Schema({
    grade:{
        type:String,
        required:true,
        unique:true
    },
    terms:[
        {
            term_number:{type:Number},
            bsbArray:[
                {
                    bsbNumber:{type:Number}
                }
            ],
            chsb:{type:Number}
        }
    ]
})

gradeSchema.pre('validate', function (next) {
    if (this.grade !== 'abituriyent' && this.grade !== 'attestatsiya') {
        this.terms = Array.from({ length: 4 }, (_, i) => ({
            term_number: i + 1,
            bsbArray: [],
            chsb: 0
        }));
    } else {
        this.terms = undefined;
    }
    next();
});


module.exports = model("Grade", gradeSchema)