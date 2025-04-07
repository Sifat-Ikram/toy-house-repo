import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import Swal from "sweetalert2";
import useOrderDetails from "../../hooks/useOrderDetails";

const ExportDetails = ({ id, user, order }) => {
  const [orderDetails] = useOrderDetails(id);
  const { name, email, phone_number, addresses } = user;

  const companyDetails = {
    name: "Toy House",
    email: "kuswarkhan2018@gmail.com",
    phone_number: "01626809609",
    address: "Toy House, Level-1, A1, 37C",
  };

  const handleExport = () => {
    if (!orderDetails?.items?.length) {
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
    doc.text("Order Invoice", 70, 20);

    // Order ID and Total Price (Order ID at top, Total Price below it)
    doc.setFontSize(14);
    doc.setFont("helvetica", "normal");
    doc.text(`Order ID: ${id}`, 14, 30);

    // Company Details aligned to the right (Horizontal layout)

    doc.setFont("helvetica", "normal");
    doc.setFontSize(11);
    doc.text(`Company Name: ${companyDetails.name}`, 130, 40);

    doc.setFont("helvetica", "normal");
    doc.setFontSize(11);
    doc.text(`Email: ${companyDetails.email}`, 130, 48);

    doc.setFont("helvetica", "normal");
    doc.setFontSize(11);
    doc.text(`Phone: ${companyDetails.phone_number}`, 130, 56);

    doc.setFont("helvetica", "normal");
    doc.setFontSize(11);
    doc.text(`Address: ${companyDetails.address}`, 130, 64);

    // User Details (Left side, below total price)

    doc.setFont("helvetica", "normal");
    doc.setFontSize(11);
    doc.text(`Customer Name: ${name || ""}`, 15, 48);

    doc.setFont("helvetica", "normal");
    doc.setFontSize(11);
    doc.text(`Email: ${email}`, 15, 40);

    doc.setFont("helvetica", "normal");
    doc.setFontSize(11);
    doc.text(`Phone: ${phone_number}`, 15, 56);

    doc.setFont("helvetica", "normal");
    doc.setFontSize(11);
    doc.text(`Address: ${addresses || "N/A"}`, 15, 64);

    // Table header and data
    const tableHead = [
      ["#", "Product Name", "SKU", "Color", "Qty", "Price", "Total"],
    ];
    const tableBody = orderDetails.items.map((order, index) => [
      index + 1, // Add index
      order.product_name,
      order.sku,
      order.color_name || "N/A",
      order.quantity,
      `${order.selling_price.toFixed(2)} BDT`,
      `${(order.selling_price * order.quantity).toFixed(2)} BDT`,
    ]);

    // Calculate total price
    const totalPrice = orderDetails.items.reduce(
      (total, order) => total + order.selling_price * order.quantity,
      0
    );

    // Apply table using autoTable
    autoTable(doc, {
      startY: 80, // Starting Y position for table
      head: tableHead,
      body: tableBody,
      theme: "striped",
      styles: { font: "helvetica", fontSize: 10, cellPadding: 4 },
      headStyles: {
        fillColor: [117, 117, 117], // bg-[#757575]
        textColor: 255,
        fontSize: 12,
        fontStyle: "normal",
      },
      columnStyles: {
        0: { cellWidth: 10 }, // Index column
        1: { cellWidth: "auto" },
        2: { cellWidth: 30 },
        3: { cellWidth: "auto" },
        4: { cellWidth: 15 },
        5: { cellWidth: 30 },
        6: { cellWidth: 30 },
      },
      alternateRowStyles: { fillColor: [245, 245, 245] },
      margin: { left: 14, right: 14 },
    });

    // Position for total price and delivery fee below the table
    const finalY = doc.lastAutoTable.finalY + 10; // Get last Y position of table and add spacing

    // Total Price
    doc.setFont("helvetica", "bold");
    doc.text("Total Price:", 14, finalY);
    doc.text(`${totalPrice.toFixed(2)} BDT`, 180, finalY, { align: "right" });

    // Delivery Fee
    const deliveryFee = order?.delivery_options == "OUTSIDE_DHAKA" ? 120 : 60;
    doc.text("Delivery Fee:", 14, finalY + 10);
    doc.text(`${deliveryFee.toFixed(2)} BDT`, 180, finalY + 10, {
      align: "right",
    });

    // Grand Total
    doc.text("Grand Total:", 14, finalY + 20);
    doc.text(`${(totalPrice + deliveryFee).toFixed(2)} BDT`, 180, finalY + 20, {
      align: "right",
    });

    // Open in a new tab with the generated PDF
    const pdfBlob = doc.output("blob");
    const pdfUrl = URL.createObjectURL(pdfBlob);
    window.open(pdfUrl, "_blank"); // Opens PDF in a new tab
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
