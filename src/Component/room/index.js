/**
 * @name Room
 * @author Saurav Dutta
 * @description File to make the room
 */
import React, { useEffect, useState } from "react";
import "./index.css";
import Person from "../person/index";
import helmet from "../../assets/bike.png";
import ttbat from "../../assets/ttbat.png";
import bottle from "../../assets/beerbottle.png";
import ppboat from "../../assets/ppboat.png";

const Room = props => {
  /**
   * Initializations of boolean variables
   */
  const [helmetShow, setHelmet] = useState(false);
  const [ttbatShow, setTtbat] = useState(false);
  const [bottleShow, setBottle] = useState(false);
  const [ppboatShow, setPpboat] = useState(false);
  const [quizVar, setQuizRound] = useState(false);
  const [curtainsOff, setCurtains] = useState(false);

  useEffect(() => {
    timeMapping();
    /**
     * Setting 5 mins interval after which clock time will get updated
     */
    setInterval(function() {
      timeMapping();
    }, 300000);
  }, []);

  /**
   * Array with class names for random assignment to respective node
   */
  const breakChances = ["cupShake", "cupBreak", "cupShake"];

  /**
   * Function to change clock time after 5 mins
   */
  const timeMapping = () => {
    let timeValue = new Date();
    let hours = timeValue.getHours();
    let mins = timeValue.getMinutes();
    let hour_as_degree = (hours / 12) * 360;
    let minute_as_degree = (mins / 60) * 360;
    let hourElement = document.getElementsByClassName("hour")[0];
    let minElement = document.getElementsByClassName("minute")[0];
    hourElement.style.transform = "rotate(" + hour_as_degree + "deg)";
    minElement.style.transform = "rotate(" + minute_as_degree + "deg)";
  };

  /**
   * Functions to handle adding and removing opening and closing classes of all drawers
   */
  const addDrawerClassOne = () => {
    firstDrawerTalk();
    let element = document.getElementsByClassName("right-tb")[0];
    element = element.children[0];
    element.classList.add("drawer-open");
    setTtbat(true);
  };

  const removeDrawerClassOne = () => {
    let element = document.getElementsByClassName("right-tb")[0];
    element = element.children[0];
    element.classList.remove("drawer-open");
    setTtbat(false);
  };

  const addDrawerClassTwo = () => {
    secondDrawerTalk();
    let element = document.getElementsByClassName("right-tb")[0];
    element = element.children[1];
    element.classList.add("drawer-open");
    setHelmet(true);
  };

  const removeDrawerClassTwo = () => {
    let element = document.getElementsByClassName("right-tb")[0];
    element = element.children[1];
    element.classList.remove("drawer-open");
    setHelmet(false);
  };

  const addDrawerClassThree = () => {
    thirdDrawerTalk();
    let element = document.getElementsByClassName("right-tb")[0];
    element = element.children[2];
    element.classList.add("drawer-open");
    setBottle(true);
  };

  const removeDrawerClassThree = () => {
    let element = document.getElementsByClassName("right-tb")[0];
    element = element.children[2];
    element.classList.remove("drawer-open");
    setBottle(false);
  };

  /**
   * Functions to handle adding and removing of shake class to cup
   */
  const addShakeClass = () => {
    let element = document.getElementsByClassName("cup")[0];
    let classValue =
      breakChances[Math.floor(Math.random() * breakChances.length)];
    if (classValue === "cupShake") {
      cupTalk();
    }
    element.classList.add(classValue);
  };

  const removeShakeClass = () => {
    let element = document.getElementsByClassName("cup")[0];
    if (element.classList.contains("cupShake")) {
      element.classList.remove("cupShake");
    }
  };

  /**
   * Functions to handle showing and hiding of paper boat image in the trash
   */
  const showTrash = () => {
    trashTalk();
    setPpboat(true);
  };

  const removeTrash = () => {
    setPpboat(false);
  };

  /**
   * Callback funtion to parent to read out predefined message based on user's location time
   */
  const clockTalk = () => {
    let d = new Date();
    let hours = d.getHours();
    if (hours >= 13 && hours <= 14) {
      props.roomTalk("lunch");
    } else if (hours >= 8 && hours <= 10) {
      props.roomTalk("breakfast");
    } else if (hours >= 20 && hours <= 22) {
      props.roomTalk("dinner");
    }
  };

  /**
   * Callback function to parent to start listening to user's voice
   */
  const talkButton = () => {
    props.talkValue(true);
  };

  /**
   * Callback functions to parent to start speaking predefined messages
   */

  const noteTalk = () => {
    props.roomTalk("note");
  };

  const shelfTalk = () => {
    props.roomTalk("books");
  };

  const firstDrawerTalk = () => {
    props.roomTalk("ttbat");
  };

  const secondDrawerTalk = () => {
    props.roomTalk("helmet");
  };

  const thirdDrawerTalk = () => {
    props.roomTalk("beer");
  };

  const trashTalk = () => {
    props.roomTalk("trash");
  };

  const cupTalk = () => {
    props.roomTalk("cup");
  };

  /**
   * Callback toggle function to parent to announce and close the quiz
   */
  const toggleQuiz = () => {
    if (!quizVar) {
      props.announceQuiz();
    } else {
      props.closeQuiz();
    }
    setQuizRound(!quizVar);
  };

  /**
   * Callback function to parent to start the quiz
   */
  const startQuiz = () => {
    let userName = document.getElementsByClassName("nameInput")[0];
    if (userName.value !== "") {
      props.startQuiz(userName.value);
    }
  };

  /**
   * Function to remove the curtains
   */
  const removeCurtains = () => {
    setCurtains(true);
  };

  return (
    <article id="workspace">
      <section
        className={
          "curtain curtainLeft " + (curtainsOff ? "curtainLeftOpen" : "")
        }
      ></section>
      <section className={"instructions " + (curtainsOff ? "none" : "")}>
        <header>LockDown@Home</header>
        <p>
          This is a fun voice integrated environment, where you can explore
          things in the room. Try hovering on items in the room and see what
          happens.
        </p>
        <p>
          Try interacting with the lady by clicking on the microphone on the
          table, and speaking near your machine. You can start interaction by
          saying, `How are you?`, `How is the weather?`, `Light off`, `Light
          on`, etc.
        </p>
        <p>
          Start exploring the room and enjoy. Feel free to contribute to this
          open source project to improve it even more. To go to Github link,
          please click{" "}
          <a
            href="https://github.com/SauarvD/lockdown-home"
            target="_blank"
            rel="noopener noreferrer"
          >
            here
          </a>
        </p>
        <p>To start the play, click Go</p>
        <p className="startButton" onClick={() => removeCurtains()}>
          Go
        </p>
      </section>
      <div className="bulbContainer">
        <div className="relative">
          <div className="bulb"></div>
          <div className="content">
            <div className="line"></div>
            <div className="line"></div>
            <div className="line"></div>
          </div>
        </div>
      </div>
      <div className="clock" onMouseEnter={clockTalk}>
        <div className="top"></div>
        <div className="right"></div>
        <div className="bottom"></div>
        <div className="left"></div>
        <div className="center"></div>
        <div className="hour"></div>
        <div className="minute"></div>
        <div className="second"></div>
      </div>

      <div className="clipBoardContainer">
        <div className="relative">
          <div className="flex">
            <div
              className={"checkbox " + (quizVar ? "selected" : "")}
              onClick={() => toggleQuiz()}
            ></div>
            {quizVar && (
              <div className="dataContainer">
                <div className="notice">Uncheck the box to stop the MAGIC</div>
                <input className="nameInput" />
                <div className="quizButton" onClick={() => startQuiz()}>
                  START
                </div>
              </div>
            )}
            {!quizVar && (
              <div className="notice">Check the box to start a MAGIC</div>
            )}
          </div>
        </div>
      </div>

      <div id="shelf">
        <ul>
          <li className="books" onMouseEnter={shelfTalk}>
            <span>
              <p className="bookTitle">CSS</p>
            </span>
            <span>
              <i></i>
            </span>
            <span></span>
            <span></span>
            <span>
              <p className="bookTitle html">HTML</p>
            </span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span>
              <p className="bookTitle vue">VUE</p>
            </span>
            <span></span>
          </li>
        </ul>
        <div></div>
      </div>

      <div className="desk">
        <div className="table">
          <div className="relative">
            <div className="icon microphone" onClick={talkButton}></div>
          </div>
          <div className="right-tb">
            <span
              className="relative addedZIndex "
              onMouseEnter={addDrawerClassOne}
              onMouseLeave={removeDrawerClassOne}
            >
              {ttbatShow && (
                <div className="ttContainer">
                  <img src={ttbat} className="ttImage" alt="" />
                </div>
              )}
            </span>
            <span
              className="relative addedZIndex "
              onMouseEnter={addDrawerClassTwo}
              onMouseLeave={removeDrawerClassTwo}
            >
              {helmetShow && (
                <div className="helmetContainer">
                  <img src={helmet} className="helmetImage" alt="helmet" />
                </div>
              )}
            </span>
            <span
              className="relative addedZIndex "
              onMouseEnter={addDrawerClassThree}
              onMouseLeave={removeDrawerClassThree}
            >
              {bottleShow && (
                <div className="bottleContainer">
                  <img src={bottle} className="ttImage" alt="" />
                </div>
              )}
            </span>
          </div>

          <span
            className="cup"
            onMouseEnter={addShakeClass}
            onMouseLeave={removeShakeClass}
          ></span>

          <div className="imac">
            <span className="note" onMouseEnter={noteTalk}>
              Eggs Milk Curd
            </span>
          </div>
        </div>

        <div className="chair">
          <div className="relative">
            <div className="absolute">
              <Person />
            </div>
          </div>
          <ul>
            <li></li>
            <li></li>
            <li></li>
          </ul>
          <i className="shadows"></i>
        </div>

        <div
          className="trash"
          onMouseEnter={showTrash}
          onMouseLeave={removeTrash}
        >
          <div className="trashContainer">
            {ppboatShow && (
              <div className="ppboatContainer">
                <img src={ppboat} className="ppboatImage" alt="" />
              </div>
            )}
          </div>
          <i className="shadows"></i>
        </div>
      </div>
      <section
        className={
          "curtain curtainRight " + (curtainsOff ? "curtainRightOpen" : "")
        }
      ></section>
    </article>
  );
};

export default Room;
