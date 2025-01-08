import { FaGithub } from "react-icons/fa";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import React from "react";

function Navbar({ title }) {
  return (
    <nav className="navbar mb-12 shadow-lg bg-neutral text-neutral-content">
      <div className="container mx-auto">
        <div className="flex-none px-2 mx-2">
          <FaGithub className="inline pr-2 text-3xl" />
          <Link to="/" className="text-lg font-bold align-middle">
            {title}
          </Link>
        </div>

        <div className="flex-1 px-2 mx-2">
          <div className="flex justify-end">
            <Link to="/" className="btn btn-ghost btn-sm rounded-btn">
              HOME
            </Link>
            <Link to="/about" className="btn btn-ghost btn-sm rounded-btn">
              ABOUT
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}

//Props 타이틀 입력 안했을때 기본 깃허브 finder 입력
Navbar.defaultProps = {
  title: "Github Finder",
};
//Props 타이틀 타입은 문자열
Navbar.propTypes = {
  title: PropTypes.string,
};

export default Navbar;
