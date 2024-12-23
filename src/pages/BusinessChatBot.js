import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { FaPaperPlane } from "react-icons/fa";
import { RiRobot2Line } from "react-icons/ri";
import { TbRobotFace } from "react-icons/tb";
import styles from "./BusinessChatBot.module.css";

const BusinessChatBot = () => {
  const [messages, setMessages] = useState([
    { sender: "bot", text: "What brings you here today?" },
  ]);
  const predefinedQuestions = [
    "EV station peak time?",
    "Charging Prices for an EV?",
    "When is the best time to charge an EV?",
    "Where is the nearest EV station?",
  ];
  const [userInput, setUserInput] = useState("");
  const [typing, setTyping] = useState(false);
  const [location, setLocation] = useState(null);
  const [options, setOptions] = useState(predefinedQuestions);
  const [optionSubtype, setOptionSubtype] = useState("predefinedQuestions");

  const chatContainerRef = useRef(null);

  const handleNearestStation = async () => {
    setTyping(true);
    setOptions([]);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    try {
      const response = await axios.post("http://localhost:8082/api/chat/nearest-stations", {
        coordinates: {
          latitude: location.latitude,
          longitude: location.longitude,
        },
      });

      const stations = response.data.nearestStations || [];
      const stationOptions = stations.map(
        (station) =>
          `${station.area}, ${station.city} - ${station.distanceInKm} km`
      );

      setOptions(stationOptions);
      setOptionSubtype("stations");
    } catch (error) {
      console.error("Error fetching nearest stations:", error);
      setMessages((prev) => [
        ...prev,
        { sender: "bot", text: "Sorry, I couldn't fetch the nearest stations right now." },
      ]);
    } finally {
      setTyping(false);
    }
  };


  const handleOptionClick = async (option) => {
    setMessages((prev) => [...prev, { sender: "user", text: option }]);
    setTyping(true);

    try {
      if (option?.toLowerCase().includes("nearest ev station") || option.toLowerCase().includes("find ev station")) {
        await handleNearestStation();
      } else {
        const response = await axios.post("http://localhost:8082/api/chat/selected-option", {
          option,
          optionSubtype,
        });

        setMessages((prev) => [
          ...prev,
          { sender: "bot", text: response.data.message || "Thank you for your selection." },
        ]);
      }
    } catch (error) {
      console.error("Error sending selected option:", error);
      setMessages((prev) => [
        ...prev,
        { sender: "bot", text: "Sorry, I couldn't process your selection. Please try again." },
      ]);
      setOptions(predefinedQuestions);
    } finally {
      setTyping(false);
    }
  };


  const handleSendMessage = async (question) => {
    if (!question && !userInput.trim()) return;

    const userMessage = { sender: "user", text: question || userInput };
    setMessages((prev) => [...prev, userMessage]);
    setUserInput("");
    setTyping(true);

    if (userInput?.toLowerCase().includes("nearest ev") || userInput.toLowerCase().includes("find ev")) {
      await handleNearestStation();
    } else {
      try {
        const response = await axios.post("http://localhost:8082/api/chat/message", {
          message: question || userInput,
        });

        const botResponse = { sender: "bot", text: response.data.message };
        setMessages((prev) => [...prev, botResponse]);
      } catch (error) {
        console.error("Error sending message:", error);
        setMessages((prev) => [
          ...prev,
          { sender: "bot", text: "Sorry, something went wrong. Please try again." },
        ]);
        setOptions(predefinedQuestions);
      } finally {
        setTyping(false);
      }
    }
  };

  const getPreciseLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          });
        },
        (err) => {
          console.error("Error fetching location:", err.message);
        },
        {
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 0,
        }
      );
    } else {
      console.error("Geolocation is not supported by your browser.");
    }
  };

  useEffect(() => {
    getPreciseLocation();
  }, []);

  useEffect(() => {
    chatContainerRef.current?.scrollTo({
      top: chatContainerRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [messages, typing]);

  return (
    <div className={styles.container}>
      <div className={styles.header}>oser.ai</div>

      <div className={styles.chatBox} ref={chatContainerRef}>
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`${styles.message} ${msg.sender === "user" ? styles.userMessage : styles.botMessage
              }`}
          >
            {msg.sender !== "user" && (
              <TbRobotFace className={styles.botMessageIcon} />
            )}
            {msg.text}
          </div>
        ))}

        {typing && (
          <div className={`${styles.message} ${styles.botMessage}`}>
            <RiRobot2Line className={styles.botMessageIcon} />
            <div className={styles.typingAnimation}>
              <span></span>
              <span></span>
              <span></span>
            </div>
          </div>
        )}
      </div>

      {options.length > 0 && (
        <div className={styles.predefinedQuestions}>
          {options.map((question, index) => (
            <button
              key={index}
              className={styles.questionButton}
              onClick={() => handleOptionClick(question)}
            >
              {question}
            </button>
          ))}
        </div>
      )}

      <div className={styles.inputBox}>
        <input
          type="text"
          placeholder="Type your message..."
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
          className={styles.input}
          onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
        />
        <button
          onClick={() => handleSendMessage()}
          className={styles.sendButton}
        >
          <FaPaperPlane />
        </button>
      </div>
    </div>
  );
};

export default BusinessChatBot;
