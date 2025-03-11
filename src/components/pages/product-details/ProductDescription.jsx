const parseDescription = (description) => {
  if (!description) return null;

  // Create a temporary element to parse the HTML string
  const doc = new DOMParser().parseFromString(description, "text/html");

  // Handle lists and general HTML elements
  const handleList = (nodeList) => {
    return Array.from(nodeList).map((item, index) => {
      const text = item.textContent || item.innerText; // Get text content
      return <li key={index}>{text}</li>;
    });
  };

  // Check for ordered list (ol)
  const orderedList = doc.querySelectorAll("ol");
  if (orderedList.length > 0) {
    return <ol>{handleList(orderedList[0].children)}</ol>;
  }

  // Check for unordered list (ul)
  const unorderedList = doc.querySelectorAll("ul");
  if (unorderedList.length > 0) {
    return <ul>{handleList(unorderedList[0].children)}</ul>;
  }

  // For general HTML content, remove HTML tags and return as plain text
  return <span>{doc.body.textContent}</span>;
};

const ProductDescription = ({ description }) => {
  return <div className="h-auto">{parseDescription(description)}</div>;
};

export default ProductDescription;
