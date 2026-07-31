import { useState } from "react";
import Header from "./components/Header";
import Results from "./components/Results";
import Dashboard from "./components/Dashboard";
import PRDActions from "./components/PRDActions";
import PRDViewer from "./components/PRDViewer";
import Analytics from "./components/Analytics";
import Navbar from "./components/Navbar";
import Settings from "./components/Settings";
import Features from "./components/Features";
import { generatePRD } from "./api";


function App() {

  const [input, setInput] = useState("");
  const [result, setResult] = useState(null);
const [loading, setLoading] = useState(false);
const [darkMode, setDarkMode] = useState(false);
 const handleGenerate = async () => {

  try {

    setLoading(true);


    await new Promise(resolve => 
      setTimeout(resolve, 2000)
    );


    const data = await generatePRD(input);
console.log(data);
    setResult(data);


  } catch(error) {

    console.log(error);

  } finally {

    setLoading(false);

  }

};


  return (
    <Dashboard darkMode={darkMode}>

      <Navbar 
 darkMode={darkMode}
 setDarkMode={setDarkMode}
/>

<Header />

<Features darkMode={darkMode} />
   <div
 id="generator"
 style={{
   maxWidth:"900px",
   margin:"0 auto"
 }}
>

        <textarea
          placeholder="Describe your product idea..."
          value={input}
          onChange={(e)=>setInput(e.target.value)}
          style={{
            width:"100%",
            height:"150px",
            padding:"15px",
            borderRadius:"10px",
            border:"1px solid #ddd",
            fontSize:"16px"
          }}
        />


        <button
  onClick={handleGenerate}
  disabled={loading}
  style={{
    marginTop:"20px",
    padding:"12px 25px",
    borderRadius:"8px",
    background:"#2563eb",
    color:"white",
    border:"none",
    cursor:"pointer"
  }}
>
  {loading ? "⏳ Generating..." : "Generate PRD"}
</button>


      </div>

<div id="dashboard">

{
 result && 
 <>

  <Analytics 
    items={result?.items?? []}
    darkMode={darkMode}
  />

  <Results 
    items={result?.items?? []}
    darkMode={darkMode}
  />

  <PRDActions result={result}/>

  <PRDViewer 
    items={result?.items?? []}
    darkMode={darkMode}
  />

 </>
}
<Settings darkMode={darkMode}/>
</div>


    </Dashboard>
  );
}


export default App;