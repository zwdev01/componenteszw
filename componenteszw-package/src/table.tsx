import React, { useState, useMemo, useEffect, useRef } from "react";
import * as LucideIcons from "lucide-react";

type RowAction = {
  descripcion: string;
  icon?: string;
  route?: string;
  actionType?: string;
  actionMessage?: string;
  actionModalTitle?: string;
  isActive?: boolean;
  onClick?: (row: DataRow) => void;
};

type Column = {
  key: string;
  label: string;
  render?: (value: any, row: DataRow) => React.ReactNode;
};

type DataRow = {
  [key: string]: any;
  actions?: RowAction[];
};

type TableProps = {
  columns: Column[];
  data: DataRow[];
  itemsPerPage?: number;
  title?: string;
  className?: string;
  onActionClick?: (action: RowAction, row: DataRow) => void;
};

// Helper para renderizar el ícono dinámicamente desde el nombre
const renderIcon = (iconName?: string) => {
  if (!iconName) return null;
  const IconComponent = (LucideIcons as any)[iconName];
  if (!IconComponent) return null;
  return <IconComponent className="w-4 h-4 shrink-0" />;
};

export function Table({
  columns,
  data,
  itemsPerPage = 5,
  title,
  className = "",
  onActionClick,
}: TableProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const [filters, setFilters] = useState<Record<string, string>>({});
  const [openMenuRow, setOpenMenuRow] = useState<number | null>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  const handleFilterChange = (key: string, value: string) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
    setCurrentPage(1);
  };

  // Cerrar menú al hacer click afuera
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setOpenMenuRow(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const filteredData = useMemo(() => {
    return data.filter((row) =>
      columns.every((col) => {
        const filterValue = filters[col.key]?.toLowerCase() || "";
        if (!filterValue) return true;
        return String(row[col.key]).toLowerCase().includes(filterValue);
      })
    );
  }, [data, filters, columns]);

  const totalPages = Math.max(1, Math.ceil(filteredData.length / itemsPerPage));
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentData = filteredData.slice(startIndex, startIndex + itemsPerPage);

  const goToPage = (page: number) => {
    if (page >= 1 && page <= totalPages) setCurrentPage(page);
  };

  const handleActionClick = (action: RowAction, row: DataRow) => {
    setOpenMenuRow(null);
    if (action.onClick) {
      action.onClick(row);
    } else if (onActionClick) {
      onActionClick(action, row);
    }
  };

  return (
    <div className={`w-full p-4 ${className}`}>
      <div className="border rounded-2xl shadow">
        <div className="overflow-x-auto rounded-2xl">
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

              <tr className="border-t border-gray-200">
                {columns.map((col) => (
                  <th key={col.key} className="p-2">
                    <input
                      type="text"
                      placeholder=""
                      value={filters[col.key] || ""}
                      onChange={(e) => handleFilterChange(col.key, e.target.value)}
                      className="w-full px-2 py-1 border rounded-full text-sm focus:outline-none focus:ring-0 focus:border-transparent"
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
                currentData.map((row, i) => {
                  const rowIndex = startIndex + i;
                  const hasActions = Array.isArray(row.actions) && row.actions.length > 0;

                  return (
                    <tr
                      key={row.id ?? i}
                      className="border-t hover:bg-gray-50 transition"
                    >
                      {columns.map((col) => (
                        <td key={col.key} className="p-3 text-sm">
                          {col.render ? col.render(row[col.key], row) : row[col.key]}
                        </td>
                      ))}
                      <td className="p-3 text-right relative">
                        {hasActions && (
                          <>
                            <button
                              type="button"
                              onClick={() =>
                                setOpenMenuRow(openMenuRow === rowIndex ? null : rowIndex)
                              }
                              className="px-2 py-1 rounded hover:bg-gray-200 transition cursor-pointer"
                              aria-label="Acciones"
                            >
                              •••
                            </button>

                            {openMenuRow === rowIndex && (
                              <div
                                ref={menuRef}
                                className="absolute right-3 top-full mt-1 z-50 min-w-[160px] bg-white border border-gray-200 rounded-lg shadow-lg py-1"
                              >
                                {row.actions!
                                  .filter((a) => a.isActive !== false)
                                  .map((action, idx) => (
                                    <button
                                      key={idx}
                                      type="button"
                                      onClick={() => handleActionClick(action, row)}
                                      className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition cursor-pointer flex items-center gap-2"
                                    >
                                      {renderIcon(action.icon)}
                                      <span>{action.descripcion}</span>
                                    </button>
                                  ))}
                              </div>
                            )}
                          </>
                        )}
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>

        <div className="flex items-center justify-between p-3 text-sm border-t border-gray-200">
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
                  currentPage === i + 1 ? "bg-red-500 text-white" : "border"
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