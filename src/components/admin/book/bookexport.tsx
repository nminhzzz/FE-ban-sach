import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
type TProps = {
  book?: IBook[];
};
const BookExport: React.FC<TProps> = ({ book }) => {
  const handleExportExcel = () => {
    if (!book || book.length === 0) {
      return;
    }

    // 1. Chuyển dữ liệu sang dạng sheet
    const worksheet = XLSX.utils.json_to_sheet(book);

    // 2. Tạo workbook
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Books");

    // 3. Xuất ra file Excel (array buffer)
    const excelBuffer = XLSX.write(workbook, {
      bookType: "xlsx",
      type: "array",
    });

    // 4. Tải file xuống
    const data = new Blob([excelBuffer], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8",
    });
    saveAs(data, `books_${new Date().toISOString().slice(0, 10)}.xlsx`);
  };
  return (
    <>
      <button
        onClick={handleExportExcel}
        className="px-3 py-1 bg-green-500 text-white rounded"
      >
        Export Excel
      </button>
    </>
  );
};
export default BookExport;
