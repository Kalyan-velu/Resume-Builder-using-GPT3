import React from 'react'
import Company from "./Company";
import axios from "axios";
import {useNavigate} from "react-router-dom";
import Loading from "./Loading";

const Home=({setStatus,setResult}: React.SetStateAction<any>)=>{
    const navigate=useNavigate()
    const [input,setInput]=React.useState({
        fullName:"",
        currentPosition:"",
        currentTechnologies:"",
        currentExperience:0,
    })
    const [companyInfo,setCompanyInfo]=React.useState([{
        companyName:"",
        companyPosition:"",
        companyTechnologies:"",
        companyExperience:0,
    }])
    const [addMore,setAddMore]=React.useState(false)
    const [headshot, setHeadshot] = React.useState<null | string>(null);

    const [loading,setLoading]=React.useState(false)

    function handleChange(e:React.ChangeEvent<HTMLInputElement>){
        const {name,value}=e.target
        setInput(prevInput=>{
            return{
                ...prevInput,
                [name]:value
            }
        })
    }

    function selectImage(e:React.ChangeEvent<HTMLInputElement>) {
        const file = e.target.files as FileList;
        const Reader = new FileReader();
        Reader.readAsDataURL(file[0]);
        Reader.onload = () => {
            if (Reader.readyState=== 2){
                setHeadshot(Reader.result as string);
            }
        };
    }

    function handleFormSubmit(e:React.FormEvent<HTMLFormElement>){
        e.preventDefault()
        setLoading(true);
        const formData={
            details:input,
            work_experience:companyInfo,
            image:headshot
        }
        console.log(formData)
        axios.post("/api/resume/create", formData)
            .then((res) => {
                if (res.data.message) {
                    setResult(res.data.data);
                    setLoading(false);
                    navigate("/resume");
                }
            })
            .catch((err) => {
                    setLoading(false);
                    setStatus("Something Went Wrong")
                    setTimeout(()=>{
                        setStatus("")
                    },3000)
                    console.error(err)
                }
            );

            // console.log(loading)
    }

    // @ts-ignore
    return(
        <div className="top-0 sm:w-full md:w-[60%] m-auto">
            <blockquote className="text-2xl font-semibold italic text-center text-slate-900 m-5 mb-10">
                Let's Build {"  "}
                <span className="before:block before:absolute before:-inset-1 before:-skew-y-3 before:bg-pink-500 relative inline-block">
                    <span className="relative text-white">Your Resume</span>
                </span>
            </blockquote>
            <form
                onSubmit={handleFormSubmit}
                method="POST" encType="multipart/form-data"
                className="flex text-justify flex-col gap-5">
                <div className={"flex items-center w-full justify-center space-x-6"}>
                    <div className="shrink-0">
                        <img className="h-16 w-16 object-cover rounded-full"

                             src={headshot ? headshot : "https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50"}
                             alt="Current profile photo"/>
                    </div>
                    <label className="block">
                        <span className="sr-only">Choose profile photo</span>
                        <input type="file" className="block w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-violet-50 file:text-violet-700 hover:file:bg-violet-100"
                               name='photo'
                               required
                               id='photo'
                               accept='image/x-png,image/jpeg'
                               onChange={(e) => selectImage(e)}
                        />
                    </label>
                </div>
                <div className="grid sm:grid-cols-1 gap-5">
                    <label htmlFor={"fullName"} className="w-full">
                        <p className="after:content-['*'] after:ml-0.5 after:text-red-500 block text-md font-medium text-slate-700">Enter Your Name: </p>
                        <input type="text" name={"fullName"}  onChange={(e)=>handleChange(e)} className="peer block p-2 w-full bg-[#F4EDED] rounded-xl text-md text-slate-500"/>
                    </label>
                    <label htmlFor={"currentPosition"} className="w-full">
                        <p className="after:content-['*'] after:ml-0.5 after:text-red-500 block text-md font-medium text-slate-700">Enter Your Current Position: </p>
                        <input type="text" name={"currentPosition"} value={input.currentPosition} onChange={(e)=>handleChange(e)} className="peer block p-2 w-full bg-[#F4EDED] rounded-xl text-md text-slate-500"/>
                        <p className="mt-2 invisible peer-required:visible text-pink-600 text-sm">
                            Please provide a valid input.
                        </p>
                    </label>
                    <label htmlFor={"currentExperience"} className="w-full">
                        <p className="after:content-['*'] after:ml-0.5 after:text-red-500 block text-md font-medium text-slate-700">Enter Your Experience in Current Position: </p>
                        <input type="number" required name={"currentExperience"} value={input.currentExperience} onChange={(e)=>handleChange(e)} className="peer block p-2 w-full bg-[#F4EDED] rounded-xl text-md text-slate-500"/>
                        {/*<p className="mt-2 invisible peer-required:visible text-pink-600 text-sm">*/}
                        {/*    Please provide a valid input.*/}
                        {/*</p>*/}
                    </label>
                    <label htmlFor={"currentTechnologies"} className="w-full">
                        <p className="after:content-['*'] after:ml-0.5 after:text-red-500 block text-md font-medium text-slate-700">Technologies Used: </p>
                        <input type="text" required name={"currentTechnologies"}  onChange={(e)=>handleChange(e)} className="peer block p-2 w-full bg-[#F4EDED] rounded-xl text-md text-slate-500"/>
                    </label>
                </div>
                <div className="flex justify-center">
                    {!addMore?<button type="button" onClick={()=>setAddMore(true)} className="px-4 py-2 text-sm font-medium text-white bg-pink-500 rounded-md hover:bg-pink-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-pink-500">Add More Info</button>:null}
                </div>
                {/*Header for company details*/}
                {addMore?<div className="w-full">
                    <Company addMore={addMore} setCompanyInfo={setCompanyInfo} setAddMore={setAddMore} companyInfo={companyInfo} />
                </div>:null}

                <div className="flex justify-center">
                    {loading?
                        <>
                            <Loading/>
                        </>
                       : <button type="submit" className="px-4 py-2 text-sm font-medium text-white bg-pink-500 rounded-md hover:bg-pink-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-pink-500">Submit</button>
                    }
                </div>
            </form>

        </div>
    )
}

export default Home