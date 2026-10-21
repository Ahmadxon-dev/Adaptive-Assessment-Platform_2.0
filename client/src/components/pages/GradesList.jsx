import {Link} from "react-router-dom";

const grades = [
    { name: "7", image: "./7.webp" },
    { name: "8", image: "./8.webp" },
    { name: "9", image: "./9.jpg" },
    { name: "10", image: "./10.webp" },
    { name: "11", image: "./11.jpg" },
    { name: "abituriyent", image: "./abituriyent.jpg" , link: "abituriyent"},
    { name: "attestatsiya", image: "./attestatsiya.jpg" , link: "attestatsiya"},
    { name: "Ixtisoslashgan Maktab", image: "./ixtisos-sinflar.png" , link: 'ixtisos-sinflar'},
  ];

function GradesList() {
    const firstPart = grades.slice(0, 5);
    const secondPart = grades.slice(5);

    return (
        <div className="bg-gray-100 min-h-screen">
          <div className="space-y-10 pt-20">
            <p className="text-3xl font-bold text-center text-gray-900">
              Test Yechish
            </p>
    
            <div className="grid grid-cols-2 md:grid-cols-5 gap-6 mb-12">
              {firstPart.map((grade) => (
                <div key={grade.name} className="flex flex-col items-center">
                  <Link
                    to={grade.name}
                    className="bg-white rounded-lg shadow-md p-4 mb-3 hover:shadow-lg transition-shadow cursor-pointer"
                  >
                    <img
                      src={grade.image}
                      alt={`${grade.name}-sinf`}
                      className="w-full h-48 object-cover rounded"
                    />
                  </Link>
    
                  <span className="bg-white px-4 py-2 rounded-full text-sm font-medium text-gray-700 shadow-sm">
                    {grade.name}-sinf
                  </span>
                </div>
              ))}
            </div>
    
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {secondPart.map((grade) => (
                <div key={grade.name} className="flex flex-col items-center">
                  <Link
                    to={grade.link}
                    className="bg-white rounded-lg shadow-md p-4 mb-3 hover:shadow-lg transition-shadow cursor-pointer w-full"
                  >
                    <img
                      src={grade.image}
                      alt={grade.name}
                      className="w-full h-48 object-cover rounded"
                    />
                  </Link>
    
                  <span className="bg-white px-6 py-3 rounded-full text-lg font-medium text-gray-700 shadow-sm">
                    {grade.name.charAt(0).toUpperCase() + grade.name.slice(1)}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      );
}

export default GradesList;