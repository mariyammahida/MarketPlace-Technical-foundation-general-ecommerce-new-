import React from "react";
import {
  IoCartOutline,
  IoHeartOutline,
  IoSearch,
  IoPersonOutline,
} from "react-icons/io5";
import Link from "next/link";

export const Header = () => {
  return (
    <div className="bg-amber-100 shadow-md">
      <header className="text-black">
        <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center justify-between">
          {/* Website Name */}
          <div className="text-3xl font-bold text-gray-800 tracking-wide order-1 md:order-1">
            <Link href="/">Furniture.pkMart</Link>
          </div>

          {/* Navigation Links */}
          <nav className="flex flex-col md:flex-row items-center text-base gap-4 md:gap-9 w-full md:w-auto order-3 md:order-2 mt-4 md:mt-0">
            <Link className="hover:text-blue-500 font-medium" href="/">
              Home
            </Link>
            <Link className="hover:text-blue-500 font-medium" href="/shop">
              Shop
            </Link>
            <Link className="hover:text-blue-500 font-medium" href="/blog">
              Blog
            </Link>
            <Link className="hover:text-blue-500 font-medium" href="/contact">
              Contact
            </Link>
          </nav>

          {/* Icon Section */}
          <div className="flex items-center gap-3 w-full md:w-auto order-2 md:order-3 justify-center md:justify-end mt-4 md:mt-0">
            <ul className="flex gap-4">
              <li>
                <Link href="/account">
                  <IoPersonOutline className="text-black text-2xl hover:text-blue-500 transition duration-300" />
                </Link>
              </li>
              <li>
                <Link href="/search">
                  <IoSearch className="text-black text-2xl hover:text-blue-500 transition duration-300" />
                </Link>
              </li>
              <li>
                <Link href="/favorites">
                  <IoHeartOutline className="text-black text-2xl hover:text-red-500 transition duration-300" />
                </Link>
              </li>
              <li>
                <Link href="/cart">
                  <IoCartOutline className="text-black text-2xl hover:text-green-500 transition duration-300" />
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </header>
    </div>
  );
};

export default Header;