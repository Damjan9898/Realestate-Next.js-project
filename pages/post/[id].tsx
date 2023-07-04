import getCurrentUser from "@/app/actions/getCurrentUser";
import LoginModal from "@/app/components/modals/LoginModal";
import RegisterModal from "@/app/components/modals/RegisterModal";
import Navbar from "@/app/components/navbar/Navbar";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import 'tailwindcss/tailwind.css';
import Cookies from "js-cookie";
import Slider, { CustomArrowProps } from "react-slick";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import { BsFillArrowLeftCircleFill, BsFillArrowRightCircleFill } from 'react-icons/bs';
import { CiLocationOn } from 'react-icons/ci'
import { AiOutlineMail} from 'react-icons/ai'
import OneLocationMap from "@/app/components/map/oneLocationMap";
import ProfileModal from "@/app/components/modals/ProfileModal";
import Footer from "@/app/components/footer/Footer";
import Head from 'next/head'



const OnePostPage = () => {
  const router = useRouter();
  const [post, setPost] = useState<{ id:string, surface: number, floor: number, maxfloor: number, terrace: number, title: string, description:string, price: number, location:string, lat: number, lng: number, posttype:string, heating:boolean,cableTv:boolean, internet:boolean,garage:boolean, parking:boolean, registered:boolean ,contact:boolean , elevator:boolean, phone:boolean, imageUrls:string[], userId:string, status:string  } | null>(null);
  const postId = router.query.id;



  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`/api/getonepost?id=${postId}`);
        if (response.ok) {
          const data = await response.json();
          setPost(data);
        } else {
          console.error("Failed to fetch post data");
        }
      } catch (error) {
        console.error("Failed to fetch post data", error);
      }
    };

    if (postId) {
      fetchData();
    }
  }, [postId]);


  const refusePost = async () => {
    if (!window.confirm("Are you sure you want to delete this post?")) {
      return;
    }
    try {
      const response = await fetch(`/api/deletepost?id=${postId}`, { method: 'DELETE' });
      if (response.ok) {
        router.push('/admin/posts'); // Redirekcija ka pocetnoj stranici admina
      } else {
        console.error("Failed to delete the post");
      }
    } catch (error) {
      console.error("Failed to delete the post", error);
    }
  }

  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const currentUserId = Cookies.get('currentUserId');
        if (!currentUserId) {
          console.error("Current user ID not found");
          return;
        }

        const response = await fetch(`/api/currentUser?userId=${currentUserId}`);
        const data = await response.json();
        console.log("Response data:", data);  
        setCurrentUser(data.user);
      } catch (error) {
        console.error("Failed to fetch current user data", error);
      }
    };
    fetchUserData();
  }, []);


  //Desno dugme za carousel
  const PreviousArrow: React.FC<CustomArrowProps> = ({ className, style, onClick }) => {
    return (
      <div onClick={onClick} className="arrow-left">
        <BsFillArrowLeftCircleFill className="absolute top-[50%] left-[-40px] cursor-pointer text-gray-500" size={30} />
      </div>
    );
  };
  
  //Levo dugme za carousel
  const NextArrow: React.FC<CustomArrowProps> = ({ className, style, onClick }) => {
    return (
      <div onClick={onClick} className="arrow-right">
        <BsFillArrowRightCircleFill className="absolute top-[50%] right-[-40px] cursor-pointer text-gray-500" size={30} />
      </div>
    );
  };

  //Podesavanja za slider
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    nextArrow: <NextArrow/>,
    prevArrow: <PreviousArrow />
  };


  

  

  return (
    <div className="w-full">

      <Head>
        <title>Dambel Estates | Post</title>
        <meta name="description" content="Dambel Estates post" />
      </Head>
      
      <Navbar currentUser={currentUser}/>
      <LoginModal />
      <RegisterModal />
      <ProfileModal />
        
        {post ? (


          


        <div className="w-full pt-[150px]">



            <div className="flex justify-between m-auto mb-[80px] xl:w-[1200px] lg:w-[700px] w-[90%] xl:flex-row flex-col-reverse">
            <div className="xl:w-[50%] w-full">
            <>
              <div className="mx-[50px] xl:mt-0 mt-[50px]">
                <Slider {...settings} className="md:h-[350px] md:w-[500px] w-[250px] h-[200px]">
                    {post.imageUrls?.map((imageUrl: any, index: number) => (
                      <div key={index} className="md:h-[350px] md:w-[500px] w-[250px] h-[200px] overflow-hidden rounded-md">
                        <img src={imageUrl} className="border border-1 border-gray-400 object-cover w-full h-full" />
                      </div>
                    ))}
                  </Slider>
                </div>
              </>
            </div>
            <div className="w-full">
                <div className="max-w-[500px] ml-[30px]">
                  <h1 className="text-red-700 font-semibold text-[30px] leading-tight">
                    {post.title}  
                  </h1>

                  <p className="mt-4 font-semibold text-[20px] flex items-center">
                  <CiLocationOn className="mr-2"/> {post.location}
                  </p>

                  <p className="mt-4">
                    {post.description}
                  </p>

                  <p className="mt-4 flex items-center">
                    <AiOutlineMail className="mr-2 relative top-[2px]"/> <span className="text-semibold">{post.contact}</span>
                  </p>

                  <p className="mt-5 text-xl">
                    Price: <span className="text-bold text-orange-600">{post.price}.00 &euro;</span>
                  </p>

                   <>{post.userId == Cookies.get('currentUserId') &&(
                      <button className="bg-red-700 py-2 px-3 text-white font-semibold rounded-md mt-[15px] hover:bg-red-600" onClick={refusePost}>Remove Post</button>
                   )

                   }
                   
                   </>
                  

                </div>
            </div>
            
            </div>


            <div className="xl:w-[1200px] lg:w-[700px] w-[90%] m-auto">
                <h2 className="text-[25px] font-semibold mb-[20px]">
                  Details
                </h2>


                <div className="flex justify-between">
                    <div className="w-[45%]">
                    <table className="w-full">
                      <tr className="border-b border-solid border-slate-300">
                          <td className="py-2">
                            <div className="flex justify-between">
                              <div className="font-semibold text-gray-500">
                                Square footage
                              </div>
                              <div className="font-semibold">
                                {post.surface} m<sup>2</sup>
                              </div>
                            </div>
                          </td>
                      </tr>

                      <tr className="border-b border-solid border-slate-300">
                          <td className="py-2">
                            <div className="flex justify-between">
                              <div className="font-semibold text-gray-500">
                                Terrace
                              </div>
                              <div className="font-semibold">
                                {post.terrace}
                              </div>
                            </div>
                          </td>
                      </tr>

                      <tr className="border-b border-solid border-slate-300">
                          <td className="py-2">
                            <div className="flex justify-between">
                              <div className="font-semibold text-gray-500">
                                Sale/Rent
                              </div>
                              <div className="font-semibold">
                                  {post.posttype}
                              </div>
                            </div>
                          </td>
                      </tr>

                      <tr className="border-b border-solid border-slate-300">
                          <td className="py-2">
                            <div className="flex justify-between">
                              <div className="font-semibold text-gray-500">
                                Heating
                              </div>
                              <div className="font-semibold">
                              {post.heating ? 'Yes' : 'No'}
                              </div>
                            </div>
                          </td>
                      </tr>

                      <tr className="border-b border-solid border-slate-300">
                          <td className="py-2">
                            <div className="flex justify-between">
                              <div className="font-semibold text-gray-500">
                                Cable TV
                              </div>
                              <div className="font-semibold">
                                {post.cableTv ? 'Yes' : 'No'}
                              </div>
                            </div>
                          </td>
                      </tr>


                      <tr className="border-b border-solid border-slate-300">
                          <td className="py-2">
                            <div className="flex justify-between">
                              <div className="font-semibold text-gray-500">
                                Internet
                              </div>
                              <div className="font-semibold">
                                {post.internet ? 'Yes' : 'No'}
                              </div>
                            </div>
                          </td>
                      </tr>



                      <>{post.floor &&(
                          <tr className="border-b border-solid border-slate-300">
                          <td className="py-2">
                            <div className="flex justify-between">
                              <div className="font-semibold text-gray-500">
                                Floor
                              </div>
                              <div className="font-semibold">
                                {post.floor}
                              </div>
                            </div>
                          </td>
                      </tr>
                        )
                      }    
                      
                      </> 




                    </table>
                    </div>

                    <div className="w-[45%]">


                    <table className="w-full">
                      


                      <tr className="border-b border-solid border-slate-300">
                          <td className="py-2">
                            <div className="flex justify-between">
                              <div className="font-semibold text-gray-500">
                                  Garage
                              </div>
                              <div className="font-semibold">
                                  {post.garage ? 'Yes' : 'No'}
                              </div>
                            </div>
                          </td>
                      </tr>

                      <tr className="border-b border-solid border-slate-300">
                          <td className="py-2">
                            <div className="flex justify-between">
                              <div className="font-semibold text-gray-500">
                                Parking
                              </div>
                              <div className="font-semibold">
                                {post.parking ? 'Yes' : 'No'}
                              </div>
                            </div>
                          </td>
                      </tr>


                      <tr className="border-b border-solid border-slate-300">
                          <td className="py-2">
                            <div className="flex justify-between">
                              <div className="font-semibold text-gray-500">
                                Registered
                              </div>
                              <div className="font-semibold">
                              {post.registered ? 'Yes' : 'No'}
                              </div>
                            </div>
                          </td>
                      </tr>

                      <tr className="border-b border-solid border-slate-300">
                          <td className="py-2">
                            <div className="flex justify-between">
                              <div className="font-semibold text-gray-500">
                                Elevator
                              </div>
                              <div className="font-semibold">
                                {post.elevator ? 'Yes' : 'No'}
                              </div>
                            </div>
                          </td>
                      </tr>

                      <tr className="border-b border-solid border-slate-300">
                          <td className="py-2">
                            <div className="flex justify-between">
                              <div className="font-semibold text-gray-500">
                                Phone
                              </div>
                              <div className="font-semibold">
                                {post.phone ? 'Yes' : 'No'}
                              </div>
                            </div>
                          </td>
                      </tr>

                      <>{post.maxfloor &&(
                          <tr className="border-b border-solid border-slate-300">
                          <td className="py-2">
                            <div className="flex justify-between">
                              <div className="font-semibold text-gray-500">
                                Max Floor
                              </div>
                              <div className="font-semibold">
                                  {post.maxfloor}
                              </div>
                            </div>
                          </td>
                      </tr>
                        )
                      }    
                      
                      </> 


                    </table>
                    </div>
                </div>

                
            </div>



            <div className="m-auto mt-[50px] mb-[100px] xl:w-[1200px] lg:w-[700px] w-[90%] rounded-md overflow-hidden">

            <h2 className="text-[25px] font-semibold mb-[20px]">
                  Location
            </h2>
              
            <OneLocationMap id={post.id} name={post.title} lat={post.lat} lng={post.lng} imageUrl={post.imageUrls[0]} price={post.price} posttype={post.posttype} locationPart={post.location} />

            </div>         




          <div>
          
        </div>

        <Footer/>
        </div>


        ) : (
          <p>Loading post...</p>
        )}


        

      </div>



      
    
  );
};

export default OnePostPage;