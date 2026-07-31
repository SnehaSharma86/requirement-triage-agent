
import { motion } from "framer-motion";
function Analytics({ items = [], darkMode }) {


  const total = items?.length || 0 ;


  const features = items.filter(
    item => item.category === "feature"
  ).length;


  const bugs = items.filter(
    item => item.category === "bug"
  ).length;


  const techDebt = items.filter(
    item => item.category === "tech_debt"
  ).length;


  const averageScore =
    total > 0
      ? (
          items.reduce(
            (sum, item) => sum + item.rice_score,
            0
          ) / total
        )
      : 0;



  const cards = [

    {
      title:"Total Requirements",
      value:total,
      icon:"📌"
    },

    {
      title:"Features",
      value:features,
      icon:"🚀"
    },

    {
      title:"Bugs",
      value:bugs,
      icon:"🐛"
    },

    {
      title:"Tech Debt",
      value:techDebt,
      icon:"⚙️"
    },

    {
      title:"Avg Priority",
      value:averageScore.toFixed(1),
      icon:"⭐"
    }

  ];



  return (

    <div
      style={{
        maxWidth:"900px",
        margin:"40px auto",
        display:"grid",
        gridTemplateColumns:"repeat(auto-fit,minmax(160px,1fr))",
        gap:"20px"
      }}
    >

      {
        cards.map((card,index)=>(

          <motion.div

key={index}

initial={{
 opacity:0,
 scale:0.9
}}

animate={{
 opacity:1,
 scale:1
}}

transition={{
 duration:0.3,
 delay:index*0.1
}}

style={{
             background: darkMode ? "#1f2937" : "white",
              padding:"20px",
              borderRadius:"15px",
              boxShadow:"0 8px 20px rgba(0,0,0,0.08)",
              textAlign:"center"
            }}
          >

            <div
              style={{
                fontSize:"30px"
              }}
            >
              {card.icon}
            </div>


            <h2
              style={{
                margin:"10px 0",
                color: darkMode ? "white" : "#111827",
              }}
            >
              {card.value}
            </h2>


            <p
              style={{
                color:"#6b7280"
              }}
            >
              {card.title}
            </p>


          </motion.div>

        ))
      }


    </div>

  );

}


export default Analytics;