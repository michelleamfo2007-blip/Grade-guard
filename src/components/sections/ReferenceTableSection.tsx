import React from "react";
import { Link } from "react-router-dom";

export default function ReferenceTableSection({ isTeaser = false }: { isTeaser?: boolean }) {
  const tableData = [
    { material: "Portland Cement", grade: "32.5R", minStrength: "32.5 N/mm²", approved: "Block laying, plastering, floor screed", prohibited: "Foundation pillars, columns, lintels, slabs", badge: "Non-Structural", badgeColor: "bg-gsa-red-light text-gsa-red-dark" },
    { material: "Portland Cement", grade: "42.5N", minStrength: "42.5 N/mm²", approved: "Foundations, columns, lintels, suspended slabs", prohibited: "Thin plastering", badge: "Structural", badgeColor: "bg-gsa-green-light text-gsa-green-dark" },
    { material: "Portland Cement", grade: "52.5R", minStrength: "52.5 N/mm²", approved: "High-strength precast, structural elements", prohibited: "General masonry without engineer approval", badge: "High Strength", badgeColor: "bg-gsa-green-light text-gsa-green-dark" },
    { material: "High Yield Rod", grade: "Y10", minStrength: "500 N/mm²", approved: "Floor slabs, ring beams, light columns", prohibited: "Heavy foundations (check engineer specs)", badge: "Limited Use", badgeColor: "bg-amber-light text-amber-dark" },
    { material: "High Yield Rod", grade: "Y16+", minStrength: "500 N/mm²", approved: "Primary columns, deep foundations, heavy beams", prohibited: "Light slabs (over-specified)", badge: "Structural", badgeColor: "bg-gsa-green-light text-gsa-green-dark" },
    { material: "Sandcrete Block", grade: "6-inch Hollow", minStrength: "1.5 N/mm²", approved: "Internal partitions, fencing", prohibited: "Loadbearing external walls", badge: "Non-Loadbearing", badgeColor: "bg-gsa-red-light text-gsa-red-dark" },
    { material: "Sandcrete Block", grade: "9-inch Solid", minStrength: "2.8 N/mm²", approved: "Loadbearing external walls, ground floor walls", prohibited: "Rooftop columns without engineer approval", badge: "Loadbearing", badgeColor: "bg-gsa-green-light text-gsa-green-dark" }
  ];

  return (
    <section id="guide" className="py-16 md:py-24 bg-white border-t border-forest-100">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        
        <div className="mb-12">
          <h2 className="font-display text-3xl md:text-5xl text-forest-950 mb-4">Grade Reference Table</h2>
          <p className="text-forest-700 text-lg max-w-3xl">
            A comprehensive reference of construction material grades, minimum strength requirements, and approved applications based on Ghana Standards Authority specifications.
          </p>
        </div>

        <div className="overflow-x-auto rounded-xl border border-forest-200 shadow-sm">
          <table className="w-full text-left border-collapse min-w-[800px]">
            <thead>
              <tr className="bg-forest-950 text-white">
                <th className="p-4 font-bold tracking-wider text-sm">Material</th>
                <th className="p-4 font-bold tracking-wider text-sm">Grade</th>
                <th className="p-4 font-bold tracking-wider text-sm">Min Strength</th>
                <th className="p-4 font-bold tracking-wider text-sm">Approved Uses</th>
                <th className="p-4 font-bold tracking-wider text-sm">Prohibited Uses</th>
                <th className="p-4 font-bold tracking-wider text-sm">Rating Badge</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-forest-100 bg-white">
              {tableData.slice(0, isTeaser ? 3 : tableData.length).map((row, index) => (
                <tr key={index} className="hover:bg-off-white transition-colors">
                  <td className="p-4 font-medium text-forest-900">{row.material}</td>
                  <td className="p-4 font-bold text-forest-950 whitespace-nowrap">{row.grade}</td>
                  <td className="p-4 text-forest-700 whitespace-nowrap">{row.minStrength}</td>
                  <td className="p-4 text-gsa-green-dark text-sm">{row.approved}</td>
                  <td className="p-4 text-gsa-red-dark text-sm">{row.prohibited}</td>
                  <td className="p-4">
                    <span className={`inline-flex items-center px-2.5 py-1 rounded-md text-xs font-bold uppercase tracking-wider whitespace-nowrap ${row.badgeColor}`}>
                      {row.badge}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {isTeaser && (
          <div className="mt-8 text-center">
            <Link 
              to="/guide"
              className="inline-block bg-white border-2 border-forest-950 text-forest-950 hover:bg-forest-950 hover:text-white px-8 py-3 rounded-md font-bold transition-colors"
            >
              View Full Grade Guide &rarr;
            </Link>
          </div>
        )}

      </div>
    </section>
  );
}
