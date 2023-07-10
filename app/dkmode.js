"use client"

import React, {useEffect, useState} from "react";
import { FaDesktop, FaMoon,FaSun } from 'react-icons/fa';

export default function DarkMode(){
   const [theme, setTheme] = useState(
    localStorage.getItem("theme")?localStorage.getItem("theme") : "system"
   );
   const element  = document.documentElement;
   const darkQuery = window.matchMedia("(prefers-color-scheme: dark)");



   const options = [ 
    {
        icon:FaSun,
        text: "light"
    },
    {
        icon:FaMoon,
        text: "dark"
    },
    {
        icon:FaDesktop,
        text: "system"
    },
   ];

   function onWindowMatch(){
    if(localStorage.theme === 'dark' || (!("theme" in localStorage) && darkQuery.matches) ){
        element.classList.add("dark");
    }
    else{
        element.classList.remove("dark");
    }
   };

   onWindowMatch();



   useEffect(()=>{
    switch (theme){
        case 'dark':
            element.classList.add('dark');
            localStorage.setItem('theme','dark');
            break;
        case 'light':
            element.classList.remove('dark');
            localStorage.setItem('theme','light');
            break;
        default:
            localStorage.removeItem("theme");
            onWindowMatch();
            break;



    }
   },[theme] )



  darkQuery.addEventListener("change",(e)=>{
    if(!("theme" in localStorage)){
        if(e.matches){
            element.classList.add("dark");
        }
        else{
            element.classList.remove("dark");
        }
    }
  });



    return (

        <div className="">
            <div className="fixed top-11 right-10 duration-100 dark:bg-slate-700 bg-gray-100 rounded">
              
               { 
                    options?.map(opt=>(
                        // { icon : IconComponent, text}= opt;
                        // const IconComponent = opt.icon
                        <button key={opt.text}
                         onClick={()=>setTheme(opt.theme)}
                         className={`w-12 h-8 leading-9 text-xl rounded-full m-1 test-sky-600
                         ${theme === opt.text && "text-sky-600"}`}>
                         <opt.icon className="text-4xl"  />
                        </button>
                    ))
                }
            </div>
        </div>
    );
};