import React, { useState } from "react";
import NoticeBoard from "../Components/NoticeBoard";
import DepartmentGrid from "../Components/DepartmentGrid";
import { events, hotlines, curriculumCards, otherInfo, findStudentByRoll, allStudentRolls, getAllTeachers } from "../utils/data";

const Home = () => {
  const [rollNumber, setRollNumber] = useState("");
  const [searchedStudent, setSearchedStudent] = useState(null);
  const [searchError, setSearchError] = useState("");

  // Hero interactive modals states
  const [showTeachersModal, setShowTeachersModal] = useState(false);
  const [selectedTeacher, setSelectedTeacher] = useState(null);
  const [showStudentsModal, setShowStudentsModal] = useState(false);
  
  // Teachers directory search states
  const [teacherSearch, setTeacherSearch] = useState("");
  const [teacherFilterDept, setTeacherFilterDept] = useState("all");

  const handleResultSearch = (e) => {
    e.preventDefault();
    setSearchError("");
    setSearchedStudent(null);
    
    if (!rollNumber.trim()) {
      setSearchError("Please enter a roll number.");
      return;
    }
    
    const student = findStudentByRoll(rollNumber);
    if (student) {
      setSearchedStudent(student);
    } else {
      setSearchError(`Roll number "${rollNumber}" not found in our database.`);
    }
  };

  const handlePrintResult = () => {
    if (!searchedStudent) return;
    const win = window.open("", "_blank");
    win.document.write(`
      <html>
        <head>
          <title>Academic Transcript - ${searchedStudent.name}</title>
          <style>
            body { font-family: system-ui, -apple-system, sans-serif; padding: 40px; color: #1e293b; background-color: #f8fafc; }
            .sheet { max-width: 600px; margin: 0 auto; background: white; padding: 30px; border-radius: 12px; box-shadow: 0 10px 15px -3px rgba(0,0,0,0.05); border: 1px solid #e2e8f0; }
            .header { text-align: center; border-bottom: 2px solid #1b5e20; padding-bottom: 15px; margin-bottom: 20px; }
            .logo { font-size: 24px; font-weight: 900; color: #1b5e20; }
            .title { font-size: 16px; font-weight: 800; text-transform: uppercase; margin-top: 5px; }
            .info-grid { display: grid; grid-template-cols: 1fr 1fr; gap: 10px; margin-bottom: 25px; font-size: 12px; }
            .info-item { font-weight: 600; }
            .info-label { color: #64748b; font-weight: normal; }
            table { width: 100%; border-collapse: collapse; margin-bottom: 20px; font-size: 12px; }
            th, td { padding: 10px; border-bottom: 1px solid #e2e8f0; text-align: left; }
            th { background-color: #f1f5f9; font-weight: bold; }
            .gpa-box { display: flex; justify-content: space-between; align-items: center; background-color: #f0fdf4; border: 1px solid #bbf7d0; padding: 12px; border-radius: 8px; font-weight: bold; font-size: 14px; color: #166534; }
          </style>
        </head>
        <body>
          <div class="sheet">
            <div class="header">
              <div class="logo">Sirajganj Govt. Polytechnic Institute</div>
              <div class="title">Official Academic Transcript</div>
              <p style="font-size:10px;color:#64748b;margin:2px 0 0 0;">Bangladesh Technical Education Board (BTEB)</p>
            </div>
            <div class="info-grid">
              <div><span class="info-label">Student Name:</span> <span class="info-item">${searchedStudent.name}</span></div>
              <div><span class="info-label">Roll Number:</span> <span class="info-item">${searchedStudent.roll}</span></div>
              <div><span class="info-label">Registration No:</span> <span class="info-item">${searchedStudent.reg}</span></div>
              <div><span class="info-label">Department:</span> <span class="info-item" style="text-transform: uppercase;">${searchedStudent.deptId}</span></div>
              <div><span class="info-label">Semester:</span> <span class="info-item">${searchedStudent.semester}st Semester</span></div>
              <div><span class="info-label">Shift:</span> <span class="info-item">${searchedStudent.shift} Shift</span></div>
              <div><span class="info-label">Session:</span> <span class="info-item">${searchedStudent.session}</span></div>
            </div>
            <table>
              <thead>
                <tr>
                  <th>Subject Code & Name</th>
                  <th style="text-align:center;">Marks</th>
                  <th style="text-align:center;">Grade</th>
                  <th style="text-align:center;">Grade Point</th>
                </tr>
              </thead>
              <tbody>
                ${searchedStudent.results.map(r => `
                  <tr>
                    <td><b>${r.subjectName}</b></td>
                    <td style="text-align:center;">${r.marks}</td>
                    <td style="text-align:center;">${r.letterGrade}</td>
                    <td style="text-align:center;">${r.gradePoint.toFixed(2)}</td>
                  </tr>
                `).join("")}
              </tbody>
            </table>
            <div class="gpa-box">
              <span>Cumulative Semester GPA:</span>
              <span>${searchedStudent.gpa}</span>
            </div>
          </div>
          <script>
            window.onload = function() {
              window.print();
              setTimeout(function() { window.close(); }, 1000);
            }
          </script>
        </body>
      </html>
    `);
    win.document.close();
  };

  // Get and filter all teachers
  const allTeachersList = getAllTeachers();
  const filteredTeachers = allTeachersList.filter((teacher) => {
    const matchesSearch = teacher.name.toLowerCase().includes(teacherSearch.toLowerCase()) || 
                          teacher.designation.toLowerCase().includes(teacherSearch.toLowerCase());
    const matchesDept = teacherFilterDept === "all" || teacher.deptId === teacherFilterDept;
    return matchesSearch && matchesDept;
  });

  return (
    <div className="w-full flex flex-col min-h-screen">
      {/* 1. Hero Section */}
      <section
        className="relative min-h-[500px] flex items-center bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1541339907198-e08756dedf3f?q=80&w=1600&auto=format&fit=crop')",
        }}
      >
        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-[2px]"></div>

        <div className="relative max-w-7xl mx-auto px-6 py-20 text-center md:text-left text-white w-full">
          <div className="max-w-3xl">
           
            {/* <span className="inline-block bg-yellow-400 text-white font-bold text-xs px-3 py-1 rounded-full uppercase tracking-wider mb-4 border border-yellow-600">
              Government of Bangladesh
            </span> */}
            <div className="flex gap-2">
               <img className=" h-18 w-18 mt-3 rounded-full" src="https://sirajganj.polytech.gov.bd/site-assets/images/logo.png" alt="" />
               <h2 className="text-4xl md:text-6xl font-black tracking-tight leading-tight text-white mb-6">
              Sirajganj Goverment Polytechnic Institute
            </h2>

            </div>
            
            <p className="text-lg md:text-xl text-slate-200 mb-8 font-light leading-relaxed">
              Excellence in Technical & Engineering Education. Empowering the next generation of engineers with advanced practical skills and innovation.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
              <a
                href="#notices"
                className="bg-green-600 hover:bg-green-700 text-white font-bold px-6 py-3 rounded-lg shadow-lg transition-colors text-center"
              >
                Read Notices
              </a>
              <a
                href="#departments"
                className="bg-white/10 hover:bg-white/20 text-white font-bold px-6 py-3 rounded-lg backdrop-blur border border-white/30 transition-colors text-center"
              >
                Explore Departments
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Overlay Stats Section (Realtime & Interactive Click actions) */}
      <section className="relative z-10 -mt-16 max-w-7xl mx-auto w-full px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Card 1: Total Students (Click to open Stats modal) */}
          <div
            onClick={() => setShowStudentsModal(true)}
            className="bg-white/90 backdrop-blur-md rounded-2xl p-6 shadow-xl border border-white/50 flex items-center gap-4 hover:translate-y-[-4px] hover:border-green-400 hover:bg-white cursor-pointer transition-all duration-300"
            title="View Student Statistics"
          >
            <div className="w-12 h-12 rounded-xl bg-purple-50 flex items-center justify-center text-2xl shadow-inner">
              🧑‍🎓
            </div>
            <div>
              <span className="text-slate-400 text-xs font-semibold block uppercase">Total Students</span>
              <span className="text-2xl font-black text-slate-800">3,500+</span>
            </div>
          </div>

          {/* Card 2: Total Teachers (Click to open Directory modal) */}
          <div
            onClick={() => setShowTeachersModal(true)}
            className="bg-white/90 backdrop-blur-md rounded-2xl p-6 shadow-xl border border-white/50 flex items-center gap-4 hover:translate-y-[-4px] hover:border-green-400 hover:bg-white cursor-pointer transition-all duration-300"
            title="View Teachers Directory"
          >
            <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center text-2xl shadow-inner">
              🧑‍🏫
            </div>
            <div>
              <span className="text-slate-400 text-xs font-semibold block uppercase">Total Teachers</span>
              <span className="text-2xl font-black text-slate-800">120+</span>
            </div>
          </div>

          {/* Card 3: Departments (Click to scroll down to Departments Grid) */}
          <a
            href="#departments"
            className="bg-white/90 backdrop-blur-md rounded-2xl p-6 shadow-xl border border-white/50 flex items-center gap-4 hover:translate-y-[-4px] hover:border-green-400 hover:bg-white cursor-pointer transition-all duration-300"
            title="Scroll to Academic Departments"
          >
            <div className="w-12 h-12 rounded-xl bg-teal-50 flex items-center justify-center text-2xl shadow-inner">
              ⚙️
            </div>
            <div>
              <span className="text-slate-400 text-xs font-semibold block uppercase">Departments</span>
              <span className="text-2xl font-black text-slate-800">05 Technologies</span>
            </div>
          </a>
        </div>
      </section>

      {/* 2. Notice Board Component */}
      <NoticeBoard />

      {/* 2.5 BTEB Student Result Lookup Portal */}
      <section className="py-12 bg-slate-50 border-t border-b border-slate-200">
        <div className="max-w-4xl mx-auto px-6">
          <div className="bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden">
            {/* Header Banner */}
            <div className="bg-gradient-to-r from-[#1b5e20] to-[#144517] text-white p-6 text-center">
              <span className="text-3xl block mb-2">🇧🇩</span>
              <h2 className="text-xl md:text-2xl font-black text-white m-0 tracking-wide uppercase">
                BTEB Student Result Lookup
              </h2>
              <p className="text-xs text-green-200 font-medium mt-1">
                Enter your 6-digit board exam roll number to fetch official semester transcripts.
              </p>
            </div>

            {/* Input Search Form */}
            <div className="p-6 md:p-8 bg-white text-center space-y-4">
              <form onSubmit={handleResultSearch} className="flex flex-col sm:flex-row gap-3 max-w-lg mx-auto">
                <input
                  type="text"
                  placeholder="Enter 6-digit Roll Number (e.g. 510101)"
                  value={rollNumber}
                  onChange={(e) => setRollNumber(e.target.value)}
                  className="flex-grow px-4 py-3 border border-slate-355 rounded-xl text-slate-800 text-sm focus:outline-none focus:ring-2 focus:ring-green-500 font-semibold"
                />
                <button
                  type="submit"
                  className="bg-green-700 hover:bg-green-800 text-white font-bold px-6 py-3 rounded-xl transition-colors shadow-md text-sm"
                >
                  Search Result
                </button>
              </form>

              {/* Sample test rolls helper */}
              <div className="text-xs text-slate-500 font-semibold max-w-lg mx-auto">
                <span className="block mb-1 text-slate-400">Valid sample rolls for testing:</span>
                <div className="flex flex-wrap justify-center gap-1.5">
                  {allStudentRolls.map((sr, idx) => (
                    <span
                      key={idx}
                      onClick={() => setRollNumber(String(sr.roll))}
                      className="bg-slate-100 hover:bg-slate-200 text-green-700 border border-slate-200 px-2 py-0.5 rounded cursor-pointer font-bold transition-all text-[11px]"
                      title={`${sr.name} (${sr.dept})`}
                    >
                      {sr.roll}
                    </span>
                  ))}
                </div>
              </div>

              {/* Search Error */}
              {searchError && (
                <div className="text-sm font-semibold text-red-600 bg-red-50 border border-red-155 p-3 rounded-xl max-w-lg mx-auto animate-pulse">
                  ⚠ {searchError}
                </div>
              )}
            </div>

            {/* Display Transcript Sheet Panel */}
            {searchedStudent && (
              <div className="border-t border-slate-200 bg-slate-50 p-6 md:p-8 animate-in fade-in zoom-in duration-300">
                <div className="bg-white rounded-xl border border-slate-250 p-6 shadow-md max-w-2xl mx-auto space-y-6">
                  {/* Transcript Header */}
                  <div className="text-center border-b-2 border-green-600 pb-4">
                    <span className="text-sm bg-green-50 text-green-800 border border-green-200 px-2.5 py-0.5 rounded font-black uppercase">
                      Official Semester Transcript
                    </span>
                    <h3 className="text-lg md:text-xl font-black text-slate-800 mt-2">
                      Sirajganj Govt. Polytechnic Institute
                    </h3>
                    <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">
                      Bangladesh Technical Education Board (BTEB)
                    </p>
                  </div>

                  {/* Student Details Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-semibold text-slate-600 leading-relaxed pt-2">
                    <p><span className="text-slate-400">Student Name:</span> <span className="text-slate-800 font-bold">{searchedStudent.name}</span></p>
                    <p><span className="text-slate-400">BTEB Board Roll:</span> <span className="text-slate-800 font-bold">{searchedStudent.roll}</span></p>
                    <p><span className="text-slate-400">Registration No:</span> <span className="text-slate-800 font-bold">{searchedStudent.reg}</span></p>
                    <p><span className="text-slate-400">Department Tech:</span> <span className="text-slate-800 font-bold uppercase">{searchedStudent.deptId}</span></p>
                    <p><span className="text-slate-400">Academic Semester:</span> <span className="text-slate-800 font-bold">{searchedStudent.semester}st Semester</span></p>
                    <p><span className="text-slate-400">Shift Mode:</span> <span className="text-slate-800 font-bold">{searchedStudent.shift} Shift</span></p>
                    <p><span className="text-slate-400">Academic Session:</span> <span className="text-slate-800 font-bold">{searchedStudent.session}</span></p>
                  </div>

                  {/* Subject Grades Table */}
                  <div className="border border-slate-200 rounded-xl overflow-hidden shadow-inner">
                    <table className="w-full text-left text-xs font-semibold">
                      <thead>
                        <tr className="bg-slate-100 border-b border-slate-200 text-slate-700">
                          <th className="py-2.5 px-4">Subject Name</th>
                          <th className="py-2.5 px-4 text-center">Marks</th>
                          <th className="py-2.5 px-4 text-center">Letter Grade</th>
                          <th className="py-2.5 px-4 text-center">Grade Point</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-150 text-slate-600">
                        {searchedStudent.results.map((res, i) => (
                          <tr key={i} className="hover:bg-slate-50/50">
                            <td className="py-2 px-4 text-slate-800 font-bold">{res.subjectName}</td>
                            <td className="py-2 px-4 text-center">{res.marks}</td>
                            <td className="py-2 px-4 text-center">
                              <span
                                className={`inline-block font-extrabold text-[10px] px-1.5 py-0.5 rounded ${
                                  res.letterGrade === "A+"
                                    ? "bg-green-100 text-green-700"
                                    : res.letterGrade === "F"
                                    ? "bg-red-100 text-red-700"
                                    : "bg-slate-100 text-slate-700"
                                }`}
                              >
                                {res.letterGrade}
                              </span>
                            </td>
                            <td className="py-2 px-4 text-center font-black">{res.gradePoint.toFixed(2)}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  {/* GPA Box & Action Buttons */}
                  <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-slate-150">
                    <div className="bg-green-50 border border-green-200 rounded-xl px-4 py-2.5 text-center sm:text-left">
                      <span className="text-[10px] text-green-600 block font-bold uppercase tracking-wider">Semester GPA</span>
                      <span className="text-xl font-black text-green-800">{searchedStudent.gpa}</span>
                    </div>

                    <div className="flex gap-2 w-full sm:w-auto">
                      <button
                        onClick={handlePrintResult}
                        className="flex-grow sm:flex-grow-0 bg-green-700 hover:bg-green-800 text-white font-bold px-5 py-2.5 rounded-xl text-xs transition-colors shadow-md flex items-center justify-center gap-1.5"
                      >
                        Print Transcript 🖨️
                      </button>
                      <button
                        onClick={() => setSearchedStudent(null)}
                        className="flex-grow sm:flex-grow-0 bg-slate-200 hover:bg-slate-300 text-slate-700 font-bold px-4 py-2.5 rounded-xl text-xs transition-colors"
                      >
                        Clear
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* 3. Departments Grid Component */}
      <DepartmentGrid />

      {/* 4. Events Section */}
      <section className="py-12 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between border-b border-slate-200 pb-3 mb-6">
            <h2 className="text-2xl font-bold text-slate-800">Latest Events & Seminars</h2>
            <a
              href="#all-events"
              className="text-sm font-semibold text-green-700 hover:text-green-800 hover:underline"
              onClick={(e) => {
                e.preventDefault();
                alert("Redirecting to all events page...");
              }}
            >
              View More &rarr;
            </a>
          </div>

          <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-100/80 border-b border-slate-200 text-slate-700 text-sm font-semibold">
                  <th className="py-3 px-6 w-28">Start Date</th>
                  <th className="py-3 px-6">Event Name</th>
                  <th className="py-3 px-6 w-28">Time</th>
                  <th className="py-3 px-6 w-36 text-center">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-600 text-sm">
                {events.map((evt) => (
                  <tr key={evt.id} className="hover:bg-slate-55 transition-colors">
                    <td className="py-4 px-6 font-semibold text-slate-500">{evt.date}</td>
                    <td className="py-4 px-6 font-bold text-slate-800">{evt.name}</td>
                    <td className="py-4 px-6 font-medium">{evt.time}</td>
                    <td className="py-4 px-6 text-center">
                      <span
                        className={`inline-block text-xs font-bold px-2.5 py-1 rounded-full ${
                          evt.status === "Completed"
                            ? "bg-slate-100 text-slate-600"
                            : evt.status === "Upcoming"
                            ? "bg-green-100 text-green-800"
                            : "bg-blue-100 text-blue-800"
                        }`}
                      >
                        {evt.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* 5. Gallery Section */}
      <section id="gallery" className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between border-b border-slate-200 pb-3 mb-8">
            <h2 className="text-2xl font-bold text-slate-800">Campus Video & Gallery</h2>
            <a
              href="#view-gallery"
              className="text-sm font-semibold text-green-700 hover:underline"
              onClick={(e) => {
                e.preventDefault();
                alert("Opening full photos & videos vault...");
              }}
            >
              View More &rarr;
            </a>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Campus Drone/Video Embed */}
            <div className="bg-slate-900 rounded-xl overflow-hidden shadow-lg border border-slate-800 relative aspect-video flex flex-col justify-end">
              <iframe
                title="Sirajganj Polytechnic Campus Tour"
                src="https://www.youtube.com/embed/dQw4w9WgXcQ"
                className="absolute inset-0 w-full h-full border-none"
                allowFullScreen
              ></iframe>
            </div>

            {/* Photo Cards */}
            <div className="grid grid-cols-2 gap-4">
              <div className="relative group overflow-hidden rounded-xl shadow-md border border-slate-100 aspect-square">
                <img
                  src="https://images.unsplash.com/photo-1562774053-701939374585?q=80&w=600&auto=format&fit=crop"
                  alt="Campus Main Building"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent flex items-end p-4">
                  <span className="text-white text-xs font-semibold">Campus Building</span>
                </div>
              </div>
              <div className="relative group overflow-hidden rounded-xl shadow-md border border-slate-100 aspect-square">
                <img
                  src="https://images.unsplash.com/photo-1581092921461-eab62e97a780?q=80&w=600&auto=format&fit=crop"
                  alt="Practical Labs"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent flex items-end p-4">
                  <span className="text-white text-xs font-semibold">Practical Computer Labs</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. About Curriculum Section */}
      <section id="curriculum" className="py-16 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center max-w-xl mx-auto mb-12">
            <h2 className="text-2xl md:text-3xl font-extrabold text-slate-800">Academic & Curriculum</h2>
            <p className="text-slate-500 text-sm mt-1">Information on diplomas, criteria, calendars</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {curriculumCards.map((card, i) => (
              <div key={i} className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow">
                <div>
                  <div className="w-12 h-12 rounded-xl bg-slate-100 flex items-center justify-center text-2xl mb-4">
                    {card.icon}
                  </div>
                  <h3 className="text-lg font-bold text-slate-800 mb-2">{card.title}</h3>
                  <p className="text-sm text-slate-500 mb-5 leading-relaxed">{card.desc}</p>
                </div>
                <ul className="space-y-2 border-t border-slate-100 pt-4 text-xs font-semibold text-slate-600">
                  {card.points.map((pt, idx) => (
                    <li key={idx} className="flex items-center gap-2">
                      <span className="text-green-600">✔</span> {pt}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. Other Information Grid */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center max-w-xl mx-auto mb-12 border-b border-slate-100 pb-4">
            <h2 className="text-2xl md:text-3xl font-bold text-slate-800">Essential Resources Portal</h2>
            <p className="text-slate-500 text-sm mt-1">Access policy, routines, student links, and administrative charters</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {otherInfo.map((sec, idx) => (
              <div key={idx} className="border border-slate-200 rounded-xl p-5 hover:border-green-400 bg-slate-50/50 transition-colors">
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-2xl">{sec.icon}</span>
                  <h3 className="font-bold text-slate-800">{sec.title}</h3>
                </div>
                <ul className="space-y-2 text-sm text-slate-600">
                  {sec.items.map((item, idy) => (
                    <li key={idy} className="hover:text-green-700 transition-colors cursor-pointer flex items-center gap-1.5" onClick={() => alert(`Opening resource: ${item}`)}>
                      <span className="text-slate-300 font-bold">&bull;</span> {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 8. Map & National Anthem / Connections */}
      <section className="py-16 bg-slate-50 border-t border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Map Frame */}
          <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm space-y-4">
            <h3 className="text-lg font-bold text-slate-800 flex items-center gap-2">
              <span>📍</span> Campus Location Map
            </h3>
            <div className="rounded-lg overflow-hidden border border-slate-200 aspect-video">
              <iframe
                title="Sirajganj Polytechnic Location Map"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3630.9388836526197!2d89.70420787612739!3d24.487541659972304!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39ffd0298a83d735%3A0xc3453b754378f4f6!2sSirajganj%20Polytechnic%20Institute!5e0!3m2!1sen!2sbd!4v1700000000000!5m2!1sen!2sbd"
                className="w-full h-full border-none"
                allowFullScreen=""
                loading="lazy"
              ></iframe>
            </div>
          </div>

          {/* National Anthem and Facebook connection */}
          <div className="space-y-6">
            {/* National Anthem player representation */}
            <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
              <h3 className="text-md font-bold text-slate-800 mb-3 flex items-center gap-2">
                <span>🇧🇩</span> National Anthem & Links
              </h3>
              <div className="rounded-lg overflow-hidden bg-slate-950 aspect-video flex flex-col justify-end">
                {/* Embed YouTube player for Amar Shonar Bangla */}
                <iframe
                  title="Bangladesh National Anthem"
                  src="https://www.youtube.com/embed/e_n4UeZ-R84"
                  className="w-full h-full border-none"
                  allowFullScreen
                ></iframe>
              </div>
            </div>

            {/* Facebook connectivity block */}
            <div
              className="bg-cover bg-center rounded-xl overflow-hidden p-6 relative flex flex-col justify-between min-h-[140px] shadow-sm text-white"
              style={{
                backgroundImage:
                  "url('https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?q=80&w=600&auto=format&fit=crop')",
              }}
            >
              <div className="absolute inset-0 bg-[#3b5998]/85"></div>
              <div className="relative space-y-2">
                <span className="bg-white/20 text-white font-bold text-[10px] px-2 py-0.5 rounded uppercase">Official Community Group</span>
                <h4 className="font-extrabold text-lg">Connect with SPI Facebook Group</h4>
                <p className="text-xs text-blue-100 font-medium">Join 15K+ alumni, students, and updates online.</p>
              </div>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noreferrer"
                className="relative bg-white hover:bg-slate-50 text-[#3b5998] hover:text-[#3b5998] font-bold text-xs py-2 px-4 rounded-lg w-fit transition-colors shadow shadow-slate-900/20"
              >
                Join Facebook Group &rarr;
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* 9. Emergency Hotline Grid */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center max-w-xl mx-auto mb-10">
            <h2 className="text-xl md:text-2xl font-black text-slate-800">Emergency Hotlines</h2>
            <p className="text-slate-400 text-xs mt-1">National emergency helpline portals and helpline desks</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {hotlines.map((hl, idx) => (
              <div
                key={idx}
                className="border border-slate-200 hover:border-slate-300 rounded-xl p-4 bg-slate-50/50 flex flex-col justify-between items-center text-center shadow-inner hover:shadow-md transition-shadow group cursor-pointer"
                onClick={() => alert(`Calling emergency helpline: ${hl.number}`)}
              >
                <div className="text-xs text-slate-500 font-bold uppercase tracking-wider mb-2">
                  {hl.name}
                </div>
                <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-slate-100 to-slate-200 flex items-center justify-center font-black text-lg text-slate-700 shadow-inner group-hover:scale-105 transition-transform">
                  {hl.text}
                </div>
                <div className="mt-2 text-xs font-semibold text-slate-400">
                  {hl.desc}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* MODAL 1: TOTAL TEACHERS DIRECTORY PORTAL */}
      {showTeachersModal && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-5xl w-full p-6 md:p-8 relative shadow-2xl border border-slate-150 animate-in fade-in zoom-in-95 duration-200 max-h-[90vh] overflow-y-auto">
            {/* Close */}
            <button
              onClick={() => {
                setShowTeachersModal(false);
                setSelectedTeacher(null);
              }}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-650 bg-slate-100 p-2.5 rounded-full transition-all focus:outline-none z-10 font-bold"
            >
              ✕
            </button>

            <div className="mb-6 border-b border-slate-150 pb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h3 className="text-xl font-black text-slate-800">
                  SPI Faculty Board Directory
                </h3>
                <p className="text-xs text-slate-400 font-medium">
                  Browse qualifications, profiles, and contact details of all departments
                </p>
              </div>
            </div>

            {/* Filters panel */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6 bg-slate-50 p-4 rounded-2xl border border-slate-150">
              <input
                type="text"
                placeholder="Search teacher by name or title..."
                value={teacherSearch}
                onChange={(e) => setTeacherSearch(e.target.value)}
                className="w-full px-4 py-2 text-sm bg-white border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-400"
              />
              <select
                value={teacherFilterDept}
                onChange={(e) => setTeacherFilterDept(e.target.value)}
                className="w-full px-4 py-2 text-sm bg-white border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-400 text-slate-600 font-medium"
              >
                <option value="all">All Departments</option>
                <option value="cst">Computer Science & Technology (CST)</option>
                <option value="electrical">Electrical Technology</option>
                <option value="electronics">Electronics Technology</option>
                <option value="civil">Civil Technology</option>
                <option value="rac">Refrigeration & Air Conditioning (RAC)</option>
              </select>
            </div>

            {/* Master Detail Grid inside modal */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Left Column: Filtered List */}
              <div className="lg:col-span-2 space-y-3 max-h-[450px] overflow-y-auto pr-1">
                {filteredTeachers.length > 0 ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {filteredTeachers.map((t) => (
                      <div
                        key={t.id}
                        onClick={() => setSelectedTeacher(t)}
                        className={`p-4 border rounded-2xl cursor-pointer transition-all flex flex-col justify-between ${
                          selectedTeacher?.id === t.id
                            ? "bg-green-50/50 border-green-550 shadow-sm"
                            : "bg-slate-50 border-slate-200 hover:bg-white hover:border-green-400 hover:shadow"
                        }`}
                      >
                        <div>
                          <div className="font-extrabold text-slate-800 text-sm">{t.name}</div>
                          <span className="inline-block text-[10px] text-green-700 font-bold border border-green-100 bg-green-50 px-2 py-0.5 rounded-full mt-1">
                            {t.designation}
                          </span>
                        </div>
                        <div className="text-[10px] text-slate-400 font-bold uppercase tracking-wider mt-4 pt-2 border-t border-slate-200/60">
                          {t.deptId} Tech | {t.shift}
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="py-12 text-center text-slate-400 text-xs">
                    No faculty found matching search filters.
                  </div>
                )}
              </div>

              {/* Right Column: Teacher Detail View Card */}
              <div className="lg:col-span-1">
                {selectedTeacher ? (
                  <div className="bg-slate-50 rounded-2xl p-5 border border-slate-200 space-y-4 animate-in fade-in zoom-in-95 duration-200">
                    <div className="text-center pb-4 border-b border-slate-200">
                      <div className="w-16 h-16 rounded-full bg-green-150 text-3xl flex items-center justify-center mx-auto mb-3 border border-green-300">
                        👨‍🏫
                      </div>
                      <h4 className="font-black text-slate-800 text-md leading-tight">{selectedTeacher.name}</h4>
                      <p className="text-xs text-green-700 font-semibold mt-1">{selectedTeacher.designation}</p>
                      <p className="text-[9px] bg-slate-200 text-slate-600 px-2.5 py-0.5 rounded font-extrabold inline-block mt-2 uppercase tracking-wide">
                        {selectedTeacher.deptId} Department
                      </p>
                    </div>

                    <div className="space-y-3 text-xs leading-relaxed">
                      {/* Education info */}
                      <div>
                        <span className="font-extrabold text-slate-400 uppercase text-[9px] block">Educational Background</span>
                        <p className="text-slate-700 font-semibold">{selectedTeacher.education}</p>
                      </div>

                      {/* Experience info */}
                      <div>
                        <span className="font-extrabold text-slate-400 uppercase text-[9px] block">Teaching & Industry Experience</span>
                        <p className="text-slate-700 font-medium">{selectedTeacher.experience}</p>
                      </div>

                      {/* Contact Info */}
                      <div className="pt-3 border-t border-slate-200 space-y-1.5 font-bold text-slate-650">
                        <p className="flex items-center gap-1.5">
                          <span>📞</span> {selectedTeacher.phone}
                        </p>
                        <p className="flex items-center gap-1.5">
                          <span>✉️</span> {selectedTeacher.email}
                        </p>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="bg-slate-50 rounded-2xl p-6 border border-dashed border-slate-300 text-center text-slate-400 text-xs py-20">
                    <span className="text-3xl block mb-2">👈</span>
                    Select a teacher from the list to view their qualifications, work experiences, and degrees.
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* MODAL 2: TOTAL STUDENTS OVERVIEW STATS */}
      {showStudentsModal && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 relative shadow-2xl border border-slate-200 animate-in fade-in zoom-in-95 duration-200">
            <button
              onClick={() => setShowStudentsModal(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-650 bg-slate-100 p-2 rounded-full focus:outline-none font-bold"
            >
              ✕
            </button>
            <div className="text-center pb-4 mb-4 border-b border-slate-100">
              <span className="text-4xl block mb-2">📊</span>
              <h3 className="text-lg font-black text-slate-800">Student Enrollment Overview</h3>
              <p className="text-xs text-slate-400">Total strength at Sirajganj Govt. Polytechnic</p>
            </div>
            <div className="space-y-3.5 text-sm text-slate-600 font-semibold leading-relaxed">
              <div className="flex justify-between bg-slate-50 p-3 rounded-xl border border-slate-100">
                <span>Computer Technology (CST)</span>
                <span className="font-extrabold text-slate-800">800 Students</span>
              </div>
              <div className="flex justify-between bg-slate-50 p-3 rounded-xl border border-slate-100">
                <span>Electrical Engineering</span>
                <span className="font-extrabold text-slate-800">800 Students</span>
              </div>
              <div className="flex justify-between bg-slate-50 p-3 rounded-xl border border-slate-100">
                <span>Civil Technology</span>
                <span className="font-extrabold text-slate-800">800 Students</span>
              </div>
              <div className="flex justify-between bg-slate-50 p-3 rounded-xl border border-slate-100">
                <span>Electronics Engineering</span>
                <span className="font-extrabold text-slate-800">800 Students</span>
              </div>
              <div className="flex justify-between bg-slate-50 p-3 rounded-xl border border-slate-100">
                <span>RAC Technology</span>
                <span className="font-extrabold text-slate-800">300 Students</span>
              </div>
            </div>
            <div className="mt-6 pt-4 border-t border-slate-100 text-center text-xs text-slate-400 font-medium">
              Regular and shift-wise enrollment under BTEB board guidelines.
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
