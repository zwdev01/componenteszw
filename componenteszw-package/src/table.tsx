import React, { useState, useMemo } from "react";

type Column = {
  key: string;
  label: string;
};

type DataRow = {
  [key: string]: any;
};

type TableProps = {
  columns: Column[];
  data: DataRow[];
  itemsPerPage?: number;
  title?: string;
  className?: string;
};

export function Table({
  columns,
  data,
  itemsPerPage = 5,
  title,
  className = "",
}: TableProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const [filters, setFilters] = useState<Record<string, string>>({});

  const handleFilterChange = (key: string, value: string) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
    setCurrentPage(1);
  };

  const filteredData = useMemo(() => {
    return data.filter((row) =>
      columns.every((col) => {
        const filterValue = filters[col.key]?.toLowerCase() || "";
        if (!filterValue) return true;
        return String(row[col.key])
          .toLowerCase()
          .includes(filterValue);
      })
    );
  }, [data, filters, columns]);

  const totalPages = Math.max(
    1,
    Math.ceil(filteredData.length / itemsPerPage)
  );

  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentData = filteredData.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  const goToPage = (page: number) => {
    if (page >= 1 && page <= totalPages) setCurrentPage(page);
  };

  return (
    <div className={`w-full p-4 ${className}`}>
      <div className="border rounded-2xl overflow-hidden shadow">
        <table className="w-full border-collapse">
          <thead className="bg-gray-100">

            {title && (
              <tr>
                <th
                  colSpan={columns.length + 1}
                  className="text-left p-4 text-lg font-semibold bg-white border-b"
                >
                  {title}
                </th>
              </tr>
            )}

            <tr>
              {columns.map((col) => (
                <th
                  key={col.key}
                  className="text-left p-3 text-sm font-semibold text-gray-600"
                >
                  {col.label}
                </th>
              ))}
              <th className="p-3" />
            </tr>

            <tr>
              {columns.map((col) => (
                <th key={col.key} className="p-2">
                  <input
                    type="text"
                    placeholder="Buscar..."
                    value={filters[col.key] || ""}
                    onChange={(e) =>
                      handleFilterChange(col.key, e.target.value)
                    }
                    className="w-full px-2 py-1 border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-red-400"
                  />
                </th>
              ))}
              <th />
            </tr>
          </thead>

          <tbody>
            {currentData.length === 0 ? (
              <tr>
                <td
                  colSpan={columns.length + 1}
                  className="p-4 text-center text-sm text-gray-500"
                >
                  No hay resultados
                </td>
              </tr>
            ) : (
              currentData.map((row, i) => (
                <tr
                  key={row.id ?? i}
                  className="border-t hover:bg-gray-50 transition"
                >
                  {columns.map((col) => (
                    <td key={col.key} className="p-3 text-sm">
                      {row[col.key]}
                    </td>
                  ))}

                  <td className="p-3 text-right">•••</td>
                </tr>
              ))
            )}
          </tbody>
        </table>

        <div className="flex items-center justify-between p-3 text-sm">
          <span>
            Mostrando {currentData.length} de {filteredData.length} resultados
          </span>

          <div className="flex gap-2 items-center">
            <button
              onClick={() => goToPage(currentPage - 1)}
              className="px-2 py-1 border rounded disabled:opacity-50"
              disabled={currentPage === 1}
            >
              {"<"}
            </button>

            {Array.from({ length: totalPages }).map((_, i) => (
              <button
                key={i}
                onClick={() => goToPage(i + 1)}
                className={`px-3 py-1 rounded ${
                  currentPage === i + 1
                    ? "bg-red-500 text-white"
                    : "border"
                }`}
              >
                {i + 1}
              </button>
            ))}

            <button
              onClick={() => goToPage(currentPage + 1)}
              className="px-2 py-1 border rounded disabled:opacity-50"
              disabled={currentPage === totalPages}
            >
              {">"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
