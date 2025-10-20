import React, { useState } from 'react'
import Navigtion from "@/components/navigation/Navigation"
import CardList from "@/components/cards/CardList"

// Drawer / Sidebar
import { SidebarProvider } from "@/components/ui/sidebar"
import Drawer from "@/components/drawer/DrawerList"

const Dashboard = ({userRole}) => {
  const [search, setSearch] = useState("");

  return (
    <>
      <SidebarProvider className='block'>
        <Drawer userRole={userRole} />
        <Navigtion search={search} setSearch={setSearch} userRole={userRole} />
        <main>
          <div>
            <CardList search={search} userRole={userRole} />
          </div>
        </main>
      </SidebarProvider>
    </>
  )
}

export default Dashboard