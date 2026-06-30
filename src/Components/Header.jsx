import React, { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router";
import { departments, notices, getStudents } from "../utils/data";

const Header = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState({ departments: [], notices: [], students: [] });
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchQuery(value);
    
    if (value.trim().length >= 2) {
      const q = value.toLowerCase();

      // Find matching departments
      const matchedDepts = departments.filter(
        (d) => d.name.toLowerCase().includes(q) || d.id.includes(q)
      );

      // Find matching notices
      const matchedNotices = notices.filter(
        (n) => n.title.toLowerCase().includes(q)
      );

      // Search student database dynamically (scans cohorts until a cap of 6 results is hit)
      const matchedStudents = [];
      let studentCount = 0;
      
      for (const dept of departments) {
        if (studentCount >= 6) break;
        for (const shift of ["morning", "day"]) {
          if (studentCount >= 6) break;
          for (let sem = 1; sem <= 8; sem++) {
            if (studentCount >= 6) break;
            const studentsList = getStudents(dept.id, shift, sem);
            for (const s of studentsList) {
              if (s.name.toLowerCase().includes(q) || String(s.roll).includes(q)) {
                matchedStudents.push(s);
                studentCount++;
                if (studentCount >= 6) break;
              }
            }
          }
        }
      }

      setSearchResults({
        departments: matchedDepts,
        notices: matchedNotices,
        students: matchedStudents,
      });
      setShowDropdown(true);
    } else {
      setSearchResults({ departments: [], notices: [], students: [] });
      setShowDropdown(false);
    }
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim().length >= 2) {
      // If we submit, check if there is a match, or redirect to home with query
      alert(`Real-time search completed for query: ${searchQuery}`);
      setShowDropdown(false);
    }
  };

  // Close search dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const totalResults = searchResults.departments.length + searchResults.notices.length + searchResults.students.length;

  return (
    <header className="w-full bg-[#1b5e20] text-white relative z-50">
      {/* Top Bar / Brand Section */}
      <div className="max-w-7xl mx-auto px-4 py-4 flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Logo & Name */}
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 bg-white text-[#1b5e20] rounded-full flex items-center justify-center font-bold text-2xl shadow-md border-2 border-green-200">
            SPI
          </div>
          <div>
            <h1 className="text-xl md:text-2xl font-bold tracking-wide uppercase leading-tight">
              Sirajganj Polytechnic Institute
            </h1>
            <p className="text-xs md:text-sm text-green-200 font-medium">
              Government Polytechnic Institute under BTEB | Est: 2004
            </p>
          </div>
        </div>

        {/* Search Row with Real-Time Dropdown */}
        <div className="relative w-full md:w-80" ref={dropdownRef}>
          <form onSubmit={handleSearchSubmit} className="relative">
            <input
              type="text"
              placeholder="Search roll, student name, notice..."
              value={searchQuery}
              onChange={handleSearchChange}
              onFocus={() => searchQuery.trim().length >= 2 && setShowDropdown(true)}
              className="w-full px-4 py-2 text-sm text-slate-800 bg-white/95 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400 pl-10 transition-all shadow-inner border border-green-700"
            />
            <svg
              className="absolute left-3 top-2.5 h-4.5 w-4.5 text-slate-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              ></path>
            </svg>
          </form>

          {/* Search Dropdown Panel */}
          {showDropdown && (
            <div className="absolute right-0 mt-2 w-full md:w-[420px] bg-white rounded-xl shadow-2xl border border-slate-200 overflow-hidden text-slate-800 backdrop-blur-md animate-in fade-in slide-in-from-top-2 duration-200">
              <div className="p-3 bg-slate-100 border-b border-slate-200 flex justify-between items-center text-xs font-bold text-slate-500">
                <span>Real-Time Search Results</span>
                <span>{totalResults} matches found</span>
              </div>

              <div className="max-h-[360px] overflow-y-auto divide-y divide-slate-100">
                {/* 1. Departments Match */}
                {searchResults.departments.length > 0 && (
                  <div className="p-2">
                    <span className="block text-[10px] font-bold text-slate-400 uppercase px-2 mb-1">Academic Departments</span>
                    {searchResults.departments.map((dept) => (
                      <Link
                        key={dept.id}
                        to={`/department/${dept.id}`}
                        onClick={() => setShowDropdown(false)}
                        className="flex items-center gap-2 p-2 hover:bg-slate-50 rounded-lg text-sm transition-colors text-slate-700"
                      >
                        <span className="text-md">{dept.icon}</span>
                        <div>
                          <p className="font-bold text-slate-800">{dept.name}</p>
                          <p className="text-[10px] text-slate-400">Seats: {dept.totalSeats * 2}</p>
                        </div>
                      </Link>
                    ))}
                  </div>
                )}

                {/* 2. Students Match */}
                {searchResults.students.length > 0 && (
                  <div className="p-2">
                    <span className="block text-[10px] font-bold text-slate-400 uppercase px-2 mb-1">Students Directory</span>
                    {searchResults.students.map((student) => (
                      <Link
                        key={student.id}
                        to={`/department/${student.deptId}?roll=${student.roll}`}
                        onClick={() => setShowDropdown(false)}
                        className="flex items-center justify-between p-2 hover:bg-slate-50 rounded-lg text-sm transition-colors text-slate-700"
                      >
                        <div className="flex items-center gap-2">
                          <span className="text-md">🧑‍🎓</span>
                          <div>
                            <p className="font-bold text-slate-800">{student.name}</p>
                            <p className="text-[10px] text-slate-400 uppercase">
                              {student.deptId} | Sem {student.semester} | {student.shift} Shift
                            </p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-mono text-xs font-bold text-slate-500">Roll: {student.roll}</p>
                          <span className="text-[9px] bg-blue-50 text-blue-700 font-extrabold px-1 rounded">GPA: {student.gpa}</span>
                        </div>
                      </Link>
                    ))}
                  </div>
                )}

                {/* 3. Notices Match */}
                {searchResults.notices.length > 0 && (
                  <div className="p-2">
                    <span className="block text-[10px] font-bold text-slate-400 uppercase px-2 mb-1">Recent Notices</span>
                    {searchResults.notices.map((notice) => (
                      <a
                        key={notice.id}
                        href="#"
                        onClick={(e) => {
                          e.preventDefault();
                          alert(`Real-time download notice PDF: ${notice.title}.pdf`);
                          setShowDropdown(false);
                        }}
                        className="flex items-center justify-between p-2 hover:bg-slate-50 rounded-lg text-sm transition-colors text-slate-700"
                      >
                        <div className="flex items-start gap-2">
                          <span className="text-md">📋</span>
                          <div>
                            <p className="font-bold text-slate-800 line-clamp-1">{notice.title}</p>
                            <p className="text-[10px] text-slate-400">Date: {notice.date}</p>
                          </div>
                        </div>
                        <span className="text-xs bg-red-50 text-red-600 hover:text-red-750 font-bold px-2 py-0.5 rounded border border-red-100 flex items-center gap-0.5">
                          PDF ⬇
                        </span>
                      </a>
                    ))}
                  </div>
                )}

                {totalResults === 0 && (
                  <div className="py-6 text-center text-slate-450 text-xs">
                    <span className="text-lg block mb-1">🔍</span>
                    No matches found for "{searchQuery}"
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Navigation menu bar */}
      <nav className="w-full bg-[#144517] border-t border-green-700/50 shadow-inner">
        <div className="max-w-7xl mx-auto px-4">
          <ul className="flex flex-wrap items-center justify-center md:justify-start gap-1 py-1 text-sm font-medium">
            <li>
              <Link
                to="/"
                className="px-4 py-2.5 inline-block hover:bg-white/10 rounded transition-colors text-green-50"
              >
                Home
              </Link>
            </li>
            <li>
              <a
                href="#departments"
                className="px-4 py-2.5 inline-block hover:bg-white/10 rounded transition-colors text-green-50"
              >
                Department
              </a>
            </li>
            <li>
              <a
                href="#gallery"
                className="px-4 py-2.5 inline-block hover:bg-white/10 rounded transition-colors text-green-50"
              >
                Gallery
              </a>
            </li>
            <li>
              <a
                href="#curriculum"
                className="px-4 py-2.5 inline-block hover:bg-white/10 rounded transition-colors text-green-50"
              >
                About Institute
              </a>
            </li>
            <li>
              <a
                href="#contact"
                className="px-4 py-2.5 inline-block hover:bg-white/10 rounded transition-colors text-green-50"
              >
                Contact us
              </a>
            </li>
          </ul>
        </div>
      </nav>
    </header>
  );
};

export default Header;
