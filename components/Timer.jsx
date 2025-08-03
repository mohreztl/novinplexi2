import { useAnimate } from "framer-motion";

import { useEffect, useRef, useState } from "react";

// NOTE: Change this date to whatever date you want to countdown to :)

const COUNTDOWN_FROM = "2025-06-01";

const SECOND = 1000;

const MINUTE = SECOND * 60;

const HOUR = MINUTE * 60;

const DAY = HOUR * 24;

const ShiftingCountdown = () => {
  return (
    // <div className="bg-gradient-to-br from-violet-600 to-indigo-600 p-4 ">
    <div className="bg-transparent w-full  overflow-hidden  ">
      <div className="flex flex-row-reverse w-full max-w-5xl items-center   overflow-hidden">
        <CountdownItem unit="Day" text="روز" />

        <CountdownItem unit="Hour" text="ساعت" />

        <CountdownItem unit="Minute" text="دقیقه" />

        <CountdownItem unit="Second" text="ثانیه" />
      </div>
    </div>
  );
};

const CountdownItem = ({ unit, text }) => {
  const { ref, time } = useTimer(unit);

  return (
    <div className="flex h-24 w-1/4 flex-col items-center justify-center gap-1  md:h-36 md:gap-2 border-transparent">
      <div className="relative w-full text-center">
        <div className="flex  overflow-hidden gap-0 ">
          {unit==="Second" ? (<span className="text-secondary  mx-auto text-xl"></span>) : (<span className="text-secondary  mx-auto text-xl">:</span>)}
        
          <span
            ref={ref}
            className="block text-lg font-semibold text-white md:text-xl lg:text-2xl mx-3"
          >
            {time}
          </span>
          
        </div>
      </div>

      <span className="text-xs  text-secondary md:text-sm lg:text-base">
        {text}
      </span>
    </div>
  );
};

export default ShiftingCountdown;

// NOTE: Framer motion exit animations can be a bit buggy when repeating

// keys and tabbing between windows. Instead of using them, we've opted here

// to build our own custom hook for handling the entrance and exit animations

const useTimer = (unit) => {
  const [ref, animate] = useAnimate();

  const intervalRef = useRef(null);

  const timeRef = useRef(0);

  const [time, setTime] = useState(0);

  useEffect(() => {
    intervalRef.current = setInterval(handleCountdown, 1000);

    return () => clearInterval(intervalRef.current || undefined);
  }, []);

  const handleCountdown = async () => {
    const end = new Date(COUNTDOWN_FROM);

    const now = new Date();

    const distance = +end - +now;

    let newTime = 0;

    if (unit === "Day") {
      newTime = Math.floor(distance / DAY);
    } else if (unit === "Hour") {
      newTime = Math.floor((distance % DAY) / HOUR);
    } else if (unit === "Minute") {
      newTime = Math.floor((distance % HOUR) / MINUTE);
    } else {
      newTime = Math.floor((distance % MINUTE) / SECOND);
    }

    if (newTime !== timeRef.current) {
      // Exit animation

      await animate(
        ref.current,

        { y: ["0%", "-50%"], opacity: [1, 0] },

        { duration: 0.35 }
      );

      timeRef.current = newTime;

      setTime(newTime);

      // Enter animation

      await animate(
        ref.current,

        { y: ["50%", "0%"], opacity: [0, 1] },

        { duration: 0.35 }
      );
    }
  };

  return { ref, time };
};
