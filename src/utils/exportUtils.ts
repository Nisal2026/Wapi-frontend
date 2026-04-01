"use client";

import { toast } from "sonner";

/**
 * Export data to CSV format
 */
export const exportToCSV = (headers: string[], data: string[][], filename: string) => {
  try {
    const csvContent = [
      headers.join(","),
      ...data.map((row) => row.map((d) => `"${d}"`).join(",")),
    ].join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", `${filename}_${new Date().getTime()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    toast.success("CSV exported successfully");
  } catch (error) {
    console.error("CSV Export Error:", error);
    toast.error("Failed to export CSV");
  }
};

/**
 * Export data to Excel format (HTML table method)
 */
export const exportToExcel = (headers: string[], data: string[][], filename: string, title: string) => {
  try {
    const tableHtml = `
      <html>
        <head>
          <meta charset="UTF-8">
          <style>
            table { border-collapse: collapse; width: 100%; }
            th, td { border: 1px solid #000; padding: 8px; text-align: left; }
            th { background-color: #f2f2f2; font-weight: bold; }
          </style>
        </head>
        <body>
          <h2>${title}</h2>
          <table>
            <thead>
              <tr>${headers.map((h) => `<th>${h}</th>`).join("")}</tr>
            </thead>
            <tbody>
              ${data
                .map(
                  (row) => `
                <tr>${row.map((d) => `<td>${d}</td>`).join("")}</tr>
              `
                )
                .join("")}
            </tbody>
          </table>
        </body>
      </html>
    `;

    const blob = new Blob([tableHtml], { type: "application/vnd.ms-excel" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", `${filename}_${new Date().getTime()}.xls`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    toast.success("Excel exported successfully");
  } catch (error) {
    console.error("Excel Export Error:", error);
    toast.error("Failed to export Excel");
  }
};

/**
 * Export data to Print format
 */
export const exportToPrint = (headers: string[], data: string[][], title: string, metaDescription: string) => {
  try {
    const printWindow = window.open("", "_blank");
    if (!printWindow) {
      toast.error("Pop-up blocked. Please allow pop-ups to print.");
      return;
    }

    printWindow.document.write(`
      <html>
        <head>
          <title>${title}</title>
          <style>
            body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif; color: #333; padding: 20px; }
            h1 { color: #111; margin-bottom: 5px; }
            .meta { color: #666; font-size: 14px; margin-bottom: 25px; border-bottom: 2px solid #eee; padding-bottom: 10px; }
            table { width: 100%; border-collapse: collapse; margin-top: 10px; }
            th, td { border: 1px solid #e2e8f0; padding: 12px 10px; text-align: left; font-size: 13px; }
            th { background-color: #f8fafc; font-weight: 600; text-transform: uppercase; letter-spacing: 0.025em; color: #475569; }
            tr:nth-child(even) { background-color: #fbfcfe; }
            @media print {
              @page { margin: 1cm; }
              body { padding: 0; }
            }
          </style>
        </head>
        <body>
          <h1>${title}</h1>
          <div class="meta">${metaDescription} - Exported on ${new Date().toLocaleString()}</div>
          <table>
            <thead>
              <tr>${headers.map((h) => `<th>${h}</th>`).join("")}</tr>
            </thead>
            <tbody>
              ${data
                .map(
                  (row) => `
                <tr>${row.map((d) => `<td>${d}</td>`).join("")}</tr>
              `
                )
                .join("")}
            </tbody>
          </table>
        </body>
      </html>
    `);

    printWindow.document.close();
    printWindow.focus();
    setTimeout(() => {
      printWindow.print();
      printWindow.close();
    }, 250);
  } catch (error) {
    console.error("Print Error:", error);
    toast.error("Failed to open print window");
  }
};
