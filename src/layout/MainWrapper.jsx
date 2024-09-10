import { useEffect, useState } from "react";
import { setUser } from "../utils/auth";

import React from 'react'


const MainWrapper = ({ children }) => {
    const [loading, setLoading] = useState(true)

    useEffect(async () => {
        const handeler = async () => {
            setLoading(true)
            await setUser()
            setLoading(false)
        }
        handeler()
    }, [])

    return <>
        {loading ? null : children}
    </>
}

// function MainWrapper() {
//     return (
//         <div>MainWrapper</div>
//     )
// }

export default MainWrapper