import React from 'react'
import './App.css'
import {Routes, Route} from 'react-router-dom'
import Home from "./components/Home";
import ErrorPage from "./components/ErrorPage";
import Resume from "./components/Resume";
import {ResumeProps} from "./types/Types";
const App = () => {
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
return(
    <div className={"flex w-full"}>
        {/*<nav className={"fixed top-0 left-0 flex gap-5 w-[50%] md:w-[20%] p-2 bg-fuchsia-500 rounded-xl"}>*/}
        {/*    <NavLink to="/" className={(isActive)=>isActive?"p-1 flex-auto h-auto w-auto bg-[#83C9F4] rounded-md text-sm font-medium text-pink-500 transition ease-in-out delay-150 hover:bg-[#0B5583]":"p-1 flex-auto h-auto w-auto bg-[#83C9F4] rounded-md text-sm font-medium text-pink-500 transition ease-in-out delay-150 hover:bg-[#0B5583]"}>Home</NavLink>*/}
        {/*    <NavLink to="/resume" className={(isActive)=>isActive?"p-1 flex-auto h-auto w-auto bg-[#83C9F4] rounded-md text-sm font-medium text-pink-500 transition ease-in-out delay-150 hover:bg-[#0B5583]":"p-1 flex-auto h-auto w-auto bg-[#83C9F4] rounded-md text-sm font-medium text-pink-500 transition ease-in-out delay-150 hover:bg-[#0B5583]"}>Resume</NavLink>*/}
        {/*</nav>*/}
        <Routes>
            <Route path="/" element={<Home setResult={setResult}/>}/>
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
    </div>

)
}
export default App