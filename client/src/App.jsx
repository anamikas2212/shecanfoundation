import React, { useState } from "react";
import Background3D from "./components/Background3D";
import ContactForm from "./components/ContactForm";

function App() {
  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <Background3D />
      <div className="absolute inset-0 flex items-center justify-center z-10">
        <ContactForm />
      </div>
    </div>
  );
}

export default App;
