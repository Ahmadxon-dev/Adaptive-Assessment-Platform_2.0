const { Router } = require("express")
const router = Router()
const Grade = require("../models/Grades")
const mongoose = require("mongoose")
const { authMiddleware } = require("../middleware/auth")
// /grade

// router.post("/addgrade", async (req,res)=>{
//     try{
//         const {grade} = req.body
//         const newGrade=  new Grade({
//             grade,
//         })
//         const savedGrade = await newGrade.save()
//         return res.status(200).json(savedGrade)
//     }catch (e){
//         return res.status(400).json({error: "Grade already exists"})
//     }
// })

router.post("/addbsb", authMiddleware, async (req, res) => {
  try {
    const { grade, term_number } = req.body
    const getGrade = await Grade.findOne({ grade })
    if (!getGrade) {
      return res.status(400).json({ error: "Grade not found" })
    }
    const term = getGrade.terms.find((t) => t.term_number === term_number)
    if (!term) {
      return res.status(400).json({ error: "Term not found" })
    }
    const lastBsbNumber =
      term.bsbArray.length > 0 ? term.bsbArray[term.bsbArray.length - 1].bsbNumber : 0

    const newBsbNumber = lastBsbNumber + 1

    await Grade.findOneAndUpdate(
      { grade, "terms.term_number": term_number },
      { $push: { "terms.$.bsbArray": { bsbNumber: newBsbNumber } } },
      { new: true } // Options
    )
    return res.status(200).json({ msg: "Bsb muvaffaqiyatli qo'shildi" })
  } catch (e) {
    return res.status(500).json({ error: "Internal Server Error" })
  }
})

router.post("/addchsb", authMiddleware, async (req, res) => {
  try {
    const { grade, term_number } = req.body
    const getGrade = await Grade.findOne({ grade })
    if (!getGrade) {
      return res.status(400).json({ error: "Grade not found" })
    }
    const term = getGrade.terms.find((term) => term.term_number === term_number)
    if (!term) {
      return res.status(400).json({ error: "Term not found" })
    }
    if (term.chsb === 1) {
      return res.json({ msg: "Chsb allaqachon qo'shilgan" })
    }
    await Grade.findOneAndUpdate(
      { grade, "terms.term_number": term_number },
      { $set: { "terms.$.chsb": 1 } },
      { new: true }
    )
    return res.status(200).json({ msg: "Chsb muvaffaqiyatli qo'shildi" })
  } catch (e) {
    return res.status(500).json({ error: "Internal Server Error" })
  }
})

router.get("/gradeslist", async (req, res) => {
  try {
    const gradesList = await Grade.find()
    return res.status(200).json(gradesList)
  } catch (e) {
    return res.status(500).json({ error: "Internal server error" })
  }
})
// router.get('/gradeslist/:grade', async (req,res)=>{
//     try {
//         const {grade} = req.params
//         const getGrade = await Grade.findOne({grade})
//         return res.status(200).json(getGrade)
//     }catch (e) {
//         return res.status(500).json({error:"Internal server error"})
//     }
// })
router.delete("/deletechsb", authMiddleware, async (req, res) => {
  try {
    const { grade, term_number } = req.body
    const updatedGrade = await Grade.findOneAndUpdate(
      { grade, "terms.term_number": term_number },
      { $set: { "terms.$.chsb": 0 } },
      { new: true }
    )
    if (!updatedGrade) {
      return res.status(400).json({ error: "Grade or term not found" })
    }

    return res.status(200).json({ msg: "Chsb muvaffaqiyatli o'chirildi" })
  } catch (e) {
    return res.status(500).json({ error: "Internal server error" })
  }
})
router.delete("/deletebsb/:id", authMiddleware, async (req, res) => {
  try {
    const { grade, term_number } = req.body
    const { id } = req.params

    const updatedGrade = await Grade.findOneAndUpdate(
      { grade },
      {
        $pull: {
          "terms.$[term].bsbArray": { _id: id },
        },
      },
      {
        arrayFilters: [{ "term.term_number": term_number }],
        new: true,
      }
    )

    if (!updatedGrade) {
      return res.status(404).json({ error: "Grade or term not found" })
    }

    return res.json({ msg: "BSB muvaffaqiyatli o'chirildi" })
  } catch (error) {
    console.error(error)
    return res.status(500).json({ error: "Internal server error" })
  }
})

module.exports = router
