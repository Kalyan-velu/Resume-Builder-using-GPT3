import React from "react";
import {CompanyProps} from "../types/Types";
export default function Company({
    companyInfo,
    setCompanyInfo,
    setAddMore,
    addMore
}:CompanyProps):React.FunctionComponentElement<CompanyProps> {
    function handleAddCompany(){
        setCompanyInfo((companyInfo:Object[])=>{
            return [...companyInfo,{
                companyName:"",
                companyPosition:"",
                companyTechnologies:"",
                companyExperience:0,
            }]
        })
    }
    function handleRemoveCompany(index:number){
        setCompanyInfo((companyInfo:Object[])=>{
            return companyInfo.filter((_,i)=>i!==index)
        })
    }
    React.useEffect(()=>{
        if(companyInfo.length<=0){
            handleAddCompany()
            setAddMore(!addMore)
        }
    },[companyInfo])
    const updateCompany=(index:number,e:React.ChangeEvent<HTMLInputElement>)=>{
        const {name,value}=e.target
        setCompanyInfo((prevCompanyInfo:Object[])=>{
            return prevCompanyInfo.map((company,i)=>{
                if(i===index){
                    return{
                        ...company,
                        [name]:value
                    }
                }
                return company
            })
        })
    }

    return (
        <div className={"w-full text-justify grid grid-cols-1"}>
            <h3 className="text-xl font-semibold text-justify mb-6 text-center text-slate-900">Company Details</h3>
            <div className="grid sm:grid-cols-1 gap-5">
            {companyInfo.map((_company,index)=>(
                <div key={index}>
                    <div key={index} className={"grid rounded-xl p-2 sm:grid-cols-1 md:grid-cols-2 gap-5"}>
                        <label htmlFor={"companyName"} className="w-full">
                            <p className="after:content-['*'] after:ml-0.5 after:text-red-500 block text-md font-medium text-slate-700">Company Name: </p>
                            <input type="text" name={"companyName"}  onChange={(e)=>updateCompany(index,e)} className="peer block p-2 w-full bg-[#F4EDED] rounded-xl text-md text-slate-500"/>
                        </label>
                        <label htmlFor={"companyPosition"} className="w-full">
                            <p className="after:content-['*'] after:ml-0.5 after:text-red-500 block text-md font-medium text-slate-700">Position: </p>
                            <input type="text" name={"companyPosition"}  onChange={(e)=>updateCompany(index,e)} className="peer block p-2 w-full bg-[#F4EDED] rounded-xl text-md text-slate-500"/>
                        </label>
                        <label htmlFor={"companyTechnologies"} className="w-full">
                            <p className="after:content-['*'] after:ml-0.5 after:text-red-500 block text-md font-medium text-slate-700">Technologies: </p>
                            <input type="text" name={"companyTechnologies"}  onChange={(e)=>updateCompany(index,e)} className="peer block p-2 w-full bg-[#F4EDED] rounded-xl text-md text-slate-500"/>
                        </label>
                        <label htmlFor={"companyExperience"} className="w-full">
                            <p className="after:content-['*'] after:ml-0.5 after:text-red-500 block text-md font-medium text-slate-700">Experience: </p>
                            <input type="number" name={"companyExperience"}  onChange={(e)=>updateCompany(index,e)} className="peer block p-2 w-full bg-[#F4EDED] rounded-xl text-md text-slate-500"/>
                        </label>
                    </div>
                    <div className={'flex justify-around p-4 w-[80%] m-auto gap-3'}>
                        <button type={'button'} onClick={handleAddCompany} className="bg-fuchsia-500 md:w-[30%] sm:w-[50%] text-white text-md font-medium rounded-xl p-2">Add Company</button>
                        <button type={'button'} onClick={()=>handleRemoveCompany(index)} className="bg-fuchsia-500 md:w-[30%] sm:w-[50%] text-white text-md font-medium rounded-xl p-2">Remove Company</button>
                    </div>
            </div>
            ))}
        </div>
        </div>
    )
}