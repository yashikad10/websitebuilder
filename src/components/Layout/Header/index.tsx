"use client";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import Link from "next/link";

const Header = () => {
  return (
    <header className="fixed top-0 left-0 w-full  bg-[#0A0A0A] text-white p-4 z-10">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo and Title */}
        <div className="flex items-center space-x-4">
          {/* Logo */}
          <div className="bg-white p-2 rounded">
            <span className="text-black text-lg font-bold">🟦</span>
          </div>
          {/* Title */}
          <span className="text-xl font-semibold">NovaTemp</span>
        </div>

        {/* Navigation */}
        <nav className="hidden md:flex space-x-8">
          <Link href="/" className="font-bold hover:text-gray-300">
            Home
          </Link>
          <Link href="/pricing" className="hover:text-gray-300">
            Pricing
          </Link>
        </nav>

        {/* Search Bar */}
        <div className="hidden md:flex items-center space-x-2 bg-gray-800 p-2 rounded-full">
          <input
            type="text"
            placeholder="Search..."
            className="bg-transparent outline-none text-sm text-gray-300 placeholder-gray-500 px-3"
          />
        </div>

        {/* Authentication Links */}
        <div className="flex space-x-4">
          <WalletMultiButton
            style={{
              backgroundColor: "#808080",
              color: "#fff",
              padding: "10px 20px",
              borderRadius: "8px", // Rounded corners
              border: "none", // No border
              fontSize: "16px", // Font size
              cursor: "pointer", // Pointer cursor
            }}
          />
        </div>
      </div>
    </header>
  );
};

export default Header;
