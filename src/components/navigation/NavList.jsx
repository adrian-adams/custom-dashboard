import React, {useEffect, useState, useRef} from 'react'
import { SidebarTrigger } from "@/components/ui/sidebar"
import NavAdd from '@/components/navigation/NavAdd'
import NavEdit from '@/components/navigation/NavEdit'
import ImgPlaceholder from "@/components/custom/ImgPlaceholder";
import { getNavCard } from "/services/navService";

const NavResIcon = ({navCardItem, userRole}) => {
  return ( 
    <>
      <div className={`group relative flex flex-row items-center rounded-md w-[50px] ${userRole === "admin" ? "hover:w-[100px]" : ""}  hover:bg-green-700 transition-all delay-150 duration-400 ease-in-out`}>
        <div className='w-12.5 rounded-md group-hover:p-1 transition-all duration-400 ease-in-out'>
          <a  
            key={navCardItem.key} 
            href={navCardItem.url} 
            target='_blank' 
            rel="noopener noreferrer" 
            title={navCardItem.title}
          >
            {navCardItem.imageUrl ? (
                <img  src={navCardItem.imageUrl}
                      alt={navCardItem.title}
                      loading='lazy'
                />  
              ) : (
                <div className='bg-gray-800 rounded-md p-1.5'>
                  <ImgPlaceholder />
                </div>
              )
            }
          </a>
        </div>
        <div className={`absolute right-0 -z-10 opacity-0 ${userRole === "admin" ? "group-hover:opacity-100 group-hover:translate-x-1.5 group-hover:z-10" : ""} duration-400 ease-in-out`}>
          <NavEdit navCards={navCardItem} />
        </div>
      </div>
    </>
  )
}

export const NavList = ({userRole}) => {
  const [navCard, setNavCard] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingModal, setLoadingModal] = useState(false);
  const [loadingStatus, setLoadingStatus] = useState("loading");
  const [loadingMsg, setLoadingMsg] = useState("");

  const prevCountRef = useRef(0);

  useEffect(() => {
      const getNavData = getNavCard((data) => {
          setNavCard(data);
          setLoading(false);
      });
      return () => getNavData();
  }, []);

  useEffect(() => {
      if(!loading) {
          const prevCount = prevCountRef.current;
          const currentCount = navCard.length;

          if (currentCount < prevCount) {
              setLoadingModal(true); 
              setLoadingStatus("Success");
              setLoadingMsg("Resource deleted!");

              setTimeout(() => {
                  setLoadingModal(false); 
              }, 1500);
          }
          prevCountRef.current = currentCount;
      }
  }, [navCard, loading]);

  if (loading) return <div>Loading...</div>;
  
  return (
    <>
        <div className='flex flex-wrap justify-center md:justify-start items-center gap-3 md:gap-4.5 w-full md:w-7/12'>
            <SidebarTrigger />
            {userRole === "admin" && (
                <NavAdd /> 
              )
            }
            {navCard.sort((a,b) => a.title.localeCompare(b.title)).map((navCardItem) => (
              <div key={navCardItem.id}>
                <NavResIcon key={navCardItem.id} navCardItem={navCardItem} userRole={userRole} />
              </div>)
            )}
        </div>
    </>
  )
}

export default NavList
