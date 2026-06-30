import React from "react";

const Footer = () => {
  return (
    <footer id="contact" className="w-full bg-slate-900 text-slate-300 border-t border-slate-800">
      {/* Upper Footer section */}
      <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Contact Info */}
        <div className="space-y-4">
          <h3 className="text-white text-lg font-semibold border-b-2 border-green-500 pb-2 w-fit">
            Sirajganj Polytechnic Institute
          </h3>
          <div className="text-sm space-y-2">
            <p className="flex items-start gap-2">
              <span className="text-green-500 mt-1">📍</span>
              <span>Sirajganj Sadar, Sirajganj - 6700, Bangladesh</span>
            </p>
            <p className="flex items-center gap-2">
              <span className="text-green-500">📞</span>
              <span>+88-02588830150, +88-01712-345678</span>
            </p>
            <p className="flex items-center gap-2">
              <span className="text-green-500">✉️</span>
              <span>principal.spisg@gmail.com, info@sgpi.gov.bd</span>
            </p>
            <p className="flex items-center gap-2">
              <span className="text-green-500">🌐</span>
              <a href="http://www.sgpi.gov.bd" className="hover:text-white underline transition-colors">
                www.sgpi.gov.bd
              </a>
            </p>
          </div>
        </div>

        {/* Quick Links */}
        <div className="space-y-4">
          <h3 className="text-white text-lg font-semibold border-b-2 border-green-500 pb-2 w-fit">
            Important Information
          </h3>
          <ul className="text-sm space-y-2">
            <li>
              <a href="#departments" className="hover:text-white transition-colors flex items-center gap-1.5">
                <span>›</span> Departments Course Details
              </a>
            </li>
            <li>
              <a href="#notices" className="hover:text-white transition-colors flex items-center gap-1.5">
                <span>›</span> Recent Notices Archive
              </a>
            </li>
            <li>
              <a href="#curriculum" className="hover:text-white transition-colors flex items-center gap-1.5">
                <span>›</span> Semester Fees and Syllabus
              </a>
            </li>
            <li>
              <a href="#gallery" className="hover:text-white transition-colors flex items-center gap-1.5">
                <span>›</span> Campus Video Tours
              </a>
            </li>
          </ul>
        </div>

        {/* Government Portal Links */}
        <div className="space-y-4">
          <h3 className="text-white text-lg font-semibold border-b-2 border-green-500 pb-2 w-fit">
            National Portals
          </h3>
          <div className="grid grid-cols-2 gap-3 text-xs">
            <a
              href="https://bangladesh.gov.bd"
              target="_blank"
              rel="noreferrer"
              className="bg-slate-800 hover:bg-slate-700/80 p-2.5 rounded border border-slate-700 text-center block transition-colors text-slate-200"
            >
              Bangladesh Portal
            </a>
            <a
              href="http://www.moedu.gov.bd"
              target="_blank"
              rel="noreferrer"
              className="bg-slate-800 hover:bg-slate-700/80 p-2.5 rounded border border-slate-700 text-center block transition-colors text-slate-200"
            >
              Ministry of Education
            </a>
            <a
              href="http://www.techedu.gov.bd"
              target="_blank"
              rel="noreferrer"
              className="bg-slate-800 hover:bg-slate-700/80 p-2.5 rounded border border-slate-700 text-center block transition-colors text-slate-200"
            >
              DTE website
            </a>
            <a
              href="http://www.bteb.gov.bd"
              target="_blank"
              rel="noreferrer"
              className="bg-slate-800 hover:bg-slate-700/80 p-2.5 rounded border border-slate-700 text-center block transition-colors text-slate-200"
            >
              BTEB Board Portal
            </a>
          </div>
        </div>
      </div>

      {/* Middle Logos Row matching the screenshot government links */}
      <div className="bg-slate-950/80 border-t border-slate-800 py-6">
        <div className="max-w-7xl mx-auto px-6 flex flex-wrap items-center justify-between gap-6">
          <div className="flex flex-wrap items-center gap-6 opacity-75 grayscale hover:grayscale-0 transition-all">
            {/* Bangladesh Govt Logo representation */}
            <div className="flex items-center gap-2 text-xs font-semibold text-slate-300">
              <div className="w-8 h-8 rounded-full bg-green-700 flex items-center justify-center text-white border border-green-500 font-bold">
                BD
              </div>
              <span>Bangladesh Govt.</span>
            </div>
            {/* BTEB Board representation */}
            <div className="flex items-center gap-2 text-xs font-semibold text-slate-300">
              <div className="w-8 h-8 rounded-full bg-blue-700 flex items-center justify-center text-white border border-blue-500 font-bold">
                BTEB
              </div>
              <span>Technical Education Board</span>
            </div>
            {/* ICT Division */}
            <div className="flex items-center gap-2 text-xs font-semibold text-slate-300">
              <div className="w-8 h-8 rounded-full bg-teal-600 flex items-center justify-center text-white border border-teal-500 font-bold">
                ICT
              </div>
              <span>ICT Division Portal</span>
            </div>
          </div>
          <div className="text-xs text-slate-500 font-medium">
            Designed for Sirajganj Govt. Polytechnic Institute Case Study
          </div>
        </div>
      </div>

      {/* Bottom Copyright line */}
      <div className="bg-slate-950 py-4 text-center text-xs text-slate-600 border-t border-slate-900">
        <p>© 2026 Sirajganj Polytechnic Institute. All Rights Reserved. Powered by BTEB Redesign Initiative.</p>
      </div>
    </footer>
  );
};

export default Footer;
