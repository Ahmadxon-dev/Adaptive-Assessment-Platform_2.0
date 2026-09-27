import React, {useEffect, useState, useRef, useCallback} from "react";
import {useNavigate, useParams} from "react-router-dom";
import {Loader2} from "lucide-react";
import {useDispatch, useSelector} from "react-redux";
import {removeAnswer, setTest, updateAnswer} from "@/features/test/testSlice.js";
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card.jsx";
import {RadioGroup, RadioGroupItem} from "@/components/ui/radio-group";
import {Label} from "@/components/ui/label.jsx";
import {Button} from "@/components/ui/button.jsx";
import Loader from "@/components/ui/Loader.jsx";
import {
    Dialog,
    DialogContent,
    DialogTrigger
} from "@/components/ui/dialog.jsx";
import {Input} from "@/components/ui/input.jsx";

function TestPage() {
    const {testId} = useParams()
    const [answers, setAnswers] = useState([])
    const [loading, setLoading] = useState(true)
    const test = useSelector((state) => state.test.testData)
    const [loadingforEachQuestion, setLoadingforEachQuestion] = useState(false)
    const [isTestSubmitted, setIsTestSubmitted] = useState(false)
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [currentIndex, setCurrentIndex] = useState(Number(sessionStorage.getItem("currentIndex")) || 0)
    sessionStorage.setItem("currentIndex", Number.parseInt(currentIndex, 10))
    const [timeLeft, setTimeLeft] = useState(() => {
        return JSON.parse(sessionStorage.getItem("timer")) || (test && test.remainingTime) || 0;
    })
    const [selectedOption, setSelectedOption] = useState(null)
    const hours = Math.floor(timeLeft / 3600)
    const minutes = Math.floor((timeLeft % 3600) / 60)
    const seconds = timeLeft % 60
    const [loadingForSubmit, setLoadingForSubmit] = useState(false)
    const timerInterval = useRef(null); // Ref to hold the interval

    const handleAnswerSelect = (selectedAnswer) => {
        setAnswers(prev => {
            const copy = [...prev]; // [{questionIndex, selectedAnswer}, ...]
            const idx = copy.findIndex(a => a.questionIndex === currentIndex);
            if (idx >= 0) {
                copy[idx] = {questionIndex:currentIndex, selectedAnswer };
            } else {
                copy.push({ questionIndex:currentIndex, selectedAnswer });
            }
            localStorage.setItem(testId, JSON.stringify(copy));
            return copy;
        });
        setSelectedOption(selectedAnswer);
        dispatch(updateAnswer({ index: currentIndex, answer:selectedAnswer }));
    };
    const handleSubmit = useCallback( async ()=>{
        setLoadingForSubmit(true);
        await fetch(`${import.meta.env.VITE_SERVER}/test/submit/${testId}`, {
            method: "PUT",
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                remainingTime: timeLeft,
                isCompleted: true,
                answers
            }),
        })
        sessionStorage.removeItem("timer");
        sessionStorage.removeItem("currentIndex");
        localStorage.removeItem(testId)
        setIsTestSubmitted(true);
        setLoadingForSubmit(false);
        navigate("/results");
    }, [timeLeft, answers, testId, navigate])


    useEffect(() => {
        setLoading(true);
        fetch(`${import.meta.env.VITE_SERVER}/test/${testId}`, { headers: {Authorization: `Bearer ${localStorage.getItem("token")}`}})
            .then((res) => res.json())
            .then((data) => {
                if (data.isCompleted){
                    navigate("/results")
                }
                dispatch(setTest(data));
                let storedIndex = 0;
                if (!isTestSubmitted) {
                    storedIndex = Number(sessionStorage.getItem("currentIndex")) || 0;
                }
                setCurrentIndex(storedIndex);
                setSelectedOption(data.questions[storedIndex]?.selectedAnswer || null);
                const savedAnswers = JSON.parse(localStorage.getItem(testId))
                if(savedAnswers){
                    savedAnswers.forEach(el=>dispatch(updateAnswer({index:el.questionIndex, answer: el.selectedAnswer})))
                }
                if (!sessionStorage.getItem("timer")) {
                    setTimeLeft(data.remainingTime);
                    sessionStorage.setItem("timer", JSON.stringify(data.remainingTime));
                } else {
                    setTimeLeft(JSON.parse(sessionStorage.getItem("timer")) || data.remainingTime || 0);
                }

                setLoading(false);
            })
            .catch(error => {
                console.error("Error fetching test data:", error);
                setLoading(false);
                // Optionally handle error state, e.g., display an error message
            });
    }, [testId, isTestSubmitted, dispatch, navigate]);

    useEffect(() => {
        sessionStorage.setItem("timer", JSON.stringify(timeLeft));
    }, [timeLeft]);

    useEffect(() => {
        if (timeLeft <= 0) {
            handleSubmit();
            return;
        }

        timerInterval.current = setInterval(() => {
            setTimeLeft((prevTime) => {
                if (prevTime <= 1) {
                    clearInterval(timerInterval.current);
                    handleSubmit();
                    return 0;
                }
                return prevTime - 1;
            });
        }, 1000);

        return () => clearInterval(timerInterval.current); // Clear the interval on unmount
    }, [timeLeft, handleSubmit]); // Include handleSubmit in dependency array

    const handleNext = () => {
        if (currentIndex < test.questions.length - 1) {
            handleQuestionChange(currentIndex + 1);
        }
    };

    const handlePrevious = () => {
        if (currentIndex > 0) {
            handleQuestionChange(currentIndex - 1);
        }
    };


    const handleRemoveAnswerSelect = () => {
        setSelectedOption(null);
        dispatch(removeAnswer({index: currentIndex}));
        setAnswers(prev=>{
            const copy = [...prev]
            const newAnswers = copy.filter(el=> el.questionIndex !== currentIndex)
            localStorage.setItem(testId, JSON.stringify(newAnswers))
            return newAnswers
        })
    };

    useEffect(() => {
        const saved = localStorage.getItem(testId);
        if (saved) {
            setAnswers(JSON.parse(saved));
        }
    }, []);
    const handleQuestionChange = (index) => {
        setCurrentIndex(index);
        setSelectedOption(test.questions[index]?.selectedAnswer || null);
    };

    if (loading) {
        return (
            <Loader />
        );
    }
    return (
        <div className=" bg-gray-100 h-screen py-12 px-4 sm:px-6 lg:px-8">
            <Card className="w-full mx-auto">
                <CardHeader className="border-b pb-4">
                    <div className="flex flex-col md:flex-row justify-between items-center">
                        <CardTitle className="text-md  font-bold text-center my-2 md:my-0">
                            Mavzular: {test?.subtopicname?.map((subtopic, index) => (
                                <span key={subtopic}>
                                    {subtopic}{index !== (test?.subtopicname?.length || 0) - 1 ? ', ' : ''}
                                </span>
                            ))}
                        </CardTitle>
                        <div className="text-sm text-gray-500">
                            Savol {+currentIndex + 1}/{test?.questions?.length}
                        </div>
                    </div>
                </CardHeader>
                <div className="grid grid-cols-12 gap-4">
                    <CardContent className="col-span-10 justify-center px-8 py-6">
                        {
                            loadingforEachQuestion && <div className="absolute inset-0 flex items-center justify-center bg-white/80 rounded-lg">
                                <div className="flex flex-col items-center gap-3">
                                    <Loader2 className="h-8 w-8 animate-spin text-green-600" />
                                    <p className="text-sm text-gray-600">Javobingiz saqlanmoqda...</p>
                                </div>
                            </div>
                        }

                        <div className="mb-4">
                            <div className="h-2 w-full bg-gray-200 rounded-full overflow-hidden">
                                <div
                                    className="h-full bg-green-500 transition-all duration-300"
                                    style={{
                                        width: `${(test?.questions?.filter(q => q.selectedAnswer)?.length / (test?.questions?.length || 1)) * 100}%`
                                    }}
                                ></div>
                            </div>
                            <div className="text-sm text-center mt-1">
                                {test?.questions?.filter(q => q.selectedAnswer)?.length} / {test?.questions?.length} javob
                                berilgan
                            </div>
                        </div>
                        <div className="mb-6">
                            <h2 className="text-2xl font-semibold mb-12 text-start">{test?.questions?.[currentIndex]?.status==="b"?<span className={`text-lg`}>Bilish: </span>:(test?.questions?.[currentIndex]?.status==="q")?<span className={`text-lg`}>Qo'llash: </span>:(test?.questions?.[currentIndex]?.status==="m")?<span className={`text-lg`}>Mulohaza: </span>:""}{test?.questions?.[currentIndex]?.questionText}</h2>
                            {test?.questions?.[currentIndex]?.questionImage && (
                                <>

                                    <Dialog>
                                        <DialogTrigger>
                                            <img
                                                src={test?.questions?.[currentIndex]?.questionImage}
                                                className={`w-full h-full mx-auto`}
                                                alt="rasm"
                                            />
                                        </DialogTrigger>
                                        <DialogContent>
                                                <img
                                                    src={test?.questions?.[currentIndex]?.questionImage}
                                                    className={`w-[90vw] h-full object-contain mx-auto`}
                                                    alt="rasm"
                                                />
                                        </DialogContent>
                                    </Dialog>
                                </>

                            )}

                            {
                                test.questionType==="multiple-choice"
                                ?
                                <RadioGroup
                                    value={
                                        test?.questions?.[currentIndex]?.selectedAnswer
                                            ? test?.questions?.[currentIndex]?.selectedAnswer
                                            : selectedOption
                                    }
                                    onValueChange={(e) => handleAnswerSelect(e)}
                                    className="space-y-8"
                                >

                                    {test?.questions?.length > 0
                                        ? Object.values(test?.questions?.[currentIndex]?.options || {}).map((option, index) => (
                                            <div key={option.text} className="flex items-center space-x-4">
                                                <RadioGroupItem value={"option" + Number(index + 1)} id={`option-${index}`}/>
                                                <Label htmlFor={`option-${index}`}
                                                       className="text-xl flex justify-between items-center">
                                                    {option?.text}
                                                    {option?.image && (
                                                        <img src={option.image} className={`w-56 h-56`}
                                                             alt="rasm"/>
                                                    )}
                                                </Label>
                                            </div>
                                        ))
                                        : "Testda savollar yo'q"}
                                    <Button variant={"outline"} className={`w-fit `} onClick={handleRemoveAnswerSelect}>
                                        Belgilanganlarni o'chirish
                                    </Button>
                                </RadioGroup>
                                    :
                                    <div className={`mt-5`}>
                                        <p className={`font-semibold`}>Javobingizni yozing:</p>
                                        <Input type={"text"} className={``}
                                            placeholder={"Bu yerga javobingizni kiriting..."}
                                               onChange={e=>handleAnswerSelect(e.target.value)}
                                               value={test?.questions?.[currentIndex]?.selectedAnswer}
                                        />
                                    </div>
                            }


                        </div>
                    </CardContent>

                    {/* Question navigation card on the right */}
                    <div className="w-full p-4 col-span-2 border-l border-gray-200">
                        <div className="sticky top-4">
                            <h2 className="text-2xl text-center mb-4  font-medium">
                                {hours < 10 ? `0${hours}` : hours}:{minutes < 10 ? `0${minutes}` : minutes}:
                                {seconds < 10 ? `0${seconds}` : seconds}
                            </h2>
                            <div className="grid gap-2 grid-cols-[repeat(auto-fit,minmax(48px,1fr))]">
                                {test?.questions?.map((_, index) => (
                                    <Button
                                        key={index}
                                        variant={
                                            currentIndex === index ? "default" : test?.questions?.[index]?.selectedAnswer ? "secondary" : "outline"
                                        }
                                        onClick={() => handleQuestionChange(index)}
                                        className={`h-10 w-10 p-0 ${
                                            test?.questions?.[index]?.selectedAnswer
                                                ? "bg-green-100 hover:bg-green-200 text-green-800 border-green-300"
                                                : ""
                                        }`}
                                    >
                                        {index + 1}
                                    </Button>
                                ))}
                            </div>

                            <div className="flex flex-col gap-3 mt-8">
                                <Button
                                    size="lg"
                                    variant="outline"
                                    onClick={handlePrevious}
                                    disabled={currentIndex === 0}
                                    className="w-full"
                                >
                                    Ortga
                                </Button>

                                {currentIndex < (test?.questions?.length || 0) - 1 && (
                                    <Button size="lg" className="w-full" onClick={handleNext}>
                                        Keyingisi
                                    </Button>
                                )}

                                {currentIndex === (test?.questions?.length || 0) - 1 && (
                                    <Button size="lg" className="w-full" onClick={handleSubmit} disabled={loadingForSubmit}>
                                        Topshirish
                                        {loadingForSubmit && <Loader variant={"small"}/> }
                                    </Button>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </Card>
        </div>
    );
}

export default React.memo(TestPage);
