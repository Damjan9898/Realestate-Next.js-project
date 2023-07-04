"use client"


import Footer from "@/app/components/footer/Footer";
import AdminPosts from "@/app/components/posts/AdminPosts";

const AdminBody = ()=>{

      return (
        <div className="min-h-[800px] flex flex-col justify-between ">
          <div className="flex justify-between pb-[150px] flex-col max-w-[1200px] m-auto">
              <AdminPosts status="ON_HOLD" label="On Hold Posts"/>
              <AdminPosts status="APPROVED" label="Approved Posts"/>
          </div>


          <Footer/>      
        </div>

      )
}

export default AdminBody
