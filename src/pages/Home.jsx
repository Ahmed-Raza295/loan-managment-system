import { Link, useNavigate } from "react-router"
import Button from "../components/Button"
import { useEffect } from "react"
function Home() {

   const navigate = useNavigate()


useEffect(()=>{
  let session = localStorage.getItem("Session")
if(session){
navigate("/dashboard")
return
}



},[navigate]);










    return (
      <div className=" flex justify-center items-center w-full h-screen bg-blue-200 gap-4">
      <div className="p-10 text-center ">
      <h1 className="text-4xl font-extrabold ">Welcome To Our Platform</h1>
        <h1 className="text-5xl font-bold text-blue-700 my-5">Loan Management System</h1>
        <p className="mt-4 text-2xl ">Welcome to the system.</p>

        <div className="buttons flex justify-center my-10">
      
         <Link to={"/login"}><Button title={"Login"} />   </Link>
         <Link to={"/signUp"}><Button title={"Sign up"}/></Link>
</div>
      </div>
     
      </div>
    )
  }
  export default Home
  