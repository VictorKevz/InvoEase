import React from "react";
import illustration from "../../assets/images/invoice1.svg";
import "./home.css";
import { homeData } from "./homeData";
import { Link } from "react-router-dom";
import { AnimatePresence,motion } from "framer-motion";
import { pageVariants } from "../../variants";
function Home() {
  return (
    <AnimatePresence mode="wait">
    <motion.section 
    className="wrapper home"
    variants={pageVariants}
    initial="initial"
    animate="visible"
    exit="exit"
    >
      <header className="home-header">
        <div className="home-text-wrapper">
          <h1 className="home-title">
            Simplify Your Invoices With <span className="mark">InvoEase</span>.
            
          </h1>
          <p className="home-parag">
            Experience an intuitive invoicing to streamline your workflow.
            Create, manage, and organize invoices effortlessly, so you can focus
            on growing your business without the hassle.
          </p>
        </div>
        <figure className="home-image-wrapper">
          <img src={illustration} alt="illustration" className="home-image" />
        </figure>
      </header>

      <div className="home-features">
        <h2 className="feature-title">Why Choose InvoEase?</h2>
        <div className="feature-card-wrapper">
          {homeData.map((feature) => (
            <div key={feature.id} className="feature-card">
              <span className="feature-card-icon-wrapper">
              <img src={feature.icon} className="feature-icon" />
              </span>
              <h2 className="feature-card-title">{feature.title}</h2>
              <p className="feature-parag">{feature.parag}</p>
              <Link to="/invoices" className="feature-link">Create Invoice</Link>
            </div>
          ))}
        </div>
      </div>
    </motion.section>
    </AnimatePresence>
  );
}

export default Home;
