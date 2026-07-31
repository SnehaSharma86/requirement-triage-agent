
import { motion } from "framer-motion";
function RequirementCard({ item, darkMode}) {

  const getCategoryStyle = () => {

    switch(item.category){

      case "bug":
        return {
          color:"#dc2626",
          background:"#fee2e2",
          icon:"🐛"
        };

      case "feature":
        return {
          color:"#16a34a",
          background:"#dcfce7",
          icon:"🚀"
        };

      case "tech_debt":
        return {
          color:"#d97706",
          background:"#fef3c7",
          icon:"⚙️"
        };

      default:
        return {
          color:"#4b5563",
          background:"#f3f4f6",
          icon:"📌"
        };
    }

  };


  const style = getCategoryStyle();


  return (

    <motion.div

initial={{
  opacity:0,
  y:20
}}

animate={{
  opacity:1,
  y:0
}}

transition={{
  duration:0.4
}}

      style={{
        background: darkMode ? "#1f2937" : "white",
        borderRadius:"16px",
        padding:"25px",
        marginBottom:"20px",
        boxShadow:"0 10px 25px rgba(0,0,0,0.08)",
        transition:"0.3s",
      }}

      onMouseEnter={(e)=>{
        e.currentTarget.style.transform="translateY(-5px)";
      }}

      onMouseLeave={(e)=>{
        e.currentTarget.style.transform="translateY(0)";
      }}

    >


      <div
        style={{
          display:"flex",
          justifyContent:"space-between",
          alignItems:"center"
        }}
      >

        <span
          style={{
            background:style.background,
            color:style.color,
            padding:"8px 14px",
            borderRadius:"20px",
            fontWeight:"600",
            fontSize:"13px"
          }}
        >
          {style.icon} {item.category.toUpperCase()}
        </span>


        <span
          style={{
            background:"#eff6ff",
            color:"#2563eb",
            padding:"8px 12px",
            borderRadius:"20px",
            fontWeight:"600"
          }}
        >
          ⭐ {item.rice_score}
        </span>


      </div>


      <h3
        style={{
          marginTop:"20px",
         color: darkMode ? "white" : "#111827",
        }}
      >
        {item.text}
      </h3>


      {
        item.needs_clarification && (

          <div
            style={{
              marginTop:"15px",
              background:"#fff7ed",
              padding:"15px",
              borderRadius:"10px",
              color:"#9a3412"
            }}
          >

            ❓ {item.clarification_question}

          </div>

        )
      }


    </motion.div>

  );

}


export default RequirementCard;