function Navbar({ darkMode, setDarkMode }) {

  return (

    <div
      style={{
        height:"70px",
        background: darkMode ? "#1f2937" : "white",
        color: darkMode ? "white" : "#111827",
        display:"flex",
        alignItems:"center",
        justifyContent:"space-between",
        padding:"0 40px",
        borderBottom:"1px solid #e5e7eb",
        transition:"0.3s"
      }}
    >

      {/* Logo */}

      <h2
        style={{
          color:"#2563eb"
        }}
      >
        🚀 Requirement AI
      </h2>


      {/* Navigation */}

      <div
        style={{
          display:"flex",
          alignItems:"center",
          gap:"20px"
        }}
      >

        <button
          onClick={() => {
            const section = document.getElementById("dashboard");

            if(section){
              section.scrollIntoView({
                behavior:"smooth"
              });
            }
          }}

          style={{
            background:"transparent",
            border:"none",
            cursor:"pointer",
            color: darkMode ? "white" : "#374151"
          }}
        >
          Dashboard
        </button>


        <button
          onClick={() => {
            const section = document.getElementById("generator");

            if(section){
              section.scrollIntoView({
                behavior:"smooth"
              });
            }
          }}

          style={{
            background:"transparent",
            border:"none",
            cursor:"pointer",
            color: darkMode ? "white" : "#374151"
          }}
        >
          PRD Generator
        </button>


     <button

onClick={() => {

 const section =
 document.getElementById("settings");

 if(section){

   section.scrollIntoView({
     behavior:"smooth"
   });

 }

}}

style={{
 background:"transparent",
 border:"none",
 cursor:"pointer",
 color: darkMode ? "white" : "#374151"
}}

>
 Settings
</button>
<button

onClick={() => {

const section =
document.getElementById("overview");

if(section){

section.scrollIntoView({
behavior:"smooth"
});

}

}}

style={{
background:"transparent",
border:"none",
cursor:"pointer",
color: darkMode ? "white" : "#374151"
}}

>
Overview
</button>


        {/* Dark Mode Button */}

        <button
          onClick={() => setDarkMode(!darkMode)}

          style={{
            padding:"10px 15px",
            borderRadius:"8px",
            border:"none",
            cursor:"pointer"
          }}
        >

          {darkMode ? "☀️ Light" : "🌙 Dark"}

        </button>


      </div>


    </div>

  );
}


export default Navbar;