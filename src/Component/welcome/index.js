/**
 * @name Index
 * @author Saurav Dutta
 * @description index file to initiate speaking from user to machine and vice versa
 */
import React, { useState } from "react";
import "./index.css";
import calculateAnswer from "../../Q&A/logicBlock";
import Room from "../room/index";
import axios from "axios";
import { useDispatch } from "react-redux";

const Index = props => {
  const dispatch = useDispatch();
  /**
   * Initializations of speechRecognition and speechSynthesis
   */
  const [disableHover, setDisableCondition] = useState(false);
  const SpeechRecognition =
    window.SpeechRecognition || window.webkitSpeechRecognition;
  const recognition = new SpeechRecognition();
  const voicesList = window.speechSynthesis.getVoices();
  window.onresize = function(event) {
    // readOutLoud(true);
  };

  /**
   * Function to start listening to user's commands
   */
  recognition.onstart = function() {
    console.log("Voice is activated");
  };

  /**
   * As user stops speaking, this function gets triggered
   * It gets the message from user and sends to logicBlock
   * to process the output
   */
  recognition.onresult = function(event) {
    const current = event.resultIndex;
    const transcript = event.results[current][0].transcript;
    readOutLoud(transcript);
  };

  /**
   * Callback function to start listening
   * @param {boolean} data 
   */
  const talkData = data => {
    if (data) {
      talkButton();
    }
  };

  /**
   * Callback function to start speaking with predefined message
   * @param {string} data 
   */
  const roomTalk = data => {
    readOutLoud(data);
  };

  /**
   * Callback function to announce start of the quiz
   */
  const announceQuiz = () => {
    setDisableCondition(true);
    readOutLoud("quizAnnouncement");
  };

  /**
   * Callback function to call api with user name
   * @param {string} name 
   */
  const startQuiz = name => {
    let firstName = name.split(" ")[0];
    axios
      .get(`https://api.diversitydata.io/?fullname=${name}`)
      .then(res => {
        let data = {
          ethnicity: res.data.ethnicity,
          gender: res.data.gender,
          name: firstName
        };
        readOutLoud("quiz", data);
      })
      .catch(err => {
        console.error(err);
      });
  };

  /**
   * Callback function to close the quiz
   */
  const closeQuiz = () => {
    setDisableCondition(false);
  };

  /**
   * Function to initiate speaking
   */
  const talkButton = () => {
    recognition.start();
  };

  /**
   * Function to read out loud the processed output to the user
   * @param {string} message
   */
  const readOutLoud = (message, data) => {
    var voices = window.speechSynthesis.getVoices();
    const speech = new SpeechSynthesisUtterance();
    speech.volume = 1;
    speech.rate = 0.9;
    speech.pitch = 1;
    if (message === true) {
      speech.text = `Ha ha pata hai, responsive nahi hai`;
    } else {
      /**
       * Getting the processed output as per user's message
       */
      const output = calculateAnswer.calculateAnswer(message, data);
      if (output !== undefined) {
        speech.text = output;
      }
    }
    /**
     * 55th is the index of indian language from among the list of voices available
     */
    speech.voice = voices[55] || voicesList[55];
    dispatch({ type: "SPEAK", payload: speech.text });
    if (!disableHover || message === "quiz") {
      window.speechSynthesis.speak(speech);
    } else {
      speech.text = `Uncheck the box, to resume`;
      window.speechSynthesis.speak(speech);
    }
  };

  return (
    <article className="container">
      <Room
        talkValue={talkData}
        roomTalk={roomTalk}
        announceQuiz={announceQuiz}
        startQuiz={startQuiz}
        closeQuiz={closeQuiz}
      />
    </article>
  );
};

export default Index;
