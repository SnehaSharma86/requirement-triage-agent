import { useState } from "react";

function RequirementForm({ onSubmit, loading }) {
  const [text, setText] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!text.trim()) {
      alert("Please enter some requirements.");
      return;
    }

    onSubmit(text);
  };

  return (
    <form
      onSubmit={handleSubmit}
      style={{
        maxWidth: "800px",
        margin: "40px auto",
        display: "flex",
        flexDirection: "column",
        gap: "20px",
      }}
    >
      <textarea
        rows={10}
        placeholder="Paste your product requirements here..."
        value={text}
        onChange={(e) => setText(e.target.value)}
        style={{
          padding: "15px",
          fontSize: "16px",
          borderRadius: "10px",
        }}
      />

      <button
        type="submit"
        disabled={loading}
        style={{
          padding: "15px",
          fontSize: "18px",
          cursor: "pointer",
        }}
      >
        {loading ? "Generating..." : "Generate PRD"}
      </button>
    </form>
  );
}

export default RequirementForm;