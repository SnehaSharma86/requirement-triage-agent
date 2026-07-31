import { motion } from "framer-motion";


function Features({ darkMode }) {


  const steps = [

    {
      icon:"✍️",
      title:"Enter Idea",
      text:"Describe your product idea in simple words."
    },

    {
      icon:"🤖",
      title:"AI Analysis",
      text:"AI extracts requirements and prioritizes them."
    },

    {
      icon:"📄",
      title:"Generate PRD",
      text:"Create structured product documentation."
    }

  ];


  return (

    <div
    id="overview"
      style={{
        maxWidth:"900px",
        margin:"60px auto"
      }}
    >

<h2
  style={{
    textAlign:"center",
    color: darkMode ? "white" : "#111827"
  }}
>
  Project Overview
</h2>


<p
  style={{
    textAlign:"center",
    color:"#6b7280",
    fontSize:"18px",
    lineHeight:"1.7",
    marginTop:"20px"
  }}
>
  Requirement AI is an AI-powered product management assistant
  that converts raw ideas into structured Product Requirement
  Documents. It analyzes requirements, categorizes features,
  bugs, and technical debt, and helps teams prioritize work
  using intelligent scoring.
</p>


      <div
        style={{
          display:"grid",
          gridTemplateColumns:"repeat(auto-fit,minmax(220px,1fr))",
          gap:"20px",
          marginTop:"30px"
        }}
      >


      {
        steps.map((step,index)=>(

          <motion.div

          key={index}

          initial={{
            opacity:0,
            y:20
          }}

          whileInView={{
            opacity:1,
            y:0
          }}

          transition={{
            delay:index*0.2
          }}

          style={{
            background:darkMode ? "#1f2937":"white",
            padding:"25px",
            borderRadius:"16px",
            textAlign:"center",
            boxShadow:"0 10px 20px rgba(0,0,0,0.08)"
          }}

          >

            <div
              style={{
                fontSize:"35px"
              }}
            >
              {step.icon}
            </div>


            <h3
            style={{
              color:darkMode ? "white":"#111827"
            }}
            >
              {step.title}
            </h3>


            <p
            style={{
              color:"#6b7280"
            }}
            >
              {step.text}
            </p>


          </motion.div>


        ))
      }


      </div>


      <h2
        style={{
          marginTop:"60px",
          textAlign:"center",
          color:darkMode ? "white":"#111827"
        }}
      >
        Tech Stack
      </h2>


      <div
      style={{
        textAlign:"center",
        marginTop:"20px",
        fontSize:"18px",
        color:"#6b7280"
      }}
      >

        React.js ⚛️ &nbsp;
        Node.js 🟢 &nbsp;
        FastAPI ⚡ &nbsp;
        AI 🤖

      </div>


    </div>

  );

}


export default Features;