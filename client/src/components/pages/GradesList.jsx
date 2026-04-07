import React, {useEffect, useState} from 'react';
import {Link} from "react-router-dom";

function GradesList(props) {
    const [data, setData] = useState(["7", "8", "9", "10", "11", "abituriyent", "attestatsiya"])
    const [imagesArray, setImg] = useState(["./7.webp", "./8.webp", "./9.jpg", "./10.webp", "./11.jpg", "./abituriyent.jpg", "./attestatsiya.jpg"])
    const [firstPart, setFirstPart] = useState(data.slice(0,5));
    const [secondPart, setSecondPart] = useState(data.slice(5, 7));


    return (
        <div className={`bg-gray-100 h-screen`}>

        <div className={`space-y-10 pt-20`}>
            <p className="text-3xl font-bold text-center text-gray-900">Test Yechish</p>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-6 mb-12">
                {
                    firstPart.map(element => {
                        return <div key={element} className="flex flex-col items-center">
                            <Link to={`${element}`} className="bg-white rounded-lg shadow-md p-4 mb-3 hover:shadow-lg transition-shadow cursor-pointer">
                                <img
                                    src={imagesArray[data.indexOf(element)]}
                                    alt="Fizika  textbook cover"
                                    className="w-full h-48 object-cover rounded"
                                />
                            </Link>
                            <span className="bg-white px-4 py-2 rounded-full text-sm font-medium text-gray-700 shadow-sm">{element}-sinf</span>
                        </div>
                    })
                }
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                {
                    secondPart.map(element => {
                        return <div key={element} className="flex flex-col items-center">
                            <Link to={element} className="bg-white rounded-lg shadow-md p-4 mb-3 hover:shadow-lg transition-shadow cursor-pointer w-full">
                                <img
                                    src={imagesArray[data.indexOf(element)]}
                                    alt="Abituriyent - celebrating students"
                                    className="w-full h-48 object-cover rounded"
                                />
                            </Link>
                            <span className="bg-white px-6 py-3 rounded-full text-lg font-medium text-gray-700 shadow-sm">
                              {element.charAt(0).toUpperCase() + element.slice(1)}
                            </span>
                        </div>

                    })
                }
            </div>
        </div>
        </div>
    );
}

export default GradesList;