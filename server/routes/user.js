const { Router } = require("express")
const router = Router()
const Person = require("../models/Person")
const bcrypt = require("bcryptjs")
const { authMiddleware, requireRole, validateMongoIdParam } = require("../middleware/auth")

router.get("/get-users", authMiddleware, async (req, res) => {
  const { page, pageSize } = req.query
  const skipAmount = (+page - 1) * +pageSize
  const filter = { role: { $ne: "bosh admin" } }

  const people = await Person.find(filter)
    .sort({ _id: -1 })
    .skip(+skipAmount)
    .limit(+pageSize)
    .select(' -password ')
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

router.delete("/delete/:userId", authMiddleware, requireRole('bosh admin', 'admin'), validateMongoIdParam('userId'), async (req, res) => {
  const { userId } = req.params
  await Person.findByIdAndDelete(userId)
  const allUsers = await Person.find().sort({ _id: -1 })
  return res.status(200).json({ msg: "Muvaffaqiyatli o'chirildi", allUsers })
})

router.put("/profile/name/edit", authMiddleware,  async (req, res) => {
  const { newName } = req.body
  if (typeof newName !== "string") {
    return res.status(400).json({ error: "Ismda sonlar, belgilar va bo'sh joylar mavjud" })
  }
  const name = newName.trim()
  if (name.length === 0 || name.length > 50) {
    return res.status(400).json({
      error: "Ism 1 dan 50 gacha belgidan iborat bo'lishi kerak",
    })
  }
  try {
    const user = await Person.findByIdAndUpdate(
      req.user._id,
      { name },
      { new: true, runValidators: true }
    ).select("_id email role name")

    if (!user) {
      return res.status(404).json({ error: "Foydalanuvchi topilmadi" })
    }

    return res.json({ msg: "Ismingiz muvaffaqiyatli o'zgartirildi", user })
  } catch (error) {
    return res.status(500).json({ error: "Internal server error" })
  }
  // const { email, role, name, _id } = await Person.findByIdAndUpdate(req.user._id, { name: newName }, {new : true})
  // return res
  //   .status(200)
  //   .json({
  //     msg: "Ismingiz muvaffaqiyatli o'zgartirildi",
  //     user: { email, role, name, _id },
  //   })
})

router.put("/profile/password/edit", authMiddleware, async (req, res) => {
  const { currentPassword, newPassword, } = req.body
  const person = await Person.findById(req.user._id)
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
