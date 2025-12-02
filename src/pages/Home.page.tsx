import React from "react";

function Home(): React.ReactElement {
  return (
    <div className="container">
      <h1>Text Machine Lab</h1>
      <p>The Text Machine Lab at UMass Lowell conducts research in deep learning for for natural language processing, with a focus on representation learning and model interpretability. Our current and past projects span the following research areas: </p>
      <ul>
        <li>Model interpretability and representation learning.</li>  
        <li>Efficient large model training.</li>  
        <li>Text-based temporal reasoning, conversational agents, argument mining.</li>  
        <li>Clinical natural language processing, including information extraction, and predictive modeling using clinical patient records.</li>  
        <li>NLP for educational applications, digital knowledge and sentiment tracking for digital humanities and social science.</li>  
      </ul>
    </div>
  );
}

export default Home;