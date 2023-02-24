import ErrorPage from "./ErrorPage";
import {ResumeProps} from "../types/Types";
import {useReactToPrint} from "react-to-print";
import {useRef} from "react";

 const Resume = ( result:ResumeProps) => {

     const componentRef=useRef(null)
    //👇🏻 function that replaces the new line with a break tag
    const replaceWithBr = (string: string) => {
        return string?.replace(/ \n/g, ".<br/>");
    };

    //👇🏻 returns an error page if the result object is empty
    if (JSON.stringify(result) === "{}") {
        return <ErrorPage />;
    }

    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
        documentTitle: `${result.fullName} Resume`,
        onAfterPrint: () => alert("Print Successful!"),
    })
    console.log(result);
     return (
        <div className={"grid grid-cols-1"}>
            <button className={"px-4 py-2 text-sm font-medium text-white bg-pink-500 rounded-md hover:bg-pink-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-pink-500"} onClick={handlePrint}>Print Page</button>
            <main ref={componentRef} className='h-content m-auto bg-[#e8e2e2] sm:w-[100%] md:w-[80%] mt-5 text-justify'>
                <header className='flex bg-[#e8e2e2] items-center justify-between sm:w-[100%] md:w-[80%] m-auto mt-1.5 m-h-10vh p-3 rounded-sm'>
                    <div>
                        <h1>{result?.fullName}</h1>
                        <p className='opacity-60 mb-3'>
                            {result?.currentPosition}
                            <br/>
                            ({result?.currentTechnologies})
                        </p>
                        <p className='opacity-60'>
                            {result?.currentExperience}year(s) work experience
                        </p>
                    </div>
                    <div>
                        <img
                            loading={"lazy"}
                            src={result?.image_url}
                            alt={result?.fullName}
                            className='align-middle w-36 rounded-full'
                        />
                    </div>
                </header>
                <div className='w-[80%] m-auto mt-0 p-6 m-h-[80%] border-x-gray-50 '>
                    <div>
                        <h2 className='mb-1 font-semibold text-xl'>PROFILE SUMMARY</h2>
                        <p
                            dangerouslySetInnerHTML={{
                                __html: replaceWithBr(result?.objective),
                            }}
                            className='text-justify'
                        />
                    </div>
                    {result?.workExperience===undefined?null:
                        <>
                        <div>
                        <h2 className='mb-1 font-semibold text-xl text-justify'>WORK HISTORY</h2>
                        {result?.workExperience?.map((work) => (
                            <p className='text-justify' key={work.companyName}>
                                <span style={{ fontWeight: "bold" }}>{work.companyName}</span> -{" "}
                                 <br/>{work.companyPosition} ({work.companyTechnologies})
                            </p>
                        ))}
                    </div>
                    <div>
                        <h2 className='mb-1 font-semibold text-xl text-justify'>JOB PROFILE</h2>
                        <p
                            dangerouslySetInnerHTML={{
                                __html: replaceWithBr(result?.jobResponsibilities),
                            }}
                            className='mb-1 text-justify'
                        />
                    </div>
                    </>
                    }
                    <div>
                        <h2 className='mb-1 font-semibold text-xl'>JOB RESPONSIBILITIES</h2>
                        <p
                            dangerouslySetInnerHTML={{
                                __html: replaceWithBr(result?.points),
                            }}
                            className='mb-3 text-justify'
                        />
                    </div>
                </div>
            </main>
        </div>
    );
};
 export default Resume;