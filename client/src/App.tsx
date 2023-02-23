import React from 'react'
import './App.css'
import {Routes, Route} from 'react-router-dom'
import Home from "./components/Home";
import ErrorPage from "./components/ErrorPage";
import Resume from "./components/Resume";
import {ResumeProps} from "./types/Types";
const App = () => {
    const [status,setStatus]=React.useState("")
    const[result,setResult]=React.useState<ResumeProps>({
        currentExperience: 0,
        currentPosition: "",
        currentTechnologies: "",
        fullName: "",
        image_url: "",
        jobResponsibilities: "",
        objective: "",
        points: "",
        workExperience: []
    })

    function handleClose() {
        setStatus("")
    }

    return(
    <div className={"flex w-full"}>
        {/*<nav className={"fixed top-0 left-0 flex gap-5 w-[50%] md:w-[20%] p-2 bg-fuchsia-500 rounded-xl"}>*/}
        {/*    <NavLink to="/" className={(isActive)=>isActive?"p-1 flex-auto h-auto w-auto bg-[#83C9F4] rounded-md text-sm font-medium text-pink-500 transition ease-in-out delay-150 hover:bg-[#0B5583]":"p-1 flex-auto h-auto w-auto bg-[#83C9F4] rounded-md text-sm font-medium text-pink-500 transition ease-in-out delay-150 hover:bg-[#0B5583]"}>Home</NavLink>*/}
        {/*    <NavLink to="/resume" className={(isActive)=>isActive?"p-1 flex-auto h-auto w-auto bg-[#83C9F4] rounded-md text-sm font-medium text-pink-500 transition ease-in-out delay-150 hover:bg-[#0B5583]":"p-1 flex-auto h-auto w-auto bg-[#83C9F4] rounded-md text-sm font-medium text-pink-500 transition ease-in-out delay-150 hover:bg-[#0B5583]"}>Resume</NavLink>*/}
        {/*</nav>*/}
        <Routes>
            <Route path="/" element={<Home setStatus={setStatus} setResult={setResult}/>}/>
            <Route path="/resume"
                   element={
                    <Resume
                        currentExperience={result.currentExperience}
                        currentPosition={result.currentPosition}
                        currentTechnologies={result.currentTechnologies}
                        fullName={result.fullName}
                        image_url={result.image_url}
                        jobResponsibilities={result?.jobResponsibilities}
                        objective={result.objective}
                        points={result.points}
                        workExperience={result.workExperience}
                    />}/>
            <Route path="/*" element={<ErrorPage/>}/>
        </Routes>
        {status!==""?
            <>
                <div className="fixed bottom-5 sm:left-0 sm:w-full md:w-[20%] font-medium text-white">
                    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
                         role="alert">
                        <strong className="font-bold">Error! </strong>
                        <span className="block sm:inline">Something went wrong.</span>
                        <button onClick={handleClose} className="absolute top-0 bottom-0 right-0 px-4 py-3">
                            <svg className="fill-current h-6 w-6 text-red-500" role="button" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><title>Close</title><path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z"/></svg>
                        </button>
                    </div>
                </div>
            </>
            :null}
    </div>

)
}
export default App