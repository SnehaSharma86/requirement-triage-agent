function Dashboard({ children, darkMode }) {

  return (

    <div
      style={{
        minHeight:"100vh",
        background: darkMode ? "#111827" : "#f8fafc",
        color: darkMode ? "white" : "#111827",
        transition:"0.3s"
      }}
    >

      {children}

    </div>

  );

}


export default Dashboard;