"use client";

import React, {useState, useEffect} from "react";

const TimeSinceRelease: React.FC = () => {
  const releaseDate = new Date("2024-12-09T20:17:00");

  const calculateTimeDifference = () => {
    const now = new Date();
    const diff = now.getTime() - releaseDate.getTime();

    if (diff < 0) {
      return {
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
        notReleased: true,
      };
    }

    const seconds = Math.floor((diff / 1000) % 60);
    const minutes = Math.floor((diff / (1000 * 60)) % 60);
    const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));

    return {
      days,
      hours,
      minutes,
      seconds,
      notReleased: false,
    };
  };

  const [time, setTime] = useState<{
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
    notReleased: boolean;
  } | null>(null); // Initialize as null

  useEffect(() => {
    // Set the initial time
    setTime(calculateTimeDifference());

    const timer = setInterval(() => {
      setTime(calculateTimeDifference());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <section id="time" className="py-20 bg-brack">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-xl text-center text-gray-800 dark:text-white mb-6">
          YOMOGI Operation Time : ISS放出からの経過時間
        </h2>
        <div className="text-center text-gray-700 dark:text-gray-300">
          {time === null ? (
            // Render nothing or a loader while time is being calculated
            <p className="mt-4 text-5xl font-semibold">Loading...</p>
          ) : time.notReleased ? (
            <p className="text-5xl font-semibold">まだ放出されていません</p>
          ) : (
            <p className="text-5xl font-semibold">
              {time.days}
              <span className="text-4xl"> days </span>
              {time.hours}
              <span className="text-4xl"> hours </span>
              {time.minutes}
              <span className="text-4xl"> min </span>
              {time.seconds}
              <span className="text-4xl"> sec</span>
            </p>
          )}
          <p className="mt-2 text-sm text-gray-500">
            放出時間: 2024年12月9日20時17分
          </p>
        </div>
      </div>
    </section>
  );
};

export default TimeSinceRelease;
