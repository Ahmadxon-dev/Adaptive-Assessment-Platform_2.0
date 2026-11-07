const { Router } = require("express")
const router = Router()
const Person = require("../models/Person")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const { authMiddleware } = require("../middleware/auth")

router.post("/signup", async (req, res) => {
  const { email, password, name } = req.body
  if (!email || !password || !name) {
    return res.status(400).json({ error: "Hamma maydonlarni to'ldiring" })
  }
  await Person.findOne({ email })
    .then((savedUser) => {
      if (savedUser) {
        return res.status(400).json({ error: "Foydalanuvchi avval qo'shilgan" })
      }
      bcrypt
        .hash(password, 10)
        .then((hashedPass) => {
          const user = new Person({
            email,
            password: hashedPass,
            name,
          })
          user.save()
          return res.json({ msg: "Foydalanuvchi muvaffaqiyatli yaratildi", user })
        })
        .catch((error) => {
          console.log(error)
          return res.status(401).json({ error: "Foydalanuvchi yaratilmadi" })
        })
    })
    .catch((error) => {
      console.log(error)
      return res.status(401).json({ error: "Foydalanuvchi yaratilmadi" })
    })
})

router.post("/signin", async (req, res) => {
  const { email, password } = req.body
  if (!email || !password) {
    return res.status(400).json({ error: "Hamma maydonlarni to'ldiring" })
  }
  await Person.findOne({ email })
    .then((savedUser) => {
      if (!savedUser) {
        return res.status(400).json({ error: "Bunday foydalanuvchi topilmadi" })
      }
      bcrypt
        .compare(password, savedUser.password)
        .then((doMatch) => {
          if (doMatch) {
            const { email, role, name, _id } = savedUser
            const token = jwt.sign({ _id, email, role, name }, process.env.JWT_SECRET, {
              expiresIn: "7d",
            })
            return res.json({
              msg: "Muvaffaqiyatli kirildi",
              token,
              user: { email, role, name, _id },
            })
          } else {
            return res.status(400).json({ error: "Parol xato" })
          }
        })
        .catch((error) => {
          console.log(error)
          return res.status(500).json({ error: "Internal server error hash error" })
        })
    })
    .catch((error) => {
      console.log(error)
      return res.status(500).json({ error: "Internal server error findone error" })
    })
})

router.get("/profile", authMiddleware, async (req, res) => {
  try {
    const user = await Person.findById(req.user._id).select(
      "-password -isAbleToChangeRoles -createdAt -updatedAt"
    )
    res.json({
      message: "Profile fetched successfully",
      user,
    })
  } catch (error) {
    return res.status(500).json({ error: "Internal server error" })
  }
})
module.exports = router
