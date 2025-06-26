import React from "react";

const Me = () => {
  return (
    <div className=" text-white  mt-24 flex items-center justify-center">
      <a
        href="https://adityabhatkar23.github.io/portfolio/"
		target="_blank"
        className="group py-1 px-2 bg-[#1E1E1E] rounded-xl text-sm capitalize cursor-pointer flex items-center gap-2 transition duration-300 hover:shadow-[0_0_10px_rgba(255,255,255,0.1)] hover:scale-[1.03]"
      >
        made by aditya
        <div className="relative h-8 w-8">
          <img
            src="https://api.dicebear.com/9.x/big-smile/svg?seed=Trouble"
            className="absolute top-0 left-0 h-8 w-8 transition-opacity duration-300 group-hover:opacity-0"
            alt="avatar"
          />
          <span
            className="absolute top-0 left-0 h-8 w-8 flex items-center justify-center text-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300  origin-bottom"
            role="img"
            aria-label="wave"
          >
            👋
          </span>
        </div>
      </a>
    </div>
  );
};

export default Me;
