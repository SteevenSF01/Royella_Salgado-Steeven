import { BsArrowRight, BsChevronLeft, BsChevronRight } from "react-icons/bs";
import BreadCrumb from "../../BreadCrumb/BreadCrumb";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import BlogSideBar from "./BlogSideBar";
import moment from "moment";
import axios from "axios";

const Blog = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [blogData, setBlogData] = useState([]);
  const [filterTitle, setFilterTitle] = useState("")

  const formatDate = (date) => {
    return moment(date).format("MMMM D, YYYY");
  };

  useEffect(() => {
    const fetchData = async (page = 1, title = "") => {
      const response = await axios.get(`/api/backoffice/blog?page=${page}&title=${title}`);
      setBlogData(response.data.results);
      setTotalPages(Math.ceil(response.data.count / 6));  
    };
    fetchData(currentPage, filterTitle); 
  }, [currentPage, filterTitle]);

  const handleNextPage = () => {
    if (currentPage < totalPages) {
        setCurrentPage(prevPage => prevPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
        setCurrentPage(prevPage => prevPage - 1);
    }
  };

  const handleFilterChange = (e) => {
    setFilterTitle(e.target.value); 
    setCurrentPage(1);
  };

  return (
    <div>
      <BreadCrumb title="Blog" />
      <div className="dark:bg-lightBlack py-20 2xl:py-[120px]">
        <div className="Container grid grid-cols-6 md:grid-cols-7 lg:grid-cols-6 gap-5 ">
          <div className="col-span-6 md:col-span-4">
            <div className="grid items-center gap-5 2xl:gap-y-[30px] grid-cols-1 lg:grid-cols-2">
              {blogData && blogData.map((blog) => (
                <div key={blog.id}
                  className="overflow-hidden 3xl:w-[410px] group"
                  data-aos="fade-up"
                  data-aos-duration="1000"
                >
                  <div className="relative h-[300px]">
                    <img
                      src={blog.image}
                      className="w-full h-full object-cover"
                      alt={blog.titre}
                    />
                  </div>
                  <div className="font-Garamond border border-[#ddd] dark:border-gray border-t-0">
                    <div className="py-6 px-[30px] h-[170px] ">
                      <div className="flex items-center space-x-6  ">
                        <p className="text-sm 2xl:text-base leading-[26px] text-gray dark:text-lightGray font-normal uppercase mr-7 ml-3 relative before:absolute before:w-[7px] before:h-[7px] before:left-[-13px] before:bg-[#d1d1d1] dark:before:bg-khaki before:top-[9px]">
                          {formatDate(blog.posted_on)}
                        </p>
                        <p className="text-sm 2xl:text-base leading-[26px] text-gray dark:text-lightGray font-normal uppercase mr-7 ml-3 relative before:absolute before:w-[7px] before:h-[7px] before:left-[-13px] before:bg-[#d1d1d1] dark:before:bg-khaki before:top-[9px]">
                          Interior
                        </p>
                      </div>
                      <Link
                        to={`/blog_details/${blog.id}`}
                        state={{
                          title: "How to Book a Room online Step by Step Guide",
                        }}
                      >
                        <h2 className="text-xl md:text-[22px] xl:text-2xl 2xl:text-[26px] leading-[34px] font-semibold text-lightBlack dark:text-white py-2 sm:py-3 md:py-4 hover:underline underline-offset-2 line-clamp-2">
                          {blog.titre}
                        </h2>
                      </Link>
                    </div>
                    <div className="  border-t-[1px] border-[#ddd] dark:border-gray py-2 sm:py-3 md:py-4 xl:py-5">
                      <Link
                        to={`/blog_details/${blog.id}`}
                        className="px-[30px] flex items-center justify-between "
                      >
                        <div className="">
                          <span className=" text-sm sm:text-base flex items-center ">
                            <span className="ml-[10px] leading-[38px] uppercase text-lightBlack dark:text-white font-medium group-hover:text-khaki hover:underline  underline-offset-1">
                              Read More
                            </span>
                          </span>
                        </div>
                        <span className="">
                          <BsArrowRight
                            className="text-gray dark:text-lightGray group-hover:text-khaki"
                            size={"24px"}
                          />
                        </span>
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <Link to="/create_blog">
                <button className="bg-khaki hover:bg-[rgba(141,115,77,0.9)] text-white font-bold py-2 px-4 rounded mt-5">Create a new blog</button>
            </Link>
            <div className="hidden sm:flex mt-5 items-center lg:space-x-5  space-x-3">
              <button
                className="w-[30px] h-[30px] lg:w-[50px] lg:h-[50px] flex items-center justify-center border-[1px] border-gray  text-lightGray hover:bg-khaki hover:border-none group"
                onClick={handlePrevPage}
                disabled={currentPage === 1}
              >
                <BsChevronLeft className="w-5 h-5 text-gray  group-hover:text-white " />
              </button>
              <span className="flex items-center justify-center text-lightBlack dark:text-white">
                {currentPage} / {totalPages}
              </span>
              <button
                className="w-[30px] h-[30px] lg:w-[50px] lg:h-[50px] flex items-center justify-center border-[1px] border-gray  text-lightGray hover:bg-khaki hover:border-none group"
                onClick={handleNextPage}
                disabled={currentPage === totalPages}
              >
                <BsChevronRight className="w-5 h-5 text-gray  group-hover:text-white " />
              </button>
            </div>
          </div>
          <div className="col-span-6 md:col-span-3 lg:col-span-2">
            <BlogSideBar filterTitle={filterTitle} handleFilterChange={handleFilterChange} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Blog;
