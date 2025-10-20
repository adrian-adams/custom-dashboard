import React, { useState, useEffect, useRef } from 'react';
import { getDrawer } from "/services/drawerService";
import DrawerEdit from '@/components/drawer/DrawerEdit';
import DrawerAdd from '@/components/drawer/DrawerAdd';

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  // SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
} from "@/components/ui/sidebar"

export const DrawerList = ({userRole}) => {
  const [drawerItem, setDrawerItem] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingModal, setLoadingModal] = useState(false);
  const [loadingStatus, setLoadingStatus] = useState("loading");
  const [loadingMsg, setLoadingMsg] = useState("");

  const prevCountRef = useRef(0);

  useEffect(() => {
          const getDrawerData = getDrawer((data) => {
              setDrawerItem(data);
              setLoading(false);
          });
          return () => getDrawerData();
      }, []);
  
  useEffect(() => {
      if(!loading) {
          const prevCount = prevCountRef.current;
          const currentCount = drawerItem.length;

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
  }, [drawerItem, loading]);
  
  return (
    <>
        <Sidebar className='z-50'>
            <SidebarContent>
                <SidebarGroup>
                <div className='flex flex-row gap-2 py-4 px-2'>
                  <SidebarTrigger />
                  { userRole === "admin" && (
                      <DrawerAdd />
                    )
                  }
                </div>
                <SidebarGroupContent>
                    <SidebarMenu className='scroll-smooth'>
                    {drawerItem.sort((a,b) => a.title.localeCompare(b.title)).map((drawer) => (
                        <SidebarMenuItem key={drawer.title}>
                        <SidebarMenuButton asChild>
                          <div>
                            <a href={drawer.url} target="_blank" rel="noopener noreferrer" className="flex flex-row items-center gap-2 w-full">
                            <p className='text-[1.25em]'><b>{drawer.title}</b></p>
                            </a>
                            {userRole === "admin" && (
                              <DrawerEdit drawer={drawer} />
                            )}
                          </div>
                        </SidebarMenuButton>
                        </SidebarMenuItem>
                    ))}
                    </SidebarMenu>
                </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>
        </Sidebar>
    </>
  )
}

export default DrawerList