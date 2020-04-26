/**
 * @name Person
 * @author Saurav Dutta
 * @description File to make the person
 */
import React, { useEffect, useState } from "react";
import "./index.css";

const Person = props => {
  return (
    <div className="main-div">
      <div className="hair"></div>
      <div className="dress">
        <h1>
          Wash your damm hands
        </h1>
      </div>
      <div className="belt"></div>
      <div className="pants"></div>
      <div className="pants2"></div>
      <div className="shoe"></div>
      <div className="shoe2"></div>
      <div className="neck"></div>
      <div className="face"></div>
      <div className="eye"></div>
      <div className="eye2"></div>
      <div className="nose"></div>
      <div className="mouth"></div>
      <div className="cheek"></div>
      <div className="hand"></div>
      <div className="hand3"></div>
      <div className="palm"></div>
      <div className="hand2"></div>
      <div className="palm2"></div>
    </div>
  );
};

export default Person;
