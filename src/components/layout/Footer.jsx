import { FaYoutube } from "react-icons/fa6";
import { FaTwitter } from "react-icons/fa";
import { FaSquareFacebook } from "react-icons/fa6";
import { FaInstagram } from "react-icons/fa6";
import { FaTiktok } from "react-icons/fa6";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t text-white pt-4 bg-primary mt-8">
      <div className="grid md:grid-cols-3 md:justify-between text-center py-3">
        <div className="">
          <p className="font-semibold text-2x text-center">ST PIZZA</p>
          <div className="flex gap-3 pt-2 justify-center items-center">
            <Link href={"/"}>
              <FaYoutube size={32} />
            </Link>
            <Link href={"/"}>
              <FaTwitter size={26} />
            </Link>
            <Link href={"/"}>
              <FaSquareFacebook size={26} />
            </Link>
            <Link href={"/"}>
              <FaInstagram size={26} />
            </Link>
            <Link href={"/"}>
              <FaTiktok size={26} />
            </Link>
          </div>
        </div>
        <div className="flex justify-center">
          <div className="grid grid-cols-1 md:text-left gap-1">
            <Link className="hey" href={"/"}>
              FAQ
            </Link>
            <Link href={"/"}>Order</Link>
            <Link href={"/"}>Contact us</Link>
          </div>
        </div>
        <div className="flex justify-center">
          <div className="grid grid-cols-1 md:text-left gap-1">
            <Link href={"/"}>About us</Link>
            <Link href={"/"}>Privacy Policy</Link>
            <Link href={"/"}>Franchising</Link>
          </div>
        </div>
      </div>
      <p className="text-center bg-secondary py-3">
        &copy; 2023 All rights reserved
      </p>
    </footer>
  );
}
