function PRDActions({ result }) {


  const createText = () => {

    let text = "PRODUCT REQUIREMENTS DOCUMENT\n\n";


    result.items.forEach((item, index)=>{

      text += `${index + 1}. ${item.category.toUpperCase()}\n`;

      text += `${item.text}\n`;

      text += `Priority Score: ${item.rice_score}\n\n`;

    });


    return text;

  };


  const copyPRD = async () => {

    await navigator.clipboard.writeText(createText());

    alert("PRD copied!");

  };


  const downloadPRD = () => {

    const blob = new Blob(
      [createText()],
      {
        type:"text/plain"
      }
    );


    const url = URL.createObjectURL(blob);


    const link = document.createElement("a");

    link.href = url;

    link.download="PRD.txt";

    link.click();

  };


  return (

    <div
      style={{
        display:"flex",
        gap:"15px",
        justifyContent:"center",
        marginTop:"30px"
      }}
    >

      <button
        onClick={copyPRD}
        style={{
          padding:"12px 20px",
          borderRadius:"10px",
          border:"none",
          background:"#16a34a",
          color:"white",
          cursor:"pointer"
        }}
      >
        📋 Copy PRD
      </button>


      <button
        onClick={downloadPRD}
        style={{
          padding:"12px 20px",
          borderRadius:"10px",
          border:"none",
          background:"#2563eb",
          color:"white",
          cursor:"pointer"
        }}
      >
        ⬇ Download PRD
      </button>


    </div>

  );

}


export default PRDActions;