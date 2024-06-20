import { Link, useLocation } from "react-router-dom";
import BreadCrumb from "../../BreadCrumb/BreadCrumb";
import BlogSideBar from "./BlogSideBar";
import { BiChevronsRight } from "react-icons/bi";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import moment from "moment";
import { useAuth } from "../../backoffice/pages/loginProvider/LoginProvider";

const BlogDetails = () => {
  const { id } = useParams();
  const {user} = useAuth();
  const [dataBlog, setDataBlog] = useState([]);
  const [randomBlogs, setRandomBlogs] = useState('');
  const [newComment, setNewComment] = useState({})
  useEffect(() => {
    setNewComment({
      contenue: '',
      auteur_id: user.id,
      blog_id: parseInt(id)
    });
  }, [user]);


  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`/api/backoffice/blog/${id}`);
        setDataBlog(res.data);

        const resRandom = await axios.get(`/api/backoffice/blog/random/`);
        setRandomBlogs(resRandom.data);

      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, [id]);

    const {comments} = dataBlog;
    const firstComment = comments?.length > 0 ? comments[0] : null;
    const commentsRestant = comments?.slice(1);

    const handleChange = (e) => {
      const { name, value } = e.target;
      setNewComment({ ...newComment, [name]: value });
    };

    const handleSubmit = async (e) => {
      e.preventDefault();
      try{
        const res = await axios.post(`/api/backoffice/comment/add/`, newComment);
      }catch(err){
        console.log(err);
      }
      window.location.reload()
    }

  const formatDate = (date) => {
    return moment(date).format("MMMM D, YYYY");
  };

  const location = useLocation();
  const blogData = location.state && location.state;

  return (
    <div>
      <BreadCrumb title="Blog Details" />
      {/* Blog Details */}
      <div className="dark:bg-lightBlack py-20 2xl:py-[120px]">
        <div className="Container grid grid-cols-6 md:grid-cols-7 lg:grid-cols-6 gap-5 ">
          <div className="col-span-6 md:col-span-4 w-full">
            <img
              src={dataBlog.image}
              alt={dataBlog.titre}
              data-aos="fade-up"
              data-aos-duration="1000"
              className="w-full"
            />
            {/* Blog Details content */}
            <div className="pt-5 lg:pt-[35px]  pr-3">
              <div data-aos="fade-up" data-aos-duration="1000">
                <p className="text-base font-Garamond text-gray dark:text-lightGray">
                  <span>{formatDate(dataBlog.posted_on)}</span> <span className="mx-2">/</span>
                  <span> LUXURY HOTEL</span>
                </p>
                <h2 className="py-2 sm:py-3 md:py-4 lg:py-[19px] 2xl:py-[25px] font-Garamond text-[22px] sm:text-2xl md:text-3xl lg:text-4xl 2xl:text-[38px] 3xl:text-[40px] leading-6 lg:leading-[26px]  text-lightBlack dark:text-white font-semibold">
                  {blogData && blogData.title
                    ? blogData.title
                    : dataBlog.titre}
                </h2>
                <p className="text-sm lg:text-base leading-6 text-gray dark:text-lightGray font-normal font-Lora">
                  {dataBlog.description}
                </p>
                <p className="mt-5 2xl:mt-7 text-sm lg:text-base leading-6 text-gray dark:text-lightGray font-normal font-Lora">
                  Conveniently fashion pandemic potentialities for team driven
                  technologies. Proactively orchestrate robust systems rather
                  than user-centric vortals. Distinctively seize top-line
                  e-commerce with premier intellectual capital. Efficiently
                  strategize goal-oriented
                </p>
              </div>

              {/* Blog Roles */}
              <div
                className="pt-10 2xl:pt-[60px]"
                data-aos="fade-up"
                data-aos-duration="1000"
              >
                <h2
                  className="pb-2 sm:pb-3 md:pb-4 lg:pb-[19px] 2xl:pb-6
                font-Garamond text-lg sm:text-xl md:text-2xl xl:text-[28px] leading-6 lg:leading-7 text-lightBlack dark:text-white font-semibold"
                >
                  Rules & Regulations
                </h2>
                <p className="text-sm lg:text-base leading-6 text-gray dark:text-lightGray font-normal font-Lora">
                  Collaboratively redefine cutting-edge infrastructures whereas
                  open main convergence energistically simplify discover.
                  Quickly leverage others collaborative innovation after next-
                  generation applications.
                </p>
                <ul className="space-y-2 lg:space-y-3 ">
                  <li className="flex items-center">
                    <BiChevronsRight size={16} className="text-khaki mr-2" />
                    <span className="text-sm lg:text-base leading-[26px] text-gray dark:text-lightGray font-normal font-Lora">
                      Phosfluorescently envisioneer process done.
                    </span>
                  </li>
                  <li className="flex items-center">
                    <BiChevronsRight size={16} className="text-khaki mr-2" />
                    <span className="text-sm lg:text-base leading-[26px] text-gray dark:text-lightGray font-normal font-Lora">
                      Rapidiously deliver progressive experiences rather.
                    </span>
                  </li>
                  <li className="flex items-center">
                    <BiChevronsRight size={16} className="text-khaki mr-2" />
                    <span className="text-sm lg:text-base leading-[26px] text-gray dark:text-lightGray font-normal font-Lora">
                      Professionally actualize intuitive products via
                      multifunctiona.
                    </span>
                  </li>
                  <li className="flex items-center">
                    <BiChevronsRight size={16} className="text-khaki mr-2" />
                    <span className="text-sm lg:text-base leading-[26px] text-gray dark:text-lightGray font-normal font-Lora">
                      Conveniently extend covalent metrics.
                    </span>
                  </li>
                </ul>
              </div>

              {/* Extra blog */}
              <div
                className="pt-10 2xl:pt-[60px]"
                data-aos="fade-up"
                data-aos-duration="1000"
              >
                <div className="pb-2 sm:pb-3 md:pb-4 lg:pb-[19px] 2xl:pb-6 grid items-center grid-cols-1 sm:grid-cols-2 gap-5 2xl:gap-[30px]">
                  <img src={dataBlog.image} alt={dataBlog.titre} />
                  <img src="/images/inner/blog-details-3.jpg" alt="" />
                </div>
                <p className="text-sm lg:text-base leading-6 text-gray dark:text-lightGray font-normal font-Lora">
                  Interactively visualize top-line internal or organic sources
                  rather than top-line niche markets. Continually unleash 24/7
                  opportunities after high standards in process improvements.
                  Uniquely deploy impactful are methodologies with reliable
                  information. Synergistically revolutionize fully researched
                  manufactured items with optimal materials competently
                  envisioneer.
                </p>
                <p className="mt-5 2xl:mt-7 text-sm lg:text-base leading-6 text-gray dark:text-lightGray font-normal font-Lora">
                  Holisticly innovate global ROI with user-centric total
                  linkage. Collaboratively e-enable efficient markets with
                  multifunctional e-business. Continually incentivize
                  sustainable products for B2B
                </p>
              </div>

              <div
                className="my-10 py-5 border-t-[1px] border-b-[1px] border-lightGray dark:border-gray lg:flex items-center justify-between"
                data-aos="fade-up"
                data-aos-duration="1000"
              >
                <div className="flex items-center space-x-2">
                  <h5 className="text-lg text-[#101010] dark:text-white leading-[28px] font-semibold font-Garamond mr-2">
                    Tags :
                  </h5>
                  {dataBlog && dataBlog.tags?.map((tag)=>{
                    return(
                  <span className="text-sm border-[1px] border-lightGray dark:border-gray px-3 py-1 dark:text-white">
                    {tag.nom}
                  </span>                      
                    )
                  })}
                </div>
                {/* social Link */}
                <div className="flex items-center space-x-2 mt-3 lg:mt-0">
                  <h5 className="text-lg text-[#101010] dark:text-white leading-[28px] font-semibold font-Garamond mr-2">
                    Share :
                  </h5>
                  <Link
                    to="https://www.facebook.com/molengeek/?locale=es_LA"
                    className="text-sm  px-3 py-1 dark:text-white hover:text-khaki hover:underline underline-offset-4"
                  >
                    FB
                  </Link>
                  <Link
                    to="https://x.com/i/flow/login?redirect_after_login=%2Fmolengeek"
                    className="text-sm  px-3 py-1 dark:text-white hover:text-khaki hover:underline underline-offset-4"
                  >
                    TW
                  </Link>
                  <Link
                    to="https://be.linkedin.com/company/molengeek"
                    className="text-sm  px-3 py-1 dark:text-white hover:text-khaki hover:underline underline-offset-4"
                  >
                    LN
                  </Link>
                </div>
              </div>

              {/* gaideline */}
              <div className="lg:flex items-center gap-5 justify-between">
                  {
                    randomBlogs && randomBlogs.map((blog)=>{
                      return(
                        <div
                        className="p-5 w-[400px] line-clamp-1 hover:bg-whiteSmoke dark:hover:bg-normalBlack transition-all duration-300 border-[0.5px] border-lightGray dark:border-gray rounded-sm hover:border-whiteSmoke h-[130px] flex "
                        data-aos="fade-up"
                        data-aos-duration="1000"
                      >
                        <Link to={`/blog_details/${blog.id}`} className="flex items-center">
                          <img
                            src={blog.image}
                            className=" mr-3 2xl:mr-5 w-20 "
                            alt=""
                          />
                          <div className="text-left">
                            <h4 className="text-base 2xl:text-lg leading-6 text-[#101010] dark:text-white font-medium font-Garamond hover:underline underline-offset-4">
                              {blog.titre}
                            </h4>
                            <p className="text-sm md:text-[13px] 2xl:text-sm leading-[26px] font-Lora text-gray dark:text-lightGray font-normal">
                              {formatDate(blog.posted_on)}
                            </p>
                          </div>
                        </Link>
                      </div>
                      )
                    })
                  }

              </div>

              {/* Comment Section */}
              <div className="my-10 2xl:my-[60px] 3xl:my-[80px]">
                <h3 className="text-lg sm:text-xl lg:text-2xl xl:text-3xl 2xl:text-[32px] text-lightBlack dark:text-white font-semibold font-Garamond mb-5 2xl:mb-[30px]">
                  ‘{comments?.length}’ Comments
                </h3>
                <div>
                  <div
                    className="border-[1px] border-lightGray dark:border-gray rounded-sm p-4 sm:p-5 md:p-6 2xl:p-[30px]"
                    data-aos="fade-up"
                    data-aos-duration="1000"
                  >
                    <div className="grid gap-3 sm:flex md:grid md:gap-5 lg:flex ">
                      <img
                        src={firstComment?.auteur.photo}
                        alt={firstComment?.auteur.nom}
                        className="w-[70px]  h-[70px] "
                      />
                      <div className="ml-3 2xl:ml-4">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center">
                            <span className="text-base sm:text-lg lg:text-xl font-Garamond font-semibold leading-6 md:leading-7 text-lightBlack dark:text-white">
                              {firstComment?.auteur.first_name} {firstComment?.auteur.last_name}
                            </span>
                            <hr className="w-[10px] sm:w-[27px] h-[1px] text-lightBlack dark:text-white mx-1 sm:mx-2 " />
                            <span className="text-[13px] sm:text-[15px] font-Lora font-normal text-gray dark:text-lightGray">
                              {formatDate(firstComment?.posted_on)}
                            </span>
                          </div>
                        </div>
                        <p className="text-sm sm:text-[15px] font-Lora font-normal text-gray dark:text-lightGray mt-3 xl:mt-[15px]">
                          {firstComment?.contenue}
                        </p>
                      </div>

                    </div>

                  </div>
                  {/* comment -2 */}
                  {
                    commentsRestant && commentsRestant.map((comment)=> {
                      return(
                        <div
                        className="border-[1px] border-lightGray dark:border-gray rounded-sm p-4 sm:p-5 md:p-6 2xl:p-[30px] ml-0 lg:ml-10 3xl:ml-14  mt-5"
                        data-aos="fade-up"
                        data-aos-duration="1000"
                      >
                        <div className="grid gap-3 sm:flex md:grid md:gap-5 lg:flex ">
                          <img
                            src={comment.auteur.photo}
                            alt={comment.auteur.nom}
                            className="w-[70px]  h-[70px] "
                          />    
                          <div className="ml-3 2xl:ml-4">
                            <div className="flex items-center justify-between">
                              <div className="flex items-center">
                                <span className="text-base sm:text-lg lg:text-xl font-Garamond font-semibold leading-6 md:leading-7 text-lightBlack dark:text-white">
                                  {comment.auteur.first_name} {comment.auteur.last_name}
                                </span>
                                <hr className="w-[10px] sm:w-[27px] h-[1px] text-lightBlack dark:text-white mx-1 sm:mx-2 " />
                                <span className="text-[13px] sm:text-[15px] font-Lora font-normal text-gray dark:text-lightGray">
                                  {formatDate(comment.posted_on)}
                                </span>
                              </div>
                            </div>
                            <p className="text-sm sm:text-[15px] font-Lora font-normal text-gray dark:text-lightGray mt-3 xl:mt-[15px]">
                              {comment.contenue}
                            </p>
                          </div>
                        </div>
                      </div>
                      )
                    })
                  }

                </div>
              </div>
              {/* Comment form */}
              <div data-aos="fade-up" data-aos-duration="1000">
                <h3 className="text-lg sm:text-xl lg:text-2xl xl:text-3xl 2xl:text-[32px] text-lightBlack dark:text-white font-semibold font-Garamond mb-5 2xl:mb-[30px]">
                  Leave A Comments
                </h3>
                <div>
                  <div className="flex sm:flex-row flex-col items-center  gap-5 mb-5">
                  </div>
                  <div className="grid items-center gap-5 mb-5 md:mb-0">

                  <form onSubmit={(e) => handleSubmit(e)}> 
                    <textarea
                      className="w-full h-[160px]  border-none outline-none focus:ring-0 placeholder:text-base placeholder:text-lightGray placeholder:leading-[38px] placeholder:font-Lora placeholder:font-normal px-5 dark:bg-normalBlack bg-whiteSmoke dark:text-white resize-none"
                      placeholder="Type Your Comment"
                      name="contenue"
                      id=""
                      cols="30"
                      onChange={handleChange}
                    ></textarea>
                    <div className="flex items-center">
                    </div>
                    <button className="btn-primary" type="submit">Submit Now</button>
                </form>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Blog Sidebar */}
          <div className="col-span-6 md:col-span-3 lg:col-span-2">
            {/* imported Blog Sidebar */}
            <BlogSideBar />
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogDetails;

