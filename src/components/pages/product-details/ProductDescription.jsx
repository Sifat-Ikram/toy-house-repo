const parseDescription = (description) => {
  if (!description) return null;
  // Check if description contains list
  if (description?.includes("<ol>")) {
    // If it's an ordered list, use <ol> and <li> tags
    return (
      <ol>
        {description
          .split('<li data-list="ordered">')
          .filter((item) => item.includes("</li>"))
          .map((item, index) => {
            const text = item.replace(/<\/?[^>]+(>|$)/g, ""); // Remove HTML tags
            return <li key={index}>{text}</li>;
          })}
      </ol>
    );
  } else if (description.includes("<ul>")) {
    // If it's an unordered list, use <ul> and <li> tags
    return (
      <ul>
        {description
          .split('<li data-list="unordered">')
          .filter((item) => item.includes("</li>"))
          .map((item, index) => {
            const text = item.replace(/<\/?[^>]+(>|$)/g, ""); // Remove HTML tags
            return <li key={index}>{text}</li>;
          })}
      </ul>
    );
  } else {
    // If it's just text, return it as plain text
    return description.replace(/<\/?[^>]+(>|$)/g, ""); // Remove HTML tags
  }
};

const ProductDescription = ({ description }) => {
  return <div className="h-auto">{parseDescription(description)}</div>;
};

export default ProductDescription;
