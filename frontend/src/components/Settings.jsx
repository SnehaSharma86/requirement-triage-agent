function Settings({ darkMode }) {

  return (

    <div
      id="settings"

      style={{
        maxWidth:"1000px",
minHeight:"300px",
margin:"80px auto",
padding:"40px",
        background: darkMode ? "#1f2937" : "white",
        color: darkMode ? "white" : "#111827",
        borderRadius:"16px",
        boxShadow:"0 10px 25px rgba(0,0,0,0.08)"
      }}
    >

     <h2
style={{
fontSize:"30px",
marginBottom:"25px"
}}
>
⚙️ Settings
</h2>


    <div
style={{
display:"grid",
gridTemplateColumns:"repeat(auto-fit,minmax(250px,1fr))",
gap:"20px"
}}
>

<div>
🌙 Theme
<p>
{darkMode ? "Dark Mode" : "Light Mode"}
</p>
</div>


<div>
📄 Export
<p>
TXT Format
</p>
</div>


<div>
🚀 Version
<p>
Requirement AI v1.0
</p>
</div>

</div>



    </div>

  );

}


export default Settings;