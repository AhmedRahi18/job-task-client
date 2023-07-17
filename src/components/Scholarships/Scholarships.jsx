import { useLoaderData } from "react-router-dom";
import Typewriter from "typewriter-effect";

const Scholarships = () => {
    const loader = useLoaderData()
    return (
        <div>
            <h1 className=" text-center mt-5 text-2xl md:text-4xl font-bold text-black">Scholarships of {loader.name} <span> will be
            <Typewriter
                  options={{
                    strings: ["Coming soon..."],
                    autoStart: true,
                    loop: true,
                    deleteSpeed: 50,
                  }}
                />
                </span></h1>
        </div>
    );
};

export default Scholarships;