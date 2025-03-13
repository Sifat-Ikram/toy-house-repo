import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import Swal from "sweetalert2";
import useOrderDetails from "../../hooks/useOrderDetails";

const ExportDetails = ({ id }) => {
  const [orderDetails] = useOrderDetails(id);

  const handleExport = () => {
    if (
      !orderDetails ||
      !orderDetails.items ||
      orderDetails.items.length === 0
    ) {
      Swal.fire({
        toast: true,
        position: "top-end",
        icon: "warning",
        title: "No order details available!",
        showConfirmButton: false,
        timer: 3000,
      });
      return;
    }

    const doc = new jsPDF();

    // Set title
    doc.setFont("helvetica", "bold");
    doc.setFontSize(18);
    doc.text("Order Invoice", 14, 20);

    doc.setFontSize(12);
    doc.setFont("helvetica", "normal");
    doc.text(`Order ID: ${id}`, 14, 30);

    // Calculate total price
    const totalPrice = orderDetails.items.reduce(
      (total, order) => total + order.selling_price * order.quantity,
      0
    );

    doc.text(`Total Price: ${totalPrice} BDT`, 14, 40);

    // Table header and data
    const tableHead = [
      ["", "Product Name", "SKU", "Color", "Qty", "Price", "Total"],
    ];
    const tableBody = orderDetails.items.map((order, index) => [
      "", // Empty cell for the '#' column
      order.product_name,
      order.sku,
      order.color_name,
      order.quantity,
      `${order.selling_price} BDT`,
      `${order.total_price} BDT`,
    ]);

    // Apply table using autoTable
    autoTable(doc, {
      startY: 50,
      head: tableHead,
      body: tableBody,
      theme: "striped",
      styles: { font: "helvetica", fontSize: 10, cellPadding: 4 },
      headStyles: {
        fillColor: [117, 117, 117], // bg-[#757575]
        textColor: 255,
        fontSize: 12,
        fontStyle: "bold",
      },
      columnStyles: {
        0: { cellWidth: 5 }, // No width for the blank column
        1: { cellWidth: "auto" }, // Product Name column has a larger width
        2: { cellWidth: 25 }, // SKU column has a smaller width
        3: { cellWidth: "auto" },
        4: { cellWidth: 15 },
        5: { cellWidth: 30 },
        6: { cellWidth: 30 },
      },
      alternateRowStyles: { fillColor: [245, 245, 245] },
      margin: { left: 14, right: 14 },
      pageBreak: "auto", // Handle page breaks automatically
    });

    // Open in a new tab
    const pdfBlob = doc.output("blob");
    const pdfUrl = URL.createObjectURL(pdfBlob);
    window.open(pdfUrl, "_blank");
  };

  return (
    <div>
      <button
        onClick={handleExport}
        className="font-roboto text-[10px] sm:text-sm font-normal py-1 sm:py-[10px] md:py-[12px] lg:py-[10px] px-2 sm:px-[10px] md:px-[12px] lg:px-[15px] rounded-[5px] bg-[#999999] text-white"
      >
        Export as PDF
      </button>
    </div>
  );
};

export default ExportDetails;
