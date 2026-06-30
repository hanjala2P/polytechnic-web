import React from "react";
import { Link } from "react-router";
import { departments } from "../utils/data";

const DepartmentGrid = () => {
  return (
    <section id="departments" className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        {/* Section Header */}
        <div className="flex items-center justify-between border-b border-slate-200 pb-4 mb-10">
          <div>
            <h2 className="text-2xl md:text-3xl font-extrabold text-slate-800 tracking-tight">
              Academic Departments
            </h2>
            <p className="text-slate-500 text-sm mt-1">
              Select a department below to view teachers directory, shifts, semesters, and student result boards.
            </p>
          </div>
        </div>

        {/* Departments Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {departments.map((dept) => (
            <Link
              key={dept.id}
              to={`/department/${dept.id}`}
              className="group border border-slate-200 hover:border-green-600 bg-slate-50/50 hover:bg-white rounded-xl p-6 transition-all duration-300 shadow-sm hover:shadow-lg flex flex-col justify-between"
            >
              <div>
                <div className="w-14 h-14 bg-green-50 rounded-lg flex items-center justify-center text-3xl mb-5 group-hover:scale-110 transition-transform shadow-inner">
                  {dept.icon}
                </div>
                <h3 className="text-lg font-bold text-slate-800 group-hover:text-green-700 transition-colors mb-2">
                  {dept.name}
                </h3>
                <p className="text-sm text-slate-500 line-clamp-3 leading-relaxed">
                  {dept.description}
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-slate-400 group-hover:text-green-700 transition-colors">
                <span>Seats: {dept.totalSeats} (Per shift)</span>
                <span>{dept.duration}</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default DepartmentGrid;
