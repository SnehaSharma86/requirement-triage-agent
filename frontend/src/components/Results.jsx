import RequirementCard from "./RequirementCard";

function Results({ items= [], darkMode }) {
  return (
    <div
      style={{
        maxWidth: "900px",
        margin: "40px auto",
      }}
    >
      <h2>Requirements</h2>

      {items?.map((item, index) => (
        <RequirementCard
          key={index}
          item={item}
           darkMode={darkMode}
        />
      ))}
    </div>
  );
}

export default Results;