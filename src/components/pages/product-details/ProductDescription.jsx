const parseDescription = (description) => {
  if (!description) return null;

  // Create a temporary element to parse the HTML string
  const doc = new DOMParser().parseFromString(description, "text/html");

  // Handle lists (ordered or unordered)
  const handleList = (nodeList) => {
    return Array.from(nodeList).map((item, index) => {
      const text = item.textContent || item.innerText; // Get text content
      return <li key={index}>{text}</li>;
    });
  };

  // Handle multiple lists (ordered and unordered)
  const handleLists = (listType, listElements) => {
    return Array.from(listElements).map((list, index) => {
      return listType === "ol" ? (
        <ol key={index}>{handleList(list.children)}</ol>
      ) : (
        <ul key={index}>{handleList(list.children)}</ul>
      );
    });
  };

  // Handle text with inline elements (bold, italic, underline, etc.)
  const handleTextWithStyles = (node) => {
    if (node.nodeType === Node.TEXT_NODE) {
      return node.textContent; // Return plain text for text nodes
    }

    const tagName = node.tagName.toLowerCase();
    let content = node.textContent;

    // Apply styles based on the tag
    switch (tagName) {
      case "strong": // Bold text
        return <strong>{content}</strong>;
      case "em": // Italic text
        return <em>{content}</em>;
      case "u": // Underlined text
        return <u>{content}</u>;
      case "i": // Italic text (as an alternative to <em>)
        return <i>{content}</i>;
      default:
        return content;
    }
  };

  // Handle general HTML elements (p, h1, h2, a, etc.)
  const handleOtherElements = (nodeList) => {
    return Array.from(nodeList).map((item, index) => {
      const tagName = item.tagName.toLowerCase();
      switch (tagName) {
        case "p":
          return <p key={index}>{handleTextWithStyles(item)}</p>;
        case "h1":
          return <h1 key={index}>{handleTextWithStyles(item)}</h1>;
        case "h2":
          return <h2 key={index}>{handleTextWithStyles(item)}</h2>;
        case "h3":
          return <h3 key={index}>{handleTextWithStyles(item)}</h3>;
        case "h4":
          return <h4 key={index}>{handleTextWithStyles(item)}</h4>;
        case "h5":
          return <h5 key={index}>{handleTextWithStyles(item)}</h5>;
        case "h6":
          return <h6 key={index}>{handleTextWithStyles(item)}</h6>;
        case "a":
          return (
            <a
              key={index}
              href={item.href}
              target="_blank"
              rel="noopener noreferrer"
            >
              {handleTextWithStyles(item)}
            </a>
          );
        default:
          return <span key={index}>{handleTextWithStyles(item)}</span>;
      }
    });
  };

  // Query ordered and unordered lists
  const orderedLists = doc.querySelectorAll("ol");
  const unorderedLists = doc.querySelectorAll("ul");

  // Query other HTML elements
  const otherElements = doc.body.children;

  return (
    <>
      {orderedLists.length > 0 && handleLists("ol", orderedLists)}
      {unorderedLists.length > 0 && handleLists("ul", unorderedLists)}
      {handleOtherElements(otherElements)}
    </>
  );
};

const ProductDescription = ({ description }) => {
  return <div className="h-auto">{parseDescription(description)}</div>;
};

export default ProductDescription;
