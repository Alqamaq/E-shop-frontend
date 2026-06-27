import React, { useState, useEffect } from 'react'

const CountDown = ({data}) => {

    const [timeLeft, setTimeLeft] = useState(calcTimeLeft())



    useEffect(() => {
        const timer = setTimeout(() => {
            setTimeLeft(calcTimeLeft())

        }, 1000)

        return () => clearTimeout(timer)

    })
    function calcTimeLeft() {
        const difference = +new Date(data.Finish_Date) - +new Date();
        //console.log(difference)
        let timeLeft = {};

        if (difference > 0) {
            timeLeft = {
                days: Math.floor(difference / (1000 * 60 * 60 * 24)),
                hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
                minutes: Math.floor((difference / 1000 / 60) % 60),
                seconds: Math.floor((difference / 1000) % 60),
            };
        }

        return timeLeft;
    }
    //console.log(timeLeft)

    const TimerComponent= Object.keys(timeLeft).map((interval)=>{
        if(!timeLeft[interval]){
            return null;
        }
         return(
        <span className='text-[25px] text-blue-500 font-[600] pr-3' key={interval}>
            {timeLeft[interval]} {interval}{" "}
        </span>
    )

    })

   


    return (
        <div >
            {TimerComponent.length ? TimerComponent : <span className="text-red-500 text-[25px]">Time's up!</span>   }
        </div>
    )
}

export default CountDown;