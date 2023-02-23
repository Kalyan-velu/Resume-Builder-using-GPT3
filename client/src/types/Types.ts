import React from "react";

export default interface IFile {
    name: string;
    url: string;
}

export type CompanyProps ={
    companyInfo:Object[]
    setCompanyInfo:React.SetStateAction<any>
    setAddMore:React.SetStateAction<any>
    addMore:boolean
}

export type ResumeProps ={
        fullName:string,
        image_url:string,
        currentPosition:string,
        currentTechnologies:string,
        currentExperience:number,
        objective:string,
        jobResponsibilities:string,
        points:string,
        workExperience:{
            companyName:string,
            companyPosition:string,
            companyTechnologies:string,
            companyExperience:number,
        }[],
}