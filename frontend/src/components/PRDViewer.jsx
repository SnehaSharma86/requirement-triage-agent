import ReactMarkdown from "react-markdown";


function PRDViewer({ items= [], darkMode }) {


  const markdown = `

# Product Requirements Document


## Overview

Generated automatically from user requirements.


## Requirements


${items.map((item,index)=>`

### ${index + 1}. ${item.category.toUpperCase()}


${item.text}


**Priority Score:** ${item.rice_score}


`).join("\n")}


## Summary


Total Requirements: ${items.length}

`;


  return (

    <div
  style={{
    maxWidth:"900px",
    margin:"40px auto",
    background: darkMode ? "#1f2937" : "#ffffff",
    color:"#111827",
    padding:"35px",
    borderRadius:"16px",
    boxShadow:"0 10px 30px rgba(0,0,0,0.08)",
    lineHeight:"1.7",
    fontSize:"16px"
  }}
>

      <ReactMarkdown
  components={{

    h1: ({children}) => (
      <h1
        style={{
          color: darkMode ? "white" : "#111827",
          fontSize:"32px"
        }}
      >
        {children}
      </h1>
    ),


    h2: ({children}) => (
      <h2
        style={{
          color:"#2563eb",
          marginTop:"25px"
        }}
      >
        {children}
      </h2>
    ),


    h3: ({children}) => (
      <h3
        style={{
          color:"#374151"
        }}
      >
        {children}
      </h3>
    ),


    p: ({children}) => (
      <p
        style={{
          color:"#4b5563"
        }}
      >
        {children}
      </p>
    )

  }}
>
  {markdown}
</ReactMarkdown>
    </div>

  );

}


export default PRDViewer;