const { Router } = require("express")
const router = Router()
const Test = require("../models/Test")
const TopicAndQuestion = require("../models/TopicAndQuestion")
const getGradeTopics = require("../utils/getGradeTopics")
const upload = require("../middleware/upload")
const cloudinary = require("cloudinary").v2
const { v4: uuidv4 } = require("uuid")
const Person = require("../models/Person")
const { authMiddleware } = require("../middleware/auth")
//start

router.get("/getfulltestdb-by-id", authMiddleware, async (req, res) => {
  const data = await TopicAndQuestion.find()
  return res.json(data)
})
router.get("/getfulltestdb-by-id/:id", authMiddleware, async (req, res) => {
  const { id } = req.params
  // id=abituriyent-attestatsiya
  const data = await TopicAndQuestion.find({ gradeLevel: String(id) })
  return res.json(data)
})
router.get("/getfulltestdb-by-id/:id/:questionType", authMiddleware, async (req, res) => {
  const { id, questionType } = req.params
  const data = await TopicAndQuestion.find({
    gradeLevel: String(id),
    questionType: questionType,
  })
  return res.json(data)
})

//test
router.post("/start/abituriyent", authMiddleware, async (req, res) => {
  const { time, subtopicnamesArray, userEmail, userId, numberOfQuestions, testType } =
    req.body

  // Find the topic that contains the given subtopics
  const topic = await TopicAndQuestion.find({
    gradeLevel: "abituriyent",
    questionType: "multiple-choice",
    "subtopics.subtopicname": { $in: subtopicnamesArray },
  })

  let allQuestions = []
  topic.subtopics?.forEach((subtopic) => {
    if (subtopicnamesArray.includes(subtopic.subtopicname)) {
      allQuestions.push(...subtopic.questions)
    }
  })
  if (allQuestions.length < numberOfQuestions) {
    return res.status(400).json({
      error: `Tanlangan savollar soni, savollardan ko'p.`,
      additional: `Savollar soni: ${allQuestions.length}ta`,
    })
  }
  //
  // // Shuffle and select the required number of questions
  const shuffledQuestions = allQuestions.sort(() => 0.5 - Math.random())
  const selectedQuestions = shuffledQuestions
    .slice(0, numberOfQuestions || allQuestions.length)
    .map((question) => ({
      questionText: question.questionText,
      questionImage: question.questionImage || null,
      options: {
        option1: {
          text: question.options.option1.text,
          image: question.options.option1.image || null,
        },
        option2: {
          text: question.options.option2.text,
          image: question.options.option2.image || null,
        },
        option3: {
          text: question.options.option3.text,
          image: question.options.option3.image || null,
        },
        option4: {
          text: question.options.option4.text,
          image: question.options.option4.image || null,
        },
        // option5: {
        //   text: question.options.option5.text,
        //   image: question.options.option5.image || null,
        // },
      },
      selectedAnswer: "", // Initially empty, user will select later
      correctAnswer: question.answer, // Assign the correct answer
      status: question.status || null,
      solutionImage: question.solutionImage || null,
    }))
  const newTest = new Test({
    subtopicname: subtopicnamesArray,
    questions: selectedQuestions,
    startTime: new Date(),
    remainingTime: time, // Time in seconds
    isCompleted: false,
    result: 0, // Initially 0
    userEmail,
    userId,
    testType,
  })

  await newTest.save()
  return res.status(200).json({ msg: "Test created", testId: newTest._id, newTest })
})
router.post("/start", authMiddleware, async (req, res) => {
  const {
    time,
    subtopicnamesArray,
    userEmail,
    userId,
    numberOfQuestions,
    testType,
    grade,
    term,
    questionType,
  } = req.body
  const { b, q, m } = numberOfQuestions

  const gradeLevel = testType === "attestatsiya" ? "attestatsiya" : grade

  // Step 1: Fetch all topics containing the selected subtopics
  const topics = await TopicAndQuestion.find({
    gradeLevel,
    questionType,
    "subtopics.subtopicname": { $in: subtopicnamesArray },
  })

  if (!topics || topics.length === 0) {
    return res.status(400).json({ error: "Subtopic not found in any topic" })
  }

  // Step 2: Collect all questions from selected subtopics
  let allQuestions = []
  topics.forEach((topic) => {
    topic.subtopics?.forEach((subtopic) => {
      if (subtopicnamesArray.includes(subtopic.subtopicname)) {
        allQuestions.push(...subtopic.questions)
      }
    })
  })

  // Step 3: Filter questions by status
  const grouped = {
    b: allQuestions.filter((q) => q.status === "b"),
    q: allQuestions.filter((q) => q.status === "q"),
    m: allQuestions.filter((q) => q.status === "m"),
  }

  if (grouped.b.length < b) {
    return res.status(400).json({
      error: `Bilishga tegishli savollar yetarli emas. Bilishda belgilangan mavzularda ${grouped.b.length} ta savol bor.`,
    })
  }
  if (grouped.q.length < q) {
    return res.status(400).json({
      error: `Qo'llashga tegishli savollar yetarli emas. Qo'llashda belgilangan mavzularda ${grouped.q.length} ta savol bor.`,
    })
  }
  if (grouped.m.length < m) {
    return res.status(400).json({
      error: `Mulohazaga tegishli savollar yetarli emas. Mulohazada belgilangan mavzularda ${grouped.m.length} ta savol bor.`,
    })
  }

  // Step 5: Randomly select required number from each group
  const getRandomSubset = (arr, count) =>
    arr.sort(() => 0.5 - Math.random()).slice(0, count)

  const selectedB = getRandomSubset(grouped.b, b)
  const selectedQ = getRandomSubset(grouped.q, q)
  const selectedM = getRandomSubset(grouped.m, m)

  const orderedQuestions = [...selectedB, ...selectedQ, ...selectedM]
  let finalQuestions = []
  // Step 6: Shuffle all selected questions together
  if (questionType === "multiple-choice") {
    finalQuestions = orderedQuestions.map((question) => ({
      questionText: question.questionText,
      questionImage: question.questionImage || null,
      options: {
        option1: {
          text: question.options.option1?.text || "",
          image: question.options.option1?.image || null,
        },
        option2: {
          text: question.options.option2?.text || "",
          image: question.options.option2?.image || null,
        },
        option3: {
          text: question.options.option3?.text || "",
          image: question.options.option3?.image || null,
        },
        option4: {
          text: question.options.option4?.text || "",
          image: question.options.option4?.image || null,
        },
      },
      selectedAnswer: "",
      correctAnswer: question.answer,
      status: question.status || null,
      solutionImage: question.solutionImage || null,
    }))
  } else {
    finalQuestions = orderedQuestions.map((question) => ({
      questionText: question.questionText,
      questionImage: question.questionImage || null,
      selectedAnswer: "",
      correctAnswer: question.answer,
      status: question.status || null,
      solutionImage: question.solutionImage || null,
    }))
  }

  if (testType === "attestatsiya") {
    const newTest = new Test({
      subtopicname: subtopicnamesArray,
      questionType,
      questions: finalQuestions,
      startTime: new Date(),
      remainingTime: time,
      isCompleted: false,
      result: 0,
      userEmail,
      userId,
      testType: "attestatsiya",
    })

    await newTest.save()
    return res.status(200).json({ msg: "Test yaratildi", testId: newTest._id, newTest })
  }
  const newTest = new Test({
    subtopicname: subtopicnamesArray,
    questionType,
    questions: finalQuestions,
    startTime: new Date(),
    remainingTime: time,
    isCompleted: false,
    result: 0,
    userEmail,
    userId,
    grade,
    testType,
    term,
  })

  await newTest.save()
  return res.status(200).json({ msg: "Test yaratildi", testId: newTest._id, newTest })
})
router.get("/all-results", authMiddleware, async (req, res) => {
  const { page, pageSize } = req.query
  const skipAmount = (+page - 1) * +pageSize
  const boshAdminlar = await Person.find({ role: "bosh admin" }).distinct("_id")
  const filter = {
    userId: { $nin: boshAdminlar },
  }

  const test = await Test.find(filter)
    .populate("userId")
    .skip(+skipAmount)
    .limit(+pageSize)

  const totalTests = await Test.countDocuments(filter)

  const isNext = totalTests > test.length + skipAmount
  return res.status(200).json({ test, isNext })
})
router.get("/:testId", authMiddleware, async (req, res) => {
  const { testId } = req.params
  await Test.findById(testId).then((test) => {
    return res.status(200).json(test)
  })
})

// router.put("/submit/:testId", async (req, res) => {
//   const { testId } = req.params;
//   const { remainingTime, isCompleted } = req.body;
//   const test = await Test.findById(testId);
//   test.remainingTime = remainingTime;
//   test.isCompleted = isCompleted;
//   let score = 0;
//   const questionsNumber = test.questions.length;
//   for (let i = 0; i < questionsNumber; i++) {
//     if (test.questions[i].correctAnswer === test.questions[i].selectedAnswer) {
//       score += 1;
//     }
//   }
//   test.result = score;
//   await test.save();
//   if (!test) return res.status(400).json({ error: "Test not updated" });
//   return res.status(200).json({ msg: "Test updated" });
// });

// test submit after all from cache

router.put("/submit/:testId", authMiddleware, async (req, res) => {
  const { testId } = req.params
  const { remainingTime, isCompleted, answers } = req.body
  // answers = [{questionIndex: 0, selectedAnswer: "option2"}, ...]

  try {
    const test = await Test.findById(testId)
    if (!test) return res.status(404).json({ error: "Test not found" })

    // Update remaining time & completion status
    test.remainingTime = remainingTime
    test.isCompleted = isCompleted

    // Save answers into test.questions
    if (Array.isArray(answers)) {
      answers.forEach(({ questionIndex, selectedAnswer }) => {
        if (questionIndex >= 0 && questionIndex < test.questions.length) {
          test.questions[questionIndex].selectedAnswer = selectedAnswer
        }
      })
    }

    // Calculate score
    let score = 0
    test.questions.forEach((q) => {
      if (q.selectedAnswer && q.selectedAnswer === q.correctAnswer) {
        score++
      }
    })

    test.result = score

    await test.save()
    return res.status(200).json({ msg: "Test submitted successfully", score })
  } catch (e) {
    console.error(e)
    return res.status(500).json({ error: "Server error" })
  }
})

// router.put("/:testId/answer", authMiddleware, async (req, res) => {
//   const { testId } = req.params
//   const { questionIndex, selectedAnswer } = req.body
//   try {
//     const test = await Test.findById(testId)
//     if (questionIndex < 0 || questionIndex >= test.questions.length) {
//       return res.status(400).json({ message: "Invalid question index" })
//     }
//     test.questions[questionIndex].selectedAnswer = selectedAnswer
//     await test.save()
//     return res.status(200).json({ msg: "success" })
//   } catch (e) {
//     console.log(e)
//   }
// })

router.get("/results/:userEmail", authMiddleware, async (req, res) => {
  const { userEmail } = req.params
  const { page, pageSize } = req.query
  const skipAmount = (+page - 1) * +pageSize

  const test = await Test.find({ userEmail })
    .populate("userId")
    .sort({ _id: -1 })
    .limit(+pageSize)
    .skip(+skipAmount)

  const totalTests = await Test.countDocuments({ userEmail })
  const isNext = totalTests > +skipAmount + test.length
  return res.json({ test, isNext })
})

// crud topics, questions
router.post("/topics/add", authMiddleware, async (req, res) => {
  const { newMainTopic, gradeLevel, questionType } = req.body
  const newTopic = new TopicAndQuestion({
    gradeLevel,
    maintopicname: newMainTopic,
    questionType,
    subtopics: [],
  })
  await newTopic.save()
  const newData = await getGradeTopics(gradeLevel, questionType)
  return res.status(200).json({ msg: "Yangi bo'lim muvaffaqiyatli yaratildi", newData })
})
router.delete("/topics/delete", authMiddleware, async (req, res) => {
  const { mainTopicId, gradeLevel, questionType } = req.body
  await TopicAndQuestion.findByIdAndDelete(mainTopicId)
  const newData = await getGradeTopics(gradeLevel, questionType)
  return res.status(200).json({ msg: "Bo'lim muvaffaqiyatli o'chirildi", newData })
})
router.put("/topics/edit", authMiddleware, async (req, res) => {
  const { mainTopicId, newMainTopicName, gradeLevel, questionType } = req.body
  await TopicAndQuestion.findByIdAndUpdate(mainTopicId, {
    maintopicname: newMainTopicName,
  })
  const newData = await getGradeTopics(gradeLevel, questionType)
  return res.status(200).json({ msg: "Bo'lim muvaffaqiyatli o'zgartirildi", newData })
})

router.post("/subtopics/add", authMiddleware, async (req, res) => {
  const { newSubTopic, mainTopicId, gradeLevel, questionType } = req.body
  await TopicAndQuestion.findByIdAndUpdate(
    mainTopicId,
    {
      $push: {
        subtopics: {
          subtopicname: newSubTopic,
          questions: [],
        },
      },
    },
    { new: true }
  )
  const newData = await getGradeTopics(gradeLevel, questionType)
  return res.status(200).json({ msg: "Yangi mavzu muvaffaqiyatli yaratildi", newData })
})
router.delete("/subtopics/delete", authMiddleware, async (req, res) => {
  const { subTopicName, mainTopicId, gradeLevel, questionType } = req.body
  await TopicAndQuestion.findByIdAndUpdate(
    mainTopicId,
    {
      $pull: {
        subtopics: { subtopicname: subTopicName },
      },
    },
    { new: true }
  )
  const newData = await getGradeTopics(gradeLevel, questionType)
  return res.status(200).json({ msg: "Mavzu muvaffaqiyatli o'chirildi", newData })
})

router.put("/subtopics/edit", authMiddleware, async (req, res) => {
  const { mainTopicId, newSubTopicName, oldSubTopicName, gradeLevel, questionType } =
    req.body
  await TopicAndQuestion.findOneAndUpdate(
    {
      _id: mainTopicId,
      "subtopics.subtopicname": oldSubTopicName,
    },
    { $set: { "subtopics.$.subtopicname": newSubTopicName } },
    { new: true }
  )
  const newData = await getGradeTopics(gradeLevel, questionType)
  return res.status(200).json({ msg: "Mavzu muvaffaqiyatli o'zgartirildi", newData })
})

// add questiontype
router.delete("/questions/delete", authMiddleware, async (req, res) => {
  const { mainTopicId, subTopicName, questionId, gradeLevel, questionType } = req.body
  await TopicAndQuestion.findOneAndUpdate(
    { _id: mainTopicId, "subtopics.subtopicname": subTopicName },
    {
      $pull: {
        "subtopics.$[subtopic].questions": { questionId },
      },
    },
    {
      new: true,
      arrayFilters: [{ "subtopic.subtopicname": subTopicName }], // Ensures it targets only the correct subtopic
    }
  )

  const newData = await getGradeTopics(gradeLevel, questionType)
  return res.status(200).json({ msg: "Savol muvaffaqiyatli o'chirildi", newData })
})
// multer file
const uploadToCloudinary = (buffer, publicId) => {
  return new Promise((resolve, reject) => {
    cloudinary.uploader
      .upload_stream(
        {
          resource_type: "auto",
          public_id: publicId,
          // folder: 'quiz-platform',
          folder: "fizika360",
          quality: 40,
          fetch_format: "auto",
        },
        (err, result) => {
          if (err) return reject(err)
          resolve(result.secure_url)
        }
      )
      .end(buffer)
  })
}
router.post("/questions/add", authMiddleware, upload, async (req, res) => {
  try {
    const {
      gradeLevel,
      questionText,
      answer,
      optionsText,
      mainTopicId,
      subTopicName,
      questionStatus,
      questionType,
    } = req.body
    // Upload images to Cloudinary
    // const uploadToCloudinary = (imageBuffer, imageName) => {
    //   return new Promise((resolve, reject) => {
    //     cloudinary.uploader
    //       .upload_stream(
    //         {
    //           resource_type: "auto",
    //           public_id: imageName,
    //           // folder: 'quiz-platform',
    //           folder: "itfizika",
    //           quality: 40,
    //           fetch_format: "auto",
    //         },
    //         (error, result) => {
    //           if (error) {
    //             reject(error);
    //           } else {
    //             resolve(result.secure_url); // Return the Cloudinary URL
    //           }
    //         },
    //       )
    //       .end(imageBuffer); // Pass the image buffer directly to Cloudinary
    //   });
    // };
    // Collect image files (in memory)
    const questionImage = req.files["questionImage"]
      ? req.files["questionImage"][0]
      : null
    const solutionImage = req.files["solutionImage"]
      ? req.files["solutionImage"][0]
      : null

    const questionImageUrl = questionImage
      ? await uploadToCloudinary(questionImage.buffer, `question_${uuidv4()}`)
      : null
    const solutionImageUrl = solutionImage
      ? await uploadToCloudinary(solutionImage.buffer, `solution_image`)
      : null

    const optionImages = []
    for (let i = 1; i <= 4; i++) {
      const image = req.files[`optionImage${i}`] // Expecting 'optionImage1', 'optionImage2', ...
      if (image) {
        optionImages.push(image[0]) // Only the first file in the array
      } else {
        optionImages.push(null) // No image for this option
      }
    }
    const optionImageUrls = []
    for (let i = 0; i < 4; i++) {
      const imageFile = optionImages[i] // Get the image for the i-th option
      if (imageFile) {
        const imageUrl = await uploadToCloudinary(
          imageFile.buffer,
          `option_${uuidv4()}_${i}`
        )
        optionImageUrls.push(imageUrl)
      } else {
        optionImageUrls.push(null) // If no image, set to null
      }
    }
    const options = {}
    for (let i = 0; i < 4; i++) {
      options[`option${i + 1}`] = {
        text: optionsText[i] || "", // Default to empty if not provided
        image: optionImageUrls[i] || null, // If no image, set to null
      }
    }
    await TopicAndQuestion.findOneAndUpdate(
      { _id: mainTopicId, "subtopics.subtopicname": subTopicName },
      {
        $push: {
          "subtopics.$.questions": {
            questionId: uuidv4(),
            questionText: questionText,
            questionImage: questionImageUrl,
            answer,
            solutionImage: solutionImageUrl,
            options: options,
            status: questionStatus,
          },
        },
      },
      { new: true }
    )
    const newData = await getGradeTopics(gradeLevel, questionType)
    return res.status(200).json({ msg: "Muvaffaqiyatli yaratildi", newData })
  } catch (err) {
    res.status(500).json({ message: "Error adding question", error: err })
  }
})

router.patch("/questions/edit", authMiddleware, upload, async (req, res) => {
  try {
    const {
      gradeLevel,
      questionText,
      answer,
      optionsText,
      subTopicName,
      questionStatus,
      questionId,
      questionType,
    } = req.body

    // Collect the current images and check if new images are provided
    const questionImageFile = req.files["questionImage"]?.[0] || null
    const solutionImageFile = req.files["solutionImage"]?.[0] || null

    const questionImageUrl = questionImageFile
      ? await uploadToCloudinary(questionImageFile.buffer, `question_${uuidv4()}`)
      : null

    const solutionImageUrl = solutionImageFile
      ? await uploadToCloudinary(solutionImageFile.buffer, `solution_${uuidv4()}`)
      : null

    // const optionImagesFiles = Array(5).fill(null).map((_, idx) => req.files[`optionImage${idx + 1}`]?.[0] || null);

    const optionImagesFiles = Array(4)
      .fill(null)
      .map((_, idx) => {
        let file = req.files[`optionImage${idx + 1}`]?.[0] || null

        // If file is explicitly the string "null", treat it as null
        if (file === "null") {
          file = null
        }

        return file
      })
    const optionImageUrls = await Promise.all(
      optionImagesFiles.map((file, idx) => {
        return file
          ? uploadToCloudinary(file.buffer, `option_${uuidv4()}_${idx + 1}`)
          : null
      })
    )

    const updateFields = {
      "subtopics.$.questions.$[elem].questionText": questionText,
      "subtopics.$.questions.$[elem].answer": answer,
      "subtopics.$.questions.$[elem].status": questionStatus,
    }

    // Handle questionImage - if new image URL exists, set it; else keep existing
    if (questionImageUrl) {
      updateFields["subtopics.$.questions.$[elem].questionImage"] = questionImageUrl
    }
    // If no new question image, ensure we don't overwrite the existing one
    else if (
      req.body.questionImage !== undefined &&
      req.body.questionImage !== null &&
      req.body.questionImage !== "null"
    ) {
      updateFields["subtopics.$.questions.$[elem].questionImage"] = req.body.questionImage
    }

    // Handle solutionImage
    if (solutionImageUrl) {
      updateFields["subtopics.$.questions.$[elem].solutionImage"] = solutionImageUrl
    }
    // If no new solution image, ensure we don't overwrite the existing one
    else if (
      req.body.solutionImage !== undefined &&
      req.body.solutionImage !== null &&
      req.body.solutionImage !== "null"
    ) {
      updateFields["subtopics.$.questions.$[elem].solutionImage"] = req.body.solutionImage
    }
    for (let i = 0; i < 4; i++) {
      updateFields[`subtopics.$.questions.$[elem].options.option${i + 1}.text`] =
        optionsText[i] || ""

      const currentImage = optionImageUrls[i]

      if (currentImage) {
        updateFields[`subtopics.$.questions.$[elem].options.option${i + 1}.image`] =
          currentImage
      } else {
        // If `null` is passed from frontend, explicitly set it as null in the DB
        const frontendImage = req.body[`optionImage${i + 1}`]

        if (frontendImage === null || frontendImage === "null") {
          updateFields[`subtopics.$.questions.$[elem].options.option${i + 1}.image`] =
            null
        }
        // Retain existing image if no new image is provided
        else if (frontendImage && !frontendImage.includes("cloudinary.com")) {
          // Existing image URL (non-Cloudinary links will be preserved)
          updateFields[`subtopics.$.questions.$[elem].options.option${i + 1}.image`] =
            frontendImage
        }
      }
    }
    // Perform the update
    const result = await TopicAndQuestion.findOneAndUpdate(
      {
        "subtopics.subtopicname": subTopicName,
        "subtopics.questions.questionId": questionId,
      },
      { $set: updateFields },
      {
        new: true,
        arrayFilters: [{ "elem.questionId": questionId }],
      }
    )

    if (!result) {
      return res.status(404).json({ message: "Question not found" })
    }

    // Return updated data
    const newData = await getGradeTopics(gradeLevel, questionType)
    res.status(200).json({
      msg: "Savol muvaffaqiyatli yangilandi",
      newData,
    })
  } catch (err) {
    console.error("Error editing question:", err)
    res.status(500).json({ message: "Server error", error: err.message })
  }
})

router.put("/questions/edit/status", authMiddleware, async (req, res) => {
  const { topicId, subtopicName, questionId, newStatus, gradeLevel, questionType } =
    req.body
  try {
    // Find the topic by its name
    const topic = await TopicAndQuestion.findOne({ _id: topicId })

    if (!topic) {
      return res.status(404).json({ msg: "Topic not found" })
    }

    // Find the subtopic within the topic
    const subtopic = topic.subtopics.find((sub) => sub.subtopicname === subtopicName)

    if (!subtopic) {
      return res.status(404).json({ msg: "Subtopic not found" })
    }

    // Find the specific question by its questionId
    const question = subtopic.questions.find((q) => q.questionId === questionId)

    if (!question) {
      return res.status(404).json({ msg: "Question not found" })
    }

    // Update the status of the found question
    question.status = newStatus

    // Save the updated topic back to the database
    await topic.save()

    // Return the updated topic data as response
    const newData = await getGradeTopics(gradeLevel, questionType)
    res.status(200).json({
      msg: "Savol muvaffaqiyatli yangilandi",
      newData,
    })
  } catch (error) {
    console.error("Error updating question status:", error.message)
    res.status(500).json({ msg: "Internal Server Error" })
  }
})

router.post("/open-ended/questions/add", authMiddleware, upload, async (req, res) => {
  try {
    const {
      gradeLevel,
      questionText,
      answer,
      mainTopicId,
      subTopicName,
      questionStatus,
      questionType,
    } = req.body
    const questionImage = req.files["questionImage"]
      ? req.files["questionImage"][0]
      : null
    const solutionImage = req.files["solutionImage"]
      ? req.files["solutionImage"][0]
      : null

    const questionImageUrl = questionImage
      ? await uploadToCloudinary(questionImage.buffer, `question_${uuidv4()}`)
      : null
    const solutionImageUrl = solutionImage
      ? await uploadToCloudinary(solutionImage.buffer, `solution_image`)
      : null
    await TopicAndQuestion.findOneAndUpdate(
      { _id: mainTopicId, "subtopics.subtopicname": subTopicName },
      {
        $push: {
          "subtopics.$.questions": {
            questionId: uuidv4(),
            questionText: questionText,
            questionImage: questionImageUrl,
            answer,
            solutionImage: solutionImageUrl,
            status: questionStatus,
          },
        },
      },
      { new: true }
    )
    const newData = await getGradeTopics(gradeLevel, questionType)
    return res.status(200).json({ msg: "Savol yaratildi", newData })
  } catch (err) {
    res.status(500).json({ error: "Error adding question", err })
  }
})
router.patch("/open-ended/questions/edit", authMiddleware, upload, async (req, res) => {
  try {
    const {
      gradeLevel,
      questionText,
      answer,
      subTopicName,
      questionStatus,
      questionId,
      questionType,
    } = req.body

    const questionImageFile = req.files["questionImage"]?.[0] || null
    const solutionImageFile = req.files["solutionImage"]?.[0] || null

    const questionImageUrl = questionImageFile
      ? await uploadToCloudinary(questionImageFile.buffer, `question_${uuidv4()}`)
      : null

    const solutionImageUrl = solutionImageFile
      ? await uploadToCloudinary(solutionImageFile.buffer, `solution_${uuidv4()}`)
      : null

    const updateFields = {
      "subtopics.$.questions.$[elem].questionText": questionText,
      "subtopics.$.questions.$[elem].answer": answer,
      "subtopics.$.questions.$[elem].status": questionStatus,
    }

    // Handle questionImage - if new image URL exists, set it; else keep existing
    if (questionImageUrl) {
      updateFields["subtopics.$.questions.$[elem].questionImage"] = questionImageUrl
    }
    // If no new question image, ensure we don't overwrite the existing one
    else if (
      req.body.questionImage !== undefined &&
      req.body.questionImage !== null &&
      req.body.questionImage !== "null"
    ) {
      updateFields["subtopics.$.questions.$[elem].questionImage"] = req.body.questionImage
    }
    // Handle solutionImage
    if (solutionImageUrl) {
      updateFields["subtopics.$.questions.$[elem].solutionImage"] = solutionImageUrl
    }
    // If no new solution image, ensure we don't overwrite the existing one
    else if (
      req.body.solutionImage !== undefined &&
      req.body.solutionImage !== null &&
      req.body.solutionImage !== "null"
    ) {
      updateFields["subtopics.$.questions.$[elem].solutionImage"] = req.body.solutionImage
    }
    await TopicAndQuestion.findOneAndUpdate(
      {
        "subtopics.subtopicname": subTopicName,
        "subtopics.questions.questionId": questionId,
      },
      { $set: updateFields },
      {
        new: true,
        arrayFilters: [{ "elem.questionId": questionId }],
      }
    )
    const newData = await getGradeTopics(gradeLevel, questionType)
    res.status(200).json({
      msg: "Savol muvaffaqiyatli o'zgartirildi",
      newData,
    })
  } catch (e) {
    res.status(500).json({ error: "Error editing question", e })
  }
})

module.exports = router
