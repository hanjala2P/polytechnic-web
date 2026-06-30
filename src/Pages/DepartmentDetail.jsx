import React, { useState, useEffect } from "react";
import { useParams, Link, useSearchParams } from "react-router";
import { departments, departmentTeachers, getStudents, getClassRoutine } from "../utils/data";

const DepartmentDetail = () => {
  const { deptId } = useParams();
  const [searchParams] = useSearchParams();
  const rollParam = searchParams.get("roll");

  const [selectedShift, setSelectedShift] = useState("Morning");
  const [selectedSemester, setSelectedSemester] = useState(1);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [subView, setSubView] = useState("directory"); // "directory" or "routine"
  const [showAllStudents, setShowAllStudents] = useState(false); // See All Toggle

  // Find department info
  const departmentInfo = departments.find((d) => d.id === deptId);

  // If department not found
  if (!departmentInfo) {
    return (
      <div className="max-w-7xl mx-auto px-6 py-20 text-center">
        <h2 className="text-3xl font-black text-slate-800 mb-4">Department Not Found</h2>
        <p className="text-slate-500 mb-8">The requested department code does not exist.</p>
        <Link to="/" className="bg-green-600 hover:bg-green-700 text-white font-bold px-6 py-2.5 rounded-lg transition-colors">
          Go Back Home
        </Link>
      </div>
    );
  }

  // Get teachers for this department
  const teachers = departmentTeachers[deptId] || [];

  // Get students for selected shift & semester
  const students = getStudents(deptId, selectedShift.toLowerCase(), selectedSemester);

  // Get displayed students (Show only 8 by default, show all if showAllStudents is true)
  const displayedStudents = showAllStudents ? students : students.slice(0, 8);

  // Get class routine
  const routine = getClassRoutine(deptId, selectedShift.toLowerCase(), selectedSemester);

  // Track search roll param from URL (for header search click-through)
  useEffect(() => {
    if (rollParam) {
      const rollNum = parseInt(rollParam, 10);
      // Scan shift and semester to locate student and update view states
      for (const shift of ["Morning", "Day"]) {
        for (let sem = 1; sem <= 8; sem++) {
          const list = getStudents(deptId, shift.toLowerCase(), sem);
          const found = list.find((s) => s.roll === rollNum);
          if (found) {
            setSelectedShift(shift);
            setSelectedSemester(sem);
            setSelectedStudent(found);
            setSubView("directory");
            setShowAllStudents(true); // Automatically expand list if accessed directly
            break;
          }
        }
      }
    }
  }, [rollParam, deptId]);

  // Reset student selection when shift or semester parameters change manually
  useEffect(() => {
    if (!rollParam) {
      setSelectedStudent(null);
    }
    setShowAllStudents(false); // Reset pagination toggle
  }, [selectedShift, selectedSemester, deptId]);

  // Function to print/download student ID card
  const handleDownloadIDCard = () => {
    if (!selectedStudent) return;
    
    // Simulating printable popup window
    const win = window.open("", "_blank");
    win.document.write(`
      <html>
        <head>
          <title>Student ID Card - ${selectedStudent.name}</title>
          <style>
            body {
              display: flex;
              align-items: center;
              justify-content: center;
              height: 100vh;
              background-color: #f1f5f9;
              font-family: system-ui, -apple-system, sans-serif;
              margin: 0;
            }
            .card-wrapper {
              transform: scale(1.5);
              box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
              border-radius: 16px;
              overflow: hidden;
            }
            .id-card {
              background: linear-gradient(135deg, #1b5e20 0%, #144517 100%);
              width: 340px;
              height: 215px;
              border-radius: 16px;
              padding: 20px;
              color: white;
              display: flex;
              flex-direction: column;
              justify-content: space-between;
              border: 1px solid #22c55e;
              box-sizing: border-box;
            }
            .header {
              display: flex;
              align-items: center;
              justify-content: space-between;
              border-bottom: 1px solid rgba(255, 255, 255, 0.2);
              padding-bottom: 10px;
            }
            .logo-wrap {
              display: flex;
              align-items: center;
              gap: 8px;
            }
            .logo {
              width: 32px;
              height: 32px;
              background: white;
              color: #1b5e20;
              border-radius: 50%;
              display: flex;
              align-items: center;
              justify-content: center;
              font-weight: 900;
              font-size: 11px;
            }
            .title-main {
              font-size: 9px;
              font-weight: 900;
              text-transform: uppercase;
              letter-spacing: 1px;
            }
            .title-sub {
              font-size: 7px;
              color: #a7f3d0;
            }
            .badge {
              font-size: 7px;
              background-color: #dc2626;
              padding: 2px 6px;
              border-radius: 4px;
              font-weight: 900;
            }
            .body {
              display: flex;
              gap: 16px;
              align-items: center;
              padding: 10px 0;
            }
            .avatar {
              width: 60px;
              height: 60px;
              background: rgba(255, 255, 255, 0.1);
              border: 1px solid rgba(255, 255, 255, 0.2);
              border-radius: 12px;
              display: flex;
              align-items: center;
              justify-content: center;
              font-size: 30px;
            }
            .info-name {
              font-size: 14px;
              font-weight: 900;
              letter-spacing: 0.5px;
            }
            .info-dept {
              font-size: 8px;
              color: #a7f3d0;
              text-transform: uppercase;
              font-weight: bold;
            }
            .info-grid {
              display: grid;
              grid-template-cols: 1fr 1fr;
              gap: 2px 10px;
              font-size: 8px;
              color: #d1fae5;
              margin-top: 4px;
            }
            .bold {
              color: white;
              font-weight: 800;
            }
            .footer {
              border-top: 1px solid rgba(255, 255, 255, 0.1);
              padding-top: 6px;
              display: flex;
              justify-content: space-between;
              font-size: 7px;
              color: #a7f3d0;
            }
          </style>
        </head>
        <body>
          <div class="card-wrapper">
            <div class="id-card">
              <div class="header">
                <div class="logo-wrap">
                  <div class="logo">SPI</div>
                  <div>
                    <span class="title-main">Student Smart Card</span>
                    <span class="title-sub" style="display:block;">Sirajganj Govt. Polytechnic</span>
                  </div>
                </div>
                <span class="badge">STUDENT</span>
              </div>
              <div class="body">
                <div class="avatar">👤</div>
                <div>
                  <div class="info-name">${selectedStudent.name}</div>
                  <div class="info-dept">${departmentInfo.name}</div>
                  <div class="info-grid">
                    <span>Roll: <span class="bold">${selectedStudent.roll}</span></span>
                    <span>Reg: <span class="bold">${selectedStudent.reg}</span></span>
                    <span style="grid-column: span 2;">Card No: <span class="bold">${selectedStudent.idCardNo}</span></span>
                  </div>
                </div>
              </div>
              <div class="footer">
                <span>Ph: ${selectedStudent.phone}</span>
                <span>Parent Ph: ${selectedStudent.parentPhone}</span>
              </div>
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

  return (
    <div className="bg-slate-50 min-h-screen py-10">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        
        {/* Back Link and Header */}
        <div className="mb-8">
          <Link to="/" className="inline-flex items-center gap-1.5 text-sm font-semibold text-green-700 hover:text-green-800 hover:underline mb-4">
            <span>&larr;</span> Back to Home Dashboard
          </Link>
          
          <div className="bg-white rounded-2xl p-6 md:p-8 border border-slate-200 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="flex items-center gap-5">
              <div className="w-16 h-16 bg-green-50 rounded-2xl flex items-center justify-center text-4xl shadow-inner border border-green-100">
                {departmentInfo.icon}
              </div>
              <div>
                <h2 className="text-2xl md:text-3xl font-black text-slate-800 leading-tight">
                  {departmentInfo.name}
                </h2>
                <p className="text-sm text-slate-500 font-medium mt-1">
                  Sirajganj Govt. Polytechnic Institute | 4-Year Diploma Curriculum
                </p>
              </div>
            </div>
            <div className="bg-green-50/60 border border-green-150 px-4 py-2.5 rounded-xl text-xs font-bold text-green-800 self-start md:self-auto">
              Seats Capacity: {departmentInfo.totalSeats * 2} (Two Shifts Combined)
            </div>
          </div>
        </div>

        {/* Grid Area: Teachers, Shifts/Semesters & Schedules */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Left Column: Department Info & Faculty Contacts */}
          <div className="lg:col-span-1 space-y-6">
            
            {/* Description Card */}
            <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm">
              <h3 className="text-md font-bold text-slate-800 mb-3 pb-2 border-b border-slate-100">
                Course Description
              </h3>
              <p className="text-slate-600 text-sm leading-relaxed font-normal">
                {departmentInfo.description}
              </p>
            </div>

            {/* Teachers Directory */}
            <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm">
              <div className="flex items-center justify-between mb-4 pb-2 border-b border-slate-100">
                <h3 className="text-md font-bold text-slate-800">
                  Teachers Directory ({teachers.length})
                </h3>
                <span className="text-xs font-semibold text-slate-400">SPI Faculty</span>
              </div>
              
              <div className="space-y-4 max-h-[360px] overflow-y-auto pr-1">
                {teachers.map((teacher, idx) => (
                  <div key={idx} className="p-3 bg-slate-50 hover:bg-slate-100/70 border border-slate-150 rounded-xl transition-colors space-y-2">
                    <div>
                      <div className="font-bold text-slate-800 text-sm">{teacher.name}</div>
                      <div className="text-xs text-green-700 font-semibold mt-0.5">{teacher.designation}</div>
                    </div>
                    <div className="text-xs text-slate-500 space-y-1 pt-1.5 border-t border-slate-200/60 font-medium">
                      <p className="flex items-center gap-1.5">
                        <span>📞</span> {teacher.phone}
                      </p>
                      <p className="flex items-center gap-1.5">
                        <span>✉️</span> {teacher.email}
                      </p>
                      <span className="inline-block text-[10px] bg-slate-200 text-slate-700 px-2 py-0.5 rounded font-bold uppercase mt-1">
                        {teacher.shift}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Columns: Roster schedules & routines switcher */}
          <div className="lg:col-span-2 space-y-6">
            
            {/* Shift and Semester selectors */}
            <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-6">
              
              {/* Shift Switcher */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <span className="text-sm font-extrabold text-slate-700 uppercase tracking-wider">
                  Select Shift
                </span>
                <div className="bg-slate-100 p-1 rounded-xl flex gap-1 self-start sm:self-auto border border-slate-200">
                  {["Morning", "Day"].map((shift) => (
                    <button
                      key={shift}
                      onClick={() => setSelectedShift(shift)}
                      className={`px-5 py-2 text-xs font-bold rounded-lg transition-all ${
                        selectedShift === shift
                          ? "bg-white text-green-700 shadow-sm"
                          : "text-slate-500 hover:text-slate-800"
                      }`}
                    >
                      {shift} Shift
                    </button>
                  ))}
                </div>
              </div>

              {/* Semester Grid */}
              <div className="space-y-3">
                <span className="text-sm font-extrabold text-slate-700 uppercase tracking-wider block">
                  Select Semester
                </span>
                <div className="grid grid-cols-4 sm:grid-cols-8 gap-2">
                  {[1, 2, 3, 4, 5, 6, 7, 8].map((sem) => (
                    <button
                      key={sem}
                      onClick={() => setSelectedSemester(sem)}
                      className={`py-3 px-1.5 text-center text-xs font-bold rounded-xl border transition-all ${
                        selectedSemester === sem
                          ? "bg-green-600 border-green-600 text-white shadow-md shadow-green-100"
                          : "bg-slate-50 border-slate-200 text-slate-600 hover:border-slate-350 hover:bg-slate-100"
                      }`}
                    >
                      <span className="block text-md font-black">{sem}</span>
                      <span className="text-[10px] font-normal uppercase opacity-75">Sem</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Sub-view selection tabs (Students list vs Shift Routines) */}
            <div className="flex bg-white rounded-t-2xl border border-slate-200 border-b-0 px-6 pt-4 gap-4">
              <button
                onClick={() => setSubView("directory")}
                className={`pb-3 px-4 font-bold text-sm border-b-2 transition-all ${
                  subView === "directory"
                    ? "border-green-600 text-green-700"
                    : "border-transparent text-slate-400 hover:text-slate-650"
                }`}
              >
                Students Directory ({students.length})
              </button>
              <button
                onClick={() => setSubView("routine")}
                className={`pb-3 px-4 font-bold text-sm border-b-2 transition-all ${
                  subView === "routine"
                    ? "border-green-600 text-green-700"
                    : "border-transparent text-slate-400 hover:text-slate-650"
                }`}
              >
                Class Routine Timetable
              </button>
            </div>

            {/* Directory Roster Section */}
            {subView === "directory" ? (
              <div className="bg-white rounded-b-2xl border border-slate-200 shadow-sm overflow-hidden border-t-0">
                <div className="p-5 bg-[#673ab7] text-white flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <span className="text-lg">🧑‍🎓</span>
                    <div>
                      <h4 className="font-extrabold text-md text-white m-0 leading-tight">
                        {selectedSemester}st Semester - {selectedShift} Shift Roster
                      </h4>
                      <p className="text-[11px] text-purple-200">
                        Click on any student record to view ID cards & result sheets
                      </p>
                    </div>
                  </div>
                  <span className="text-xs font-bold bg-white/20 px-3 py-1 rounded-full text-white">
                    Showing {displayedStudents.length} of {students.length}
                  </span>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="bg-slate-100/80 border-b border-slate-250 text-slate-700 text-xs font-bold uppercase tracking-wider">
                        <th className="py-3 px-6 w-24">Roll No.</th>
                        <th className="py-3 px-6">Student Name</th>
                        <th className="py-3 px-6 w-24 text-center">GPA</th>
                        <th className="py-3 px-6 w-24 text-center">Profile</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 text-slate-600 text-sm">
                      {displayedStudents.map((student) => (
                        <tr
                          key={student.id}
                          onClick={() => setSelectedStudent(student)}
                          className="hover:bg-slate-50/85 transition-colors cursor-pointer group"
                        >
                          <td className="py-3.5 px-6 font-semibold text-slate-500">{student.roll}</td>
                          <td className="py-3.5 px-6 font-bold text-slate-800 group-hover:text-green-700 transition-colors">
                            {student.name}
                          </td>
                          <td className="py-3.5 px-6 text-center">
                            <span className="inline-block bg-blue-50 text-blue-700 border border-blue-100 px-2 py-0.5 rounded font-black text-xs">
                              {student.gpa}
                            </span>
                          </td>
                          <td className="py-3.5 px-6 text-center text-xs font-bold text-green-700 hover:underline">
                            View details
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* See All / See Less Pagination Toggles */}
                {students.length > 8 && (
                  <div className="p-4 bg-slate-50 text-center border-t border-slate-100">
                    <button
                      onClick={() => setShowAllStudents(!showAllStudents)}
                      className="px-6 py-2 bg-white hover:bg-slate-100 border border-slate-250 rounded-xl text-xs font-bold text-slate-750 transition-all shadow-sm focus:outline-none"
                    >
                      {showAllStudents ? "See Less ⬆" : `See All Students (${students.length}) ⬇`}
                    </button>
                  </div>
                )}
              </div>
            ) : (
              // Class Routine View Timetable Section
              <div className="bg-white rounded-b-2xl border border-slate-200 shadow-sm overflow-hidden p-6 border-t-0 space-y-6">
                <div className="p-4 bg-[#1b5e20] text-white rounded-xl flex items-center justify-between">
                  <div>
                    <h4 className="font-extrabold text-md text-white m-0 leading-tight">
                      Weekly Class Timetable (Sunday - Thursday)
                    </h4>
                    <p className="text-[11px] text-green-200 mt-0.5">
                      {departmentInfo.name} | Semester {selectedSemester} | {selectedShift} Shift
                    </p>
                  </div>
                  <button
                    onClick={() => {
                      alert("Simulating routine print setup...");
                      window.print();
                    }}
                    className="text-xs font-bold bg-white text-green-800 hover:bg-green-50 px-3 py-1.5 rounded-lg shadow-sm border"
                  >
                    Print Timetable 🖨️
                  </button>
                </div>

                <div className="space-y-4">
                  {Object.keys(routine).map((day) => (
                    <div key={day} className="border border-slate-200 rounded-xl overflow-hidden shadow-sm">
                      <div className="bg-slate-100 px-4 py-2 text-xs font-black uppercase text-slate-700 tracking-wider border-b border-slate-200">
                        {day}
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-4 divide-y md:divide-y-0 md:divide-x divide-slate-200">
                        {routine[day].map((p, index) => (
                          <div key={index} className="p-4 space-y-2 hover:bg-slate-50/50 transition-colors">
                            <span className="inline-block text-[9px] bg-slate-200 text-slate-600 px-2 py-0.5 rounded-full font-bold">
                              {p.time}
                            </span>
                            <div className="font-bold text-slate-800 text-sm">{p.subject}</div>
                            <div className="text-xs text-slate-500 font-medium leading-relaxed">
                              <p className="flex items-center gap-1">
                                <span>👨‍🏫</span> {p.teacher}
                              </p>
                              <p className="flex items-center gap-1 mt-0.5">
                                <span>🚪</span> <span className="text-green-700 font-bold">{p.room}</span>
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Centered Modal Overlay Popup for Student details (Fixes scrolling issue!) */}
            {selectedStudent && (
              <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 overflow-y-auto">
                <div className="bg-white rounded-3xl max-w-4xl w-full p-6 md:p-8 relative shadow-2xl border border-slate-150 animate-in fade-in zoom-in-95 duration-200 max-h-[90vh] overflow-y-auto">
                  {/* Close button at top corner */}
                  <button
                    onClick={() => setSelectedStudent(null)}
                    className="absolute top-4 right-4 text-slate-400 hover:text-slate-650 bg-slate-100 p-2.5 rounded-full transition-all focus:outline-none z-10"
                    title="Close"
                  >
                    ✕
                  </button>

                  <div className="mb-6 border-b border-slate-150 pb-4">
                    <h3 className="text-xl font-black text-slate-850">
                      Academic Student Profile & Result Sheet
                    </h3>
                    <p className="text-xs text-slate-400">
                      BTEB Semester Transcripts and Digital Identification Portal
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Mock ID Card Column */}
                    <div className="space-y-5 flex flex-col items-center">
                      {/* The ID Card Container */}
                      <div
                        id="student-id-card-print"
                        className="bg-gradient-to-tr from-[#1b5e20] to-[#144517] rounded-2xl p-6 text-white shadow-lg relative overflow-hidden border border-green-500 flex flex-col justify-between aspect-[1.586/1] w-full max-w-sm"
                      >
                        {/* Background design accents */}
                        <div className="absolute top-[-30px] right-[-30px] w-24 h-24 rounded-full bg-white/5"></div>
                        <div className="absolute bottom-[-40px] left-[-45px] w-36 h-36 rounded-full bg-white/5"></div>

                        {/* ID Header */}
                        <div className="flex items-center justify-between pb-3 border-b border-white/20">
                          <div className="flex items-center gap-2">
                            <div className="w-8 h-8 rounded-full bg-white text-green-700 flex items-center justify-center font-black text-[11px] shadow border border-green-100">
                              SPI
                            </div>
                            <div>
                              <span className="block text-[9px] font-black tracking-widest uppercase">Student Smart Card</span>
                              <span className="block text-[7px] text-green-200">Sirajganj Govt. Polytechnic</span>
                            </div>
                          </div>
                          <span className="text-[7px] bg-red-600 px-1.5 py-0.5 rounded font-black tracking-wide">STUDENT</span>
                        </div>

                        {/* ID Body */}
                        <div className="py-4 flex gap-4 items-center">
                          <div className="w-16 h-16 rounded-xl bg-white/10 border border-white/20 flex items-center justify-center text-3xl shadow-inner select-none">
                            👤
                          </div>
                          <div className="space-y-1">
                            <span className="block text-sm font-black tracking-wide leading-tight">{selectedStudent.name}</span>
                            <span className="block text-[9px] text-green-250 font-bold uppercase tracking-wider">{departmentInfo.name}</span>
                            <div className="grid grid-cols-2 gap-x-3 text-[8px] text-green-150 pt-1 font-semibold leading-relaxed">
                              <p>Roll: <span className="text-white font-extrabold">{selectedStudent.roll}</span></p>
                              <p>Reg: <span className="text-white font-extrabold">{selectedStudent.reg}</span></p>
                              <p className="col-span-2">Card No: <span className="text-white font-extrabold">{selectedStudent.idCardNo}</span></p>
                            </div>
                          </div>
                        </div>

                        {/* ID Footer */}
                        <div className="pt-2 border-t border-white/10 flex justify-between items-center text-[7px] text-green-200/90 font-medium">
                          <span>Ph: {selectedStudent.phone}</span>
                          <span>Parent Ph: {selectedStudent.parentPhone}</span>
                        </div>
                      </div>

                      {/* Download trigger */}
                      <button
                        onClick={handleDownloadIDCard}
                        className="w-full max-w-sm bg-green-700 hover:bg-green-800 text-white font-bold py-2.5 px-4 rounded-xl text-xs transition-colors flex items-center justify-center gap-1.5 shadow-md"
                      >
                        Download ID Card Print PDF ⬇
                      </button>
                    </div>

                    {/* Result Sheet & Information Column */}
                    <div className="space-y-6">
                      <div className="bg-slate-50 p-4 rounded-xl border border-slate-150 text-xs space-y-2">
                        <h4 className="font-bold text-slate-700">Student Profiles & Info</h4>
                        <div className="grid grid-cols-2 gap-2 text-slate-600 font-medium leading-relaxed">
                          <p><span className="text-slate-400">Class Shift:</span> {selectedStudent.shift.toUpperCase()} Shift</p>
                          <p><span className="text-slate-400">Registration:</span> {selectedStudent.reg}</p>
                          <p><span className="text-slate-400">Student Phone:</span> {selectedStudent.phone}</p>
                          <p><span className="text-slate-400">Academic Session:</span> {selectedStudent.session}</p>
                          <p className="col-span-2">
                            <span className="text-slate-400">Parent/Guardian Contact:</span>{" "}
                            <span className="text-red-700 font-extrabold">{selectedStudent.parentPhone}</span>
                          </p>
                        </div>
                      </div>

                      {/* Semester Result Sheet */}
                      <div className="space-y-2">
                        <h4 className="font-bold text-slate-700 text-sm flex justify-between items-center">
                          <span>Academic Grade Sheet (Sem {selectedSemester})</span>
                          <span className="text-xs bg-blue-50 text-blue-700 border border-blue-100 px-2 py-0.5 rounded font-black">
                            GPA: {selectedStudent.gpa}
                          </span>
                        </h4>

                        <div className="border border-slate-200 rounded-xl overflow-hidden shadow-inner">
                          <table className="w-full text-left text-xs">
                            <thead>
                              <tr className="bg-slate-100 border-b border-slate-200 font-bold text-slate-700">
                                <th className="py-2.5 px-4">Subject</th>
                                <th className="py-2.5 px-4 text-center">Marks</th>
                                <th className="py-2.5 px-4 text-center">Grade</th>
                                <th className="py-2.5 px-4 text-center">Point</th>
                              </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-150 text-slate-600 font-medium">
                              {selectedStudent.results.map((res, i) => (
                                <tr key={i} className="hover:bg-slate-55">
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
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DepartmentDetail;
