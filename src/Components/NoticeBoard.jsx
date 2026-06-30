import React, { useState } from "react";
import { notices } from "../utils/data";

const NoticeBoard = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredNotices = notices.filter((notice) =>
    notice.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <section id="notices" className="py-12 bg-slate-50/50">
      <div className="max-w-7xl mx-auto px-4">
        {/* Notice Board Main Card */}
        <div className="bg-white rounded-xl shadow-md border border-slate-200 overflow-hidden">
          {/* Header Banner */}
          <div className="bg-[#673ab7] text-white px-6 py-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="flex items-center gap-2">
              <span className="text-2xl">📋</span>
              <div>
                <h2 className="text-xl font-bold tracking-wide m-0 text-white">
                  Notice Board
                </h2>
                <p className="text-xs text-purple-200">
                  Stay updated with latest announcements & activities
                </p>
              </div>
            </div>
            <a
              href="#archive"
              className="text-sm font-semibold bg-white/20 hover:bg-white/30 text-white px-4 py-1.5 rounded transition-all text-center self-start sm:self-auto"
            >
              View All Notices
            </a>
          </div>

          {/* Filtering bar */}
          <div className="p-4 bg-slate-50 border-b border-slate-200 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="text-sm font-semibold text-slate-700">
              Recent Notices ({filteredNotices.length})
            </div>
            <div className="relative w-full md:w-80">
              <input
                type="text"
                placeholder="Filter notices by keyword..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-4 py-2 text-sm bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400 pl-10"
              />
              <svg
                className="absolute left-3 top-2.5 h-4.5 w-4.5 text-slate-400"
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
            </div>
          </div>

          {/* Notices List Table */}
          <div className="overflow-x-auto">
            {filteredNotices.length > 0 ? (
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-100/80 border-b border-slate-200 text-slate-700 text-sm font-semibold">
                    <th className="py-3 px-6 w-24">Date</th>
                    <th className="py-3 px-6">Notice Heading</th>
                    <th className="py-3 px-6 w-24 text-center">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-slate-600 text-sm">
                  {filteredNotices.map((notice) => (
                    <tr
                      key={notice.id}
                      className="hover:bg-slate-50/60 transition-colors group"
                    >
                      <td className="py-4.5 px-6 font-medium whitespace-nowrap text-slate-500">
                        {notice.date}
                      </td>
                      <td className="py-4.5 px-6 font-medium text-slate-800 group-hover:text-purple-700 transition-colors">
                        {notice.title}
                      </td>
                      <td className="py-4.5 px-6 text-center">
                        <a
                          href={notice.pdfUrl}
                          className="inline-flex items-center justify-center p-2 rounded-lg bg-red-50 hover:bg-red-100 text-red-600 hover:text-red-700 transition-all shadow-sm border border-red-200"
                          title="Download PDF"
                          onClick={(e) => {
                            e.preventDefault();
                            alert(`Downloading file: ${notice.title}.pdf`);
                          }}
                        >
                          <svg
                            className="w-5 h-5"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                            ></path>
                          </svg>
                        </a>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <div className="py-12 text-center text-slate-500">
                <span className="text-4xl block mb-2">🔍</span>
                No matching notices found. Try checking other search terms.
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default NoticeBoard;
