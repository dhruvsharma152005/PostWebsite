import React, {useEffect, useState} from 'react'
import {useSelector} from 'react-redux'
import {useNavigate} from 'react-router-dom'

export default function Protected({children,authentication=true}) {

    const navigate=useNavigate()
    const [loader,setLoader]=useState(true)
    //auth/user se phle store se puchege ki aph login ho ya nhi ho
    const authStatus=useSelector(state=>state.auth.status)

    //useeffect bathayega baitayega ki app ko login meh bhejna ya kya kam krna (aur kis field meh vhange hota ki vha meh checking kru ya nhi)
    useEffect(()=>{
        if(authentication && authStatus !== authentication)
        {
            navigate("/login")
        }
        else if(!authentication && authStatus !== authentication)
        {
            navigate("/")
        }
        setLoader(false)
    },[authStatus,navigate,authentication])
    //authstatus ya navigate/authentication meh kuch bhi change toh useeffect toh dobara run krna
  return loader ? <h1>Loading...</h1> : <>{children}</>
}


