const { Router } = require("express")
const router = Router()
const Person = require("../models/Person")
const bcrypt = require("bcryptjs")
const { authMiddleware, requireRole } = require("../middleware/auth")

router.get("/get-users", authMiddleware, async (req, res) => {
  const { page, pageSize } = req.query
  const skipAmount = (+page - 1) * +pageSize
  const filter = { role: { $ne: "bosh admin" } }

  const people = await Person.find(filter)
    .sort({ _id: -1 })
    .skip(+skipAmount)
    .limit(+pageSize)
  const totalPeople = await Person.countDocuments(filter)
  const isNext = +skipAmount + people.length < totalPeople

  return res.status(200).json({ people, isNext })
})

// router.put("/edit/:userId", authMiddleware, async (req,res)=>{
//     const {password} = req.body
//     const {userId} = req.params

//     const newPassword = await bcrypt.hash(password, 10)
//     await Person.findByIdAndUpdate(userId, {
//         password:newPassword
//     },
//         {new: true}
//     )
//     const allUsers = await Person.find().sort({_id:-1})
//     return res.status(200).json({msg:"Parol Yangilandi", allUsers})
// })

router.delete("/delete/:userId", authMiddleware, async (req, res) => {
  const { userId } = req.params
  await Person.findByIdAndDelete(userId)
  const allUsers = await Person.find().sort({ _id: -1 })
  return res.status(200).json({ msg: "Muvaffaqiyatli o'chirildi", allUsers })
})

router.put("/profile/name/edit", authMiddleware, async (req, res) => {
  const { newName, userId } = req.body
  await Person.findByIdAndUpdate(userId, { name: newName })
  const { email, role, name, _id } = await Person.findById(userId)
  return res
    .status(200)
    .json({
      msg: "Ismingiz muvaffaqiyatli o'zgartirildi",
      user: { email, role, name, _id },
    })
})

router.put("/profile/password/edit", authMiddleware, async (req, res) => {
  const { currentPassword, newPassword, userId } = req.body
  const person = await Person.findById(userId)
  const doMatch = await bcrypt.compare(currentPassword, person.password)

  if (doMatch) {
    const hashedPass = await bcrypt.hash(newPassword, 10)
    person.password = hashedPass
    await person.save()
    const { email, role, name, _id } = person
    return res
      .status(200)
      .json({
        msg: "Parol muvaffaqiyatli o'zgartirildi",
        user: { email, role, name, _id },
      })
  } else {
    return res
      .status(400)
      .json({ error: "Kiritilgan parol foydalanuvchining paroliga to'g'ri kelmadi" })
  }
})

router.put(
  "/role-to-user/",
  authMiddleware,
  requireRole("bosh admin"),
  async (req, res) => {
    const { userEmail } = req.body
    await Person.findOneAndUpdate({ email: userEmail }, { role: "user" })
    const newData = await Person.find().sort({ _id: -1 })
    return res.status(200).json({ msg: "Rol muvaffaqiyatli o'zgartirildi", newData })
  }
)
router.put(
  "/role-to-admin/",
  authMiddleware,
  requireRole("bosh admin"),
  async (req, res) => {
    const { userEmail } = req.body
    await Person.findOneAndUpdate({ email: userEmail }, { role: "admin" })
    const newData = await Person.find().sort({ _id: -1 })
    return res.status(200).json({ msg: "Rol muvaffaqiyatli o'zgartirildi", newData })
  }
)

module.exports = router
