import { useLoaderData } from "react-router-dom";
import Typewriter from "typewriter-effect";

const Course = () => {
    const loader = useLoaderData()
    return (
        <div>
            <p className="text-center mt-5 text-2xl md:text-4xl font-bold text-black">This {loader.name} course will be <span>
            <Typewriter
                  options={{
                    strings: ["Coming soon..."],
                    autoStart: true,
                    loop: true,
                    deleteSpeed: 50,
                  }}
                />
                </span></p>
        </div>
    );
};

export default Course;