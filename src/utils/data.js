// 5 Departments at Sirajganj Govt. Polytechnic Institute
export const departments = [
  {
    id: "cst",
    name: "Computer Science & Technology (CST)",
    icon: "💻",
    description: "Software engineering, computer programming, web applications, databases, computer networks, and cybersecurity.",
    totalSeats: 100,
    duration: "4 Years",
    teachersCount: 8,
  },
  {
    id: "electrical",
    name: "Electrical Technology",
    icon: "⚡",
    description: "Power systems, electrical machines, smart grid controls, electrical installations, and circuit design.",
    totalSeats: 100,
    duration: "4 Years",
    teachersCount: 7,
  },
  {
    id: "electronics",
    name: "Electronics Technology",
    icon: "🔌",
    description: "Embedded systems design, telecommunications, robotics, microcontrollers, and electronic hardware repair.",
    totalSeats: 100,
    duration: "4 Years",
    teachersCount: 6,
  },
  {
    id: "civil",
    name: "Civil Technology",
    icon: "🏗️",
    description: "Structural design, surveying, environmental engineering, construction management, and highway engineering.",
    totalSeats: 100,
    duration: "4 Years",
    teachersCount: 9,
  },
  {
    id: "rac",
    name: "Refrigeration and Air Conditioning (RAC)",
    icon: "❄️",
    description: "Thermal engineering, HVAC system installations, heat transfer, refrigeration compressors, and maintenance.",
    totalSeats: 50,
    duration: "4 Years",
    teachersCount: 5,
  }
];

// Teachers Directory by Department (Expanded with Education and Experience)
export const departmentTeachers = {
  cst: [
    {
      id: "t-cst-1",
      name: "Engr. Md. Masud Rana",
      designation: "Head of the Department",
      email: "masud.cst@sgpi.gov.bd",
      phone: "+8801711-223344",
      shift: "Morning & Day",
      deptId: "cst",
      education: "B.Sc. in Computer Science & Engineering (RUET), M.Sc. in CSE (DU)",
      experience: "15+ Years in Technical Education Board. Former Senior Instructor at Pabna Polytechnic Institute.",
    },
    {
      id: "t-cst-2",
      name: "Sabrina Parveen",
      designation: "Instructor",
      email: "sabrina.cst@sgpi.gov.bd",
      phone: "+8801722-556677",
      shift: "Morning Shift",
      deptId: "cst",
      education: "B.Sc. in Computer Science & Engineering (KUET)",
      experience: "8 Years in Teaching. Worked as a Software Quality Assurance Engineer at LeadSoft Bangladesh.",
    },
    {
      id: "t-cst-3",
      name: "Md. Al-Amin",
      designation: "Junior Instructor",
      email: "alamin.cst@sgpi.gov.bd",
      phone: "+8801911-889900",
      shift: "Day Shift",
      deptId: "cst",
      education: "B.Sc. in CSE (MIST), Diploma in CST (SPI)",
      experience: "5 Years teaching experience. Specializes in Web Applications Development and Linux Systems.",
    },
    {
      id: "t-cst-4",
      name: "Engr. Tasnim Jahan",
      designation: "Junior Instructor",
      email: "tasnim.cst@sgpi.gov.bd",
      phone: "+8801552-112233",
      shift: "Morning Shift",
      deptId: "cst",
      education: "B.Sc. in Computer Science & Engineering (SUST)",
      experience: "3 Years in Academic Instruction. Specializes in Database Systems and Java Programming.",
    }
  ],
  electrical: [
    {
      id: "t-ee-1",
      name: "Engr. Md. Ashraful Islam",
      designation: "Head of the Department",
      email: "ashraful.ee@sgpi.gov.bd",
      phone: "+8801712-998877",
      shift: "Morning & Day",
      deptId: "electrical",
      education: "B.Sc. in Electrical & Electronic Engineering (RUET)",
      experience: "14 Years in Electrical Power grids. Worked as an Assistant Engineer at West Zone Power Distribution Company.",
    },
    {
      id: "t-ee-2",
      name: "Md. Mizanur Rahman",
      designation: "Instructor",
      email: "mizan.ee@sgpi.gov.bd",
      phone: "+8801733-445566",
      shift: "Morning Shift",
      deptId: "electrical",
      education: "B.Sc. in EEE (DUET), Diploma in Electrical (PST)",
      experience: "9 Years of Academic Teaching. Certified Energy Auditor (SREDA).",
    },
    {
      id: "t-ee-3",
      name: "Sonia Akter",
      designation: "Junior Instructor",
      email: "sonia.ee@sgpi.gov.bd",
      phone: "+8801678-112244",
      shift: "Day Shift",
      deptId: "electrical",
      education: "B.Sc. in Electrical & Electronic Engineering (IUT)",
      experience: "4 Years teaching experience. Specializes in Electrical Machines & Control Engineering.",
    }
  ],
  electronics: [
    {
      id: "t-ent-1",
      name: "Engr. Abu Bakar Siddique",
      designation: "Head of the Department",
      email: "abubakar.ent@sgpi.gov.bd",
      phone: "+8801715-667788",
      shift: "Morning & Day",
      deptId: "electronics",
      education: "B.Sc. in Electronics & Communication Engineering (KUET)",
      experience: "12 Years in Embedded Electronics and Telecommunication design labs. Former Lecturer at private Engineering College.",
    },
    {
      id: "t-ent-2",
      name: "MST. Runa Laila",
      designation: "Instructor",
      email: "runa.ent@sgpi.gov.bd",
      phone: "+8801744-990011",
      shift: "Morning Shift",
      deptId: "electronics",
      education: "B.Sc. in ETE (RUET)",
      experience: "8 Years teaching experience. Worked as a Junior RF Planner at Grameenphone Ltd.",
    },
    {
      id: "t-ent-3",
      name: "Md. Shafiul Islam",
      designation: "Junior Instructor",
      email: "shafiul.ent@sgpi.gov.bd",
      phone: "+8801922-334455",
      shift: "Day Shift",
      deptId: "electronics",
      education: "B.Sc. in Applied Physics & Electronics (RU)",
      experience: "6 Years teaching experience. Specializes in Microprocessor Architecture and Arduino Labs.",
    }
  ],
  civil: [
    {
      id: "t-civ-1",
      name: "Engr. Md. Kamrul Hasan",
      designation: "Head of the Department",
      email: "kamrul.civil@sgpi.gov.bd",
      phone: "+8801718-445566",
      shift: "Morning & Day",
      deptId: "civil",
      education: "B.Sc. in Civil Engineering (BUET), M.Sc. in Structural Engineering (BUET)",
      experience: "16+ Years in Structural Consulting & Academic Teaching. Supervised 30+ regional infrastructure inspections.",
    },
    {
      id: "t-civ-2",
      name: "Md. Jahangir Alam",
      designation: "Instructor",
      email: "jahangir.civil@sgpi.gov.bd",
      phone: "+8801719-778899",
      shift: "Morning Shift",
      deptId: "civil",
      education: "B.Sc. in Civil Engineering (DUET)",
      experience: "10 Years in Surveying and Highway projects. Worked as Sub-Assistant Engineer at LGED.",
    },
    {
      id: "t-civ-3",
      name: "Tania Sultana",
      designation: "Junior Instructor",
      email: "tania.civil@sgpi.gov.bd",
      phone: "+8801511-223344",
      shift: "Day Shift",
      deptId: "civil",
      education: "B.Sc. in Civil Engineering (RUET)",
      experience: "5 Years teaching experience. Specializes in Environmental Engineering and Concrete Labs.",
    }
  ],
  rac: [
    {
      id: "t-rac-1",
      name: "Engr. Md. Rezaul Karim",
      designation: "Head of the Department",
      email: "rezaul.rac@sgpi.gov.bd",
      phone: "+8801714-332211",
      shift: "Morning & Day",
      deptId: "rac",
      education: "B.Sc. in Mechanical Engineering (RUET)",
      experience: "13 Years in Thermal & HVAC engineering design. Worked as HVAC consultant for corporate structures.",
    },
    {
      id: "t-rac-2",
      name: "Md. Mostafizur Rahman",
      designation: "Junior Instructor",
      email: "mostafiz.rac@sgpi.gov.bd",
      phone: "+8801755-443322",
      shift: "Morning Shift",
      deptId: "rac",
      education: "B.Sc. in IPE (KUET), Diploma in Mechanical (RPI)",
      experience: "7 Years in industrial refrigeration workshops. Certified HVAC technician supervisor.",
    }
  ]
};

// Global teachers lookup helper
export const getAllTeachers = () => {
  const list = [];
  Object.keys(departmentTeachers).forEach((deptKey) => {
    list.push(...departmentTeachers[deptKey]);
  });
  return list;
};

// Semester Subjects list for Result generation
const semesterSubjects = {
  1: ["Mathematics-I", "Chemistry", "English-I", "Computer Application", "Engineering Drawing"],
  2: ["Mathematics-II", "Physics-I", "Basic Electronics", "English-II", "Workshop Practice"],
  3: ["Mathematics-III", "Physics-II", "Social Science", "Electrical Technology", "Programming Language"],
  4: ["Data Structure", "Digital Electronics", "Business Communication", "Object Oriented Programming"],
  5: ["Database Management System", "Microprocessor & Interfacing", "Operating System", "Theory of Computation"],
  6: ["Software Engineering", "Computer Peripherals", "Web Technology", "Data Communication & Networking"],
  7: ["System Analysis & Design", "Artificial Intelligence", "Cyber Security", "E-commerce & Web Programming"],
  8: ["Industrial Attachment & Viva-Voce", "Project & Seminar", "Entrepreneurship"]
};

// Simple helper to calculate Letter Grade & Grade Point from Marks
const getGrade = (marks) => {
  if (marks >= 80) return { letter: "A+", gp: 4.0 };
  if (marks >= 75) return { letter: "A", gp: 3.75 };
  if (marks >= 70) return { letter: "A-", gp: 3.5 };
  if (marks >= 65) return { letter: "B+", gp: 3.25 };
  if (marks >= 60) return { letter: "B", gp: 3.0 };
  if (marks >= 55) return { letter: "B-", gp: 2.75 };
  if (marks >= 50) return { letter: "C+", gp: 2.50 };
  if (marks >= 40) return { letter: "D", gp: 2.0 };
  return { letter: "F", gp: 0.0 };
};

// Student names database to generate realistic profiles
const studentFirstNames = [
  "Abir", "Sadia", "Rifat", "Tahsin", "Tanvir", "Siam", "Nabil", "Maria", "Afsana", "Jamil",
  "Imtiaz", "Fahim", "Farhan", "Rashed", "Mehedi", "Faria", "Arif", "Asif", "Mim", "Soniya",
  "Shaharia", "Shakil", "Zishan", "Nisha", "Roni", "Kawsar", "Nusrat", "Liza", "Joy", "Anik"
];
const studentLastNames = [
  "Rahman", "Islam", "Hasan", "Ahmed", "Khan", "Alom", "Hossain", "Chowdhury", "Akter", "Sultana",
  "Talukder", "Miah", "Sarder", "Bhuiyan", "Uddin", "Munshi", "Sheikh", "Pramanik", "Khatun", "Ali",
  "Sarkar", "Kundu", "Das", "Roy", "Dev", "Paul", "Talukdar", "Bose", "Gupta", "Karim"
];

// Seeded random number generator so that student details persist between renders
function createRandom(seed) {
  let value = seed;
  return function () {
    value = (value * 16807) % 2147483647;
    return (value - 1) / 2147483646;
  };
}

// Generate the students directory programmatically (Morning and Day shift, Semesters 1 to 8)
export const getStudents = (deptId, shift, semester) => {
  const cohortKeyStr = `${deptId}-${shift}-${semester}`;
  let seed = 0;
  for (let i = 0; i < cohortKeyStr.length; i++) {
    seed += cohortKeyStr.charCodeAt(i) * (i + 1);
  }
  const random = createRandom(seed);

  const studentsList = [];
  const totalStudentsInCohort = 25; // Generated student count per cohort to 25

  const subjects = semesterSubjects[semester] || ["Subject A", "Subject B", "Subject C"];

  for (let s = 1; s <= totalStudentsInCohort; s++) {
    const fIdx = Math.floor(random() * studentFirstNames.length);
    const lIdx = Math.floor(random() * studentLastNames.length);
    const firstName = studentFirstNames[fIdx];
    const lastName = studentLastNames[lIdx];
    const name = `${firstName} ${lastName}`;

    // Roll structure: 500000 + department code number + semester number + student serial
    const deptOffset = deptId === "cst" ? 10000 : deptId === "electrical" ? 20000 : deptId === "electronics" ? 30000 : deptId === "civil" ? 40000 : 50000;
    const roll = 500000 + deptOffset + (semester * 10) + s;
    const reg = 1502000000 + deptOffset + (semester * 10) + s;
    const idCardNo = `SPI-${deptId.toUpperCase()}-${roll}`;

    // Generate phone numbers
    const parentPhone = `+88017${Math.floor(10000000 + random() * 89999999)}`;
    const studentPhone = `+88019${Math.floor(10000000 + random() * 89999999)}`;

    // Generate session (e.g., 2024-25, 2025-26 based on semester)
    // Semesters 1-4 are usually the newer sessions, 5-8 are older sessions
    const session = semester <= 4 ? "2025-26" : "2024-25";

    // Generate subject marks
    let totalPoints = 0;
    const subjectResults = subjects.map((subName) => {
      const marks = 50 + Math.floor(random() * 48); // range 50 - 98
      const grade = getGrade(marks);
      totalPoints += grade.gp;
      return {
        subjectName: subName,
        marks,
        letterGrade: grade.letter,
        gradePoint: grade.gp,
      };
    });

    const gpa = (totalPoints / subjects.length).toFixed(2);

    studentsList.push({
      id: `${deptId}-${shift}-${semester}-${s}`,
      name,
      roll,
      reg,
      idCardNo,
      phone: studentPhone,
      parentPhone,
      gpa,
      results: subjectResults,
      deptId,
      shift,
      semester,
      session, // Added session details
    });
  }

  return studentsList;
};

// Global Result Finder by Roll Number
export const findStudentByRoll = (rollNumber) => {
  const roll = parseInt(rollNumber, 10);
  if (isNaN(roll)) return null;

  // Search across all 5 departments, 2 shifts, and 8 semesters
  for (const dept of departments) {
    for (const shift of ["morning", "day"]) {
      for (let sem = 1; sem <= 8; sem++) {
        const list = getStudents(dept.id, shift, sem);
        const match = list.find((student) => student.roll === roll);
        if (match) {
          return match;
        }
      }
    }
  }
  return null;
};

// Dynamic Class Routine Generator by Department, Shift and Semester
export const getClassRoutine = (deptId, shift, semester) => {
  const routineKeyStr = `${deptId}-${shift}-${semester}-routine`;
  let seed = 0;
  for (let i = 0; i < routineKeyStr.length; i++) {
    seed += routineKeyStr.charCodeAt(i) * (i + 2);
  }
  const random = createRandom(seed);

  const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday"];
  const subjects = semesterSubjects[semester] || ["Subject A", "Subject B", "Subject C"];
  const teachers = departmentTeachers[deptId] || [
    { name: "Teacher A", designation: "Instructor" },
    { name: "Teacher B", designation: "Junior Instructor" }
  ];

  // Define period timings based on Shift
  const periodTimings = shift.toLowerCase() === "morning" 
    ? [
        { time: "08:30 AM - 09:30 AM", label: "Period 1" },
        { time: "09:30 AM - 10:30 AM", label: "Period 2" },
        { time: "10:30 AM - 11:30 AM", label: "Period 3" },
        { time: "11:30 AM - 12:30 PM", label: "Period 4" }
      ]
    : [
        { time: "01:30 PM - 02:30 PM", label: "Period 1" },
        { time: "02:30 PM - 03:30 PM", label: "Period 2" },
        { time: "03:30 PM - 04:30 PM", label: "Period 3" },
        { time: "04:30 PM - 05:30 PM", label: "Period 4" }
      ];

  const routine = {};

  days.forEach((day) => {
    routine[day] = periodTimings.map((p, idx) => {
      // Pick subject randomly
      const subIdx = Math.floor(random() * subjects.length);
      const subject = subjects[subIdx];

      // Pick teacher randomly
      const tIdx = Math.floor(random() * teachers.length);
      const teacher = teachers[tIdx].name;

      // Class Room number
      const baseRoom = deptId === "cst" ? 200 : deptId === "electrical" ? 300 : deptId === "electronics" ? 400 : deptId === "civil" ? 500 : 600;
      const room = baseRoom + (semester * 10) + (idx + 1);

      return {
        time: p.time,
        period: p.label,
        subject,
        teacher,
        room: `Room ${room}`
      };
    });
  });

  return routine;
};

// Events Section data
export const events = [
  {
    id: 1,
    date: "15 Jul 2026",
    name: "Annual Sports Competition & Prize Distribution",
    time: "09:00 AM",
    status: "Upcoming",
  },
  {
    id: 2,
    date: "08 Jul 2026",
    name: "Skill Competition & Project Presentation Expo 2026",
    time: "10:00 AM",
    status: "Registration Open",
  },
  {
    id: 3,
    date: "22 Jun 2026",
    name: "Seminar on Next-Gen Career in IT & Robotics Industry",
    time: "02:00 PM",
    status: "Completed",
  },
  {
    id: 4,
    date: "18 Jun 2026",
    name: "Science & Engineering Innovative Exhibition Program",
    time: "11:00 AM",
    status: "Completed",
  }
];

// Helpline hotlines
export const hotlines = [
  {
    number: "999",
    name: "National Emergency",
    color: "from-red-500 to-red-600",
    text: "৯৯৯",
    desc: "জাতীয় জরুরী সেবা"
  },
  {
    number: "333",
    name: "National Info & Service",
    color: "from-blue-500 to-indigo-600",
    text: "৩৩৩",
    desc: "তথ্য ও সেবা"
  },
  {
    number: "109",
    name: "Women & Child Violence",
    color: "from-pink-500 to-rose-600",
    text: "১০৯",
    desc: "নারী ও শিশু নির্যাতন"
  },
  {
    number: "106",
    name: "Anti Corruption Commission",
    color: "from-yellow-500 to-amber-600",
    text: "১০৬",
    desc: "দুর্নীতি দমন কমিশন"
  },
  {
    number: "1098",
    name: "Child Helpline",
    color: "from-green-500 to-emerald-600",
    text: "১০৯৮",
    desc: "শিশু সহায়ক"
  },
  {
    number: "16122",
    name: "Land Service Hotline",
    color: "from-teal-500 to-cyan-600",
    text: "১৬১২২",
    desc: "ভূমি সেবা"
  },
  {
    number: "16263",
    name: "Health Service Window",
    color: "from-purple-500 to-violet-600",
    text: "১৬২৬৩",
    desc: "স্বাস্থ্য বাতায়ন"
  },
  {
    number: "10941",
    name: "Disaster Warning Service",
    color: "from-orange-500 to-orange-600",
    text: "১০৯৪১",
    desc: "দুর্যোগ পূর্ব সতর্কতা"
  }
];

export const curriculumCards = [
  {
    title: "Diploma in Engineering",
    icon: "🎓",
    desc: "Explore 4-year engineering paths designed with practical hands-on labs and semester structures.",
    points: ["4 Years Duration", "8 Semesters", "Industrial Attachment"]
  },
  {
    title: "Admission Criteria",
    icon: "📝",
    desc: "Find eligibility, online application process, selection quotas, and fee payment details.",
    points: ["SSC Passed Minimum GPA 3.00", "Online Form Fill-up", "Documents Checklist"]
  },
  {
    title: "Academic Calendar",
    icon: "📅",
    desc: "Stay updated with class schedules, mid-term dates, study tours, and semester board exams.",
    points: ["Semester Start Dates", "Exam Schedules", "Institute Holidays"]
  }
];

export const otherInfo = [
  {
    title: "The Institute",
    icon: "🏫",
    items: [
      "History of SGPI",
      "Mission and Vision",
      "Message from Principal",
      "Infrastructure & Campus View"
    ]
  },
  {
    title: "Admission Info",
    icon: "🏛️",
    items: [
      "Syllabus & Curriculum Details",
      "Seat Capacity per Tech Shift",
      "Fee Structures & Scholarships",
      "Apply Online Portal Link"
    ]
  },
  {
    title: "Student Corner",
    icon: "🧑‍🎓",
    items: [
      "Daily Class Routine (Shift-1 & Shift-2)",
      "Semester Exam Routine & Room Plan",
      "BTEB Board Exam Results",
      "Academic Transcript Request Form"
    ]
  },
  {
    title: "Citizen Charter",
    icon: "🤝",
    items: [
      "Citizen Charter Policy Document",
      "Service Providers List & Desk No.",
      "Service Delivery Timeline Guarantees",
      "Grievance Redress System (GRS)"
    ]
  },
  {
    title: "APA & Performance",
    icon: "📊",
    items: [
      "Annual Performance Agreement (APA)",
      "APA Committee members details",
      "Quarterly & Annual Reports upload",
      "Target evaluations & achievements"
    ]
  },
  {
    title: "Co-curricular Activities",
    icon: "🏆",
    items: [
      "Rover Scout & BNCC Wing Unit",
      "Annual Sports & Athletics Clubs",
      "Cultural & Debate Society Events",
      "Technical Robotics & Innovation Club"
    ]
  }
];

// List of notices
export const notices = [
  {
    id: 1,
    date: "30 Jun 2026",
    title: "Bi-cycle parking direction/rules related to Science Laboratory room area for session 2025-26",
    pdfUrl: "#",
  },
  {
    id: 2,
    date: "25 Jun 2026",
    title: "Form fill-up notice for Diploma in Engineering 2nd, 4th, 6th, and 8th semester board exam",
    pdfUrl: "#",
  },
  {
    id: 3,
    date: "20 Jun 2026",
    title: "Replacement Class Scheduling announcement for July 2026 semesters due to holidays",
    pdfUrl: "#",
  },
  {
    id: 4,
    date: "15 Jun 2026",
    title: "Notice regarding student digital smart ID card collection and distribution schedule",
    pdfUrl: "#",
  },
  {
    id: 5,
    date: "10 Jun 2026",
    title: "Special classes schedule for 1st semester mid-term exams preparation guide",
    pdfUrl: "#",
  },
  {
    id: 6,
    date: "05 Jun 2026",
    title: "Academic calendar for July-December 2026 session distribution notice",
    pdfUrl: "#",
  }
];
export const allStudentRolls = (() => {
  const rolls = [];
  // Gather sample rolls to display or search
  for (const dept of departments) {
    const list = getStudents(dept.id, "morning", 1);
    rolls.push(...list.slice(0, 3).map(s => ({ roll: s.roll, name: s.name, dept: dept.name })));
  }
  return rolls;
})();
