import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import { FaAngleDown, FaHome, FaSearch } from "react-icons/fa";
import { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import Universities from "../Universities/Universities";
import guide from "../../../public/Education-Guide.pdf";

const Home = () => {
  const [universities, setUniversities] = useState([]);
  const [allUni, setAllUni] = useState([]);
  const [selectedScholarship, setSelectedScholarship] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const [search, setSearch] = useState("");
  const [visible, setVisible] = useState(false);
  const [show, setShow] = useState(false);
  const [courses, setCourses] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState("");
  const [filteredCourses, setFilteredCourses] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/university")
      .then((res) => res.json())
      .then((data) => setUniversities(data));
  }, []);

  useEffect(() => {
    setFilteredCourses(
      courses.filter((course) =>
        course.name.toLowerCase().includes(search.toLowerCase())
      )
    );
  }, [search, courses]);

  const handleSearch = () => {
    fetch(`http://localhost:5000/universitySearch/${search}`)
      .then((res) => res.json())
      .then((data) => {
        setAllUni(data);
        setVisible(true);
      });
  };

  const handleDropdownClick = () => {
    setShowDropdown(!showDropdown);
  };

  const handleSelectOption = (option) => {
    setSelectedScholarship(option);
    setShowDropdown(false);
  };

  const handleInvisible = () => {
    setVisible(false);
  };

  const handleShow = () => {
    setShow(!show);
    fetch(`http://localhost:5000/course`)
      .then((res) => res.json())
      .then((data) => {
        setCourses(data);
        setVisible(true);
      });
  };

  const firstTabPanelRef = useRef();

  useEffect(() => {
    document.addEventListener("click", handleOutsideClick);

    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, []);

  const handleOutsideClick = (event) => {
    if (firstTabPanelRef.current && !firstTabPanelRef.current.contains(event.target)) {
      setShow(false);
    }
  };

  return (
    <div>
      <div className="bg-[url('https://www.7skyconsultancy.com/assets/images/study-in-uk-slide.jpg')] bg-cover h-[500px]">
        <div className="relative md:ps-28 ms-5 top-40">
          <Tabs>
            <TabList className="text-white mb-5 -ms-3 font-semibold">
              <Tab>Courses</Tab>
              <Tab>Scholarships</Tab>
              <Tab>Universities</Tab>
              <Tab>Website Search</Tab>
              <a href={guide} download="guide">
                <button className="btn shadow-2xl text-xs font-bold btn-warning text-white mt-5 ms-2">
                  Download <br /> Education Guide
                </button>
              </a>
            </TabList>
            <TabPanel>
              <div className="md:flex -ms-3">
                <div ref={firstTabPanelRef}>
                  <div
                    onClick={handleShow}
                    className="p-2 pb-3 bg-white rounded w-80 md:w-72 border-2 border-blue-700 font-semibold cursor-pointer"
                  >
                    <div className="flex justify-between items-center">
                      <p className="md:w-80">{selectedCourse || "Choose a subject or enter keyword"}</p>
                      <FaAngleDown></FaAngleDown>
                    </div>
                  </div>
                  {show && (
                    <div>
                      <div>
                        <input
                          className="p-2 border-2 border-gray-300 rounded w-80 md:w-72"
                          type="text"
                          placeholder="Search..."
                          value={search}
                          onChange={(e) => setSearch(e.target.value)}
                        />
                      </div>
                      <div className="h-24 w-80 md:w-72 overflow-auto rounded">
                        {filteredCourses.map((course) => (
                          <ul className="bg-white " key={course._id}>
                            <li
                              className="font-semibold"
                              onClick={() => {
                                setSelectedCourse(course.name);
                                setShow(false);
                              }}
                            >
                              {course.name}
                            </li>
                          </ul>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
                <div>
                  <select className="select border-2 border-blue-700 rounded w-52">
                    <option>Postgraduate</option>
                    <option>Undergraduate</option>
                    <option>English Language</option>
                    <option>Research</option>
                    <option>Online</option>
                  </select>
                  {selectedCourse ? (
                    <Link to={`/course/${selectedCourse}`}>
                      <button className="p-3 pb-4 bg-blue-700 text-white rounded">
                        <FaSearch />
                      </button>
                    </Link>
                  ) : (
                    <button className="p-3 pb-4 bg-blue-700 text-white rounded cursor-not-allowed" disabled>
                      <FaSearch />
                    </button>
                  )}
                  <Link to="/">
                    <button className="bg-blue-800 rounded p-3 pb-4 text-white ms-2">
                      <FaHome />
                    </button>
                  </Link>
                </div>
              </div>
            </TabPanel>

            <TabPanel>
              <div className="flex">
                <div className="relative">
                  <input
                    type="text"
                    className="p-2 -ms-3 rounded md:w-[500px] border-2 border-blue-700 font-semibold"
                    placeholder="Search Scholarships..."
                    onClick={handleDropdownClick}
                    value={selectedScholarship}
                    readOnly
                  />
                  {showDropdown && (
                    <div className="absolute -ms-3 mt-2 bg-white rounded md:w-[500px] shadow h-36 overflow-auto">
                      {universities.map((university) => (
                        <ul key={university._id} className="list-none">
                          <li
                            className="cursor-pointer p-2 font-semibold hover:bg-gray-200"
                            onClick={() => handleSelectOption(university.name)}
                          >
                            {university.name}
                          </li>
                        </ul>
                      ))}
                    </div>
                  )}
                </div>
                <div>
                  {selectedScholarship ? (
                    <div>
                      <Link to={`/university/${selectedScholarship}`}>
                        <button
                          onClick={handleInvisible}
                          className="p-3 pb-4 bg-blue-700 text-white rounded"
                        >
                          <FaSearch />
                        </button>
                      </Link>
                      <Link to="/">
                        <button className="bg-blue-800 rounded p-3 pb-4 text-white ms-2">
                          <FaHome />
                        </button>
                      </Link>
                    </div>
                  ) : (
                    <div>
                      <button
                        className="p-3 pb-4 bg-blue-700 text-white rounded cursor-not-allowed"
                        disabled
                      >
                        <FaSearch />
                      </button>
                      <Link to="/">
                        <button className="bg-blue-800 rounded p-3 pb-4 text-white ms-2">
                          <FaHome />
                        </button>
                      </Link>
                    </div>
                  )}
                </div>
              </div>
            </TabPanel>

            <TabPanel>
              <input
                type="text"
                onChange={(e) => setSearch(e.target.value)}
                className="p-2 -ms-3 rounded md:w-[500px] border-2 border-blue-700 font-semibold"
                placeholder="Search by university name..."
              />
              <Link>
                <button
                  onClick={handleSearch}
                  className="p-3 pb-4 bg-blue-700 text-white rounded"
                >
                  <FaSearch />
                </button>
              </Link>
              <Link to="/">
                <button className="bg-blue-800 rounded p-3 pb-4 text-white ms-2">
                  <FaHome />
                </button>
              </Link>
            </TabPanel>

            <TabPanel>
              <input
                type="text"
                className="p-2 -ms-3 rounded md:w-[500px] border-2 border-blue-700 font-semibold"
                placeholder="Search our website..."
              />
              <button className="p-3 pb-4 bg-blue-700 text-white rounded">
                <FaSearch />
              </button>
              <Link to="/">
                <button className="bg-blue-800 rounded p-3 pb-4 text-white ms-2">
                  <FaHome />
                </button>
              </Link>
            </TabPanel>
          </Tabs>
        </div>
      </div>
      {visible && (
        <div>
          {allUni.map((singleUni, index) => (
            <Universities key={singleUni._id} singleUni={singleUni} index={index + 1} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Home;
