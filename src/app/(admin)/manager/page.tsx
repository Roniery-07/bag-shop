"use client"

import { useAuth } from "@/lib/context/authContext";
import Dashboard from "./dashboard";

export default function ManagerPage() {

  const {signed} = useAuth()
  
  console.log(signed)
  if(signed){
    return (
      <div className="h-sreen w-full">
        <div>
          <Dashboard/>
        </div>    
      </div>
    );
  } 
  else{
    return (
      <div>Access Denied</div>
    )
  }
}
