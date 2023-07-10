// import DarkMode from './dkmode';

export default function Header() {
    return (
      <>
       <div className="m-1">

        <div className="italic flex p-10 mx-auto bg-slate-50 shadow-md text-6xl ">
            <div className="flex-none w-64 h-16  rounded border-4 border-indigo-500/100">
              <h1 className="mt-0 ml-0 bg-[#9333ea] text-white font-bold" >Short.le</h1>
            </div>

            <div className="ml-8 mr-8 flex-auto w-64 ">
            {/* bg-black */}
            </div>

            <div className=" flex-none w-44 ">
            {/* border-4 border-indigo-500/80 */}
               
            </div>
        </div>

        <div className="mt-6 mb-4 p-2  ">
        {/* border-4 border-black */}
            <p className = "text-2xl text-center">Short.le is a free tool to shorten URLs and generate short links</p>
            <p className = "text-2xl text-center">URL shortener allows to create a shortened link making it easy to share</p>
        </div>

      </div>
      </>
    );
  };