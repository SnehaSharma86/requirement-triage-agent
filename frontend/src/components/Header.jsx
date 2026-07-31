import { motion } from "framer-motion";


function Header() {

  return (

    <motion.div

      initial={{
        opacity:0,
        y:-20
      }}

      animate={{
        opacity:1,
        y:0
      }}

      transition={{
        duration:0.5
      }}

      style={{

        textAlign:"center",
        maxWidth:"900px",
        margin:"50px auto"

      }}

    >

      <h1

        style={{
          fontSize:"42px",
          color:"#2563eb",
          marginBottom:"15px"
        }}

      >

        🚀 Requirement AI

      </h1>


      <p

        style={{

          fontSize:"20px",
          color:"#6b7280",
          lineHeight:"1.6"

        }}

      >

        Transform raw product ideas into
        structured Product Requirement Documents
        using AI-powered analysis.

      </p>



      <div

        style={{

          display:"flex",
          justifyContent:"center",
          gap:"20px",
          marginTop:"30px",
          flexWrap:"wrap"

        }}

      >

        <span>
          ⚡ AI Powered
        </span>


        <span>
          📊 Smart Prioritization
        </span>


        <span>
          📄 PRD Export
        </span>


        <span>
          🌙 Dark Mode
        </span>


      </div>


    </motion.div>

  );

}


export default Header;