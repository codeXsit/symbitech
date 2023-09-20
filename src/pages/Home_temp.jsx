import {
  MDBBtn,
  MDBContainer,
  MDBCard,
  MDBCardBody,
  MDBCardImage,
  MDBNavbarBrand,
  MDBRow,
  MDBCol,
  MDBIcon,
  MDBInput,
} from "mdb-react-ui-kit";

import "../styles/home_tempStyle.css";

import axios from "axios";
import React, { useEffect, useState } from "react";
import { BsFillPersonLinesFill } from "react-icons/bs";
import { RiUserAddLine } from "react-icons/ri";
import { HiOutlineMail } from "react-icons/hi";
import { RiTeamLine } from "react-icons/ri";
import codexLight from "../assets/codex_light.png";
import peopleVectorArt from "../assets/people_vector.svg";

function Home_temp() {
  const [formData, setFormData] = useState({
    teamName: "",
    members: [{ name: "" }, { name: "" }],
    userEmail: "",
  });

  useEffect(() => {
    function addFocusClass(event) {
      const parent = event.target.parentNode.parentNode;
      parent.classList.add("focus");
    }

    function removeFocusClass(event) {
      const parent = event.target.parentNode.parentNode;
      if (event.target.value === "") {
        parent.classList.remove("focus");
      }
    }

    document.querySelectorAll(".input").forEach((input) => {
      input.addEventListener("focus", addFocusClass);
      input.addEventListener("blur", removeFocusClass);

      return () => {
        input.removeEventListener("focus", addFocusClass);
        input.removeEventListener("blur", removeFocusClass);
      };
    });
  }, [formData.members]);

  const [timeToArrive, setTimeToArrive] = useState("");
  const [nameOfTeam, setNameOfTeam] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const latestTimestampRes = await axios.get("/api/v1/latestTime");
      const latestTimestamp = latestTimestampRes.data.latestTimestamp;
      let teamTime;
      const initialWait = 10;
      const playTime = 15;

      if (latestTimestamp === null) {
        const currentTime = Date.now();
        teamTime = new Date(currentTime);
        teamTime.setMinutes(teamTime.getMinutes() + initialWait + playTime);

        const timeToArriveDate = new Date(currentTime);
        timeToArriveDate.setMinutes(
          timeToArriveDate.getMinutes() + initialWait
        );

        setTimeToArrive(
          `Your time is ${timeToArriveDate.toLocaleTimeString()}`
        );
        setNameOfTeam(`Thank you for registering ${formData.teamName}!`);
      } else {
        teamTime = new Date(latestTimestamp);
        teamTime.setMinutes(teamTime.getMinutes() + initialWait + playTime);

        const timeToArriveDate = new Date(latestTimestamp);
        timeToArriveDate.setMinutes(
          timeToArriveDate.getMinutes() + initialWait
        );

        setTimeToArrive(
          `Your time is ${timeToArriveDate.toLocaleTimeString()}`
        );
        setNameOfTeam(`Thank you for registering ${formData.teamName}!`);
      }
      const newFormData = {
        ...formData,
        timestamp: teamTime,
      };
      const response = await axios.post("/api/v1/register", newFormData);
      console.log("Response from backend:", response.data);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleChange = (event, category, index) => {
    const { value } = event.target;

    setFormData((prevData) => {
      if (Array.isArray(prevData[category])) {
        const updatedCategory = [...prevData[category]];
        updatedCategory[index].name = value;

        return {
          ...prevData,
          [category]: updatedCategory,
        };
      } else {
        return {
          ...prevData,
          [category]: value,
        };
      }
    });
  };

  const handleAddMember = () => {
    if (formData.members.length < 4) {
      setFormData((prevData) => ({
        ...prevData,
        members: [...prevData.members, { name: "" }],
      }));
    }
  };

  const cardStyle = {
    background: "linear-gradient(to left, #232526, #414345)",
  };

  return (
    <MDBContainer className="my-5 ">
      <MDBCard style={cardStyle}>
        <MDBRow className="g-0">
          <MDBCol md="6" className="d-flex justify-content-center">
            
            <MDBCardImage
              src={peopleVectorArt}
              alt="people vector "
              className="rounded-start w-100"
            />
          
          </MDBCol>

          <MDBCol md="6">
            <MDBCardBody className="d-flex flex-column">
              <div className="d-flex flex-row mt-2 d-flex justify-content-center">
                <MDBNavbarBrand href="https://www.instagram.com/codex_sit/">
                  <img src={codexLight} height="80" alt="" loading="lazy" />
                </MDBNavbarBrand>
              </div>
              <div className="information d-flex flex-column">
                {nameOfTeam ? (
                  <div className="response-message">
                    <h1>{nameOfTeam}!</h1>
                    <p>{timeToArrive}</p>
                  </div>
                ) : (
                  <form method="POST" onSubmit={handleSubmit}>
                    <h2>Register yourself!</h2>
                    <div className="input-div one">
                      <div className="icon">
                        <RiTeamLine />
                      </div>
                      <div className="details">
                        <label htmlFor="teamName">Team Name</label>
                        <input
                          type="text"
                          className="input"
                          id="teamName"
                          name="teamName"
                          onChange={(e) => handleChange(e, "teamName")}
                          required
                        />
                      </div>
                    </div>
                    {formData.members.map((member, index) => (
                      <div className="input-div one" key={index}>
                        <div className="icon">
                          <BsFillPersonLinesFill />
                        </div>
                        <div className="details">
                          <label htmlFor={`member${index + 1}`}>
                            {" "}
                            Member {index + 1}
                          </label>
                          <input
                            type="text"
                            className="input"
                            id={`member${index + 1}`}
                            name={`member${index + 1}`}
                            onChange={(e) => handleChange(e, "members", index)}
                            required
                          />
                        </div>
                      </div>
                    ))}
                    {formData.members.length < 4 && (
                      <div className="add-member">
                        <button type="button" onClick={handleAddMember}>
                          <RiUserAddLine />
                        </button>
                      </div>
                    )}
                    <div className="input-div one">
                      <div className="icon">
                        <HiOutlineMail />
                      </div>
                      <div className="details">
                        <label htmlFor="userEmail">Email of any member</label>
                        <input
                          type="email"
                          className="input"
                          id="userEmail"
                          name="userEmail"
                          onChange={(e) => handleChange(e, "userEmail")}
                          required
                        />
                      </div>
                    </div>
                    <button className="glowing-btn" type="submit">
                      <span className="glowing-txt">
                        REG
                        <span className="faulty-letter">I</span>
                        STER
                      </span>
                    </button>
                  </form>
                )}
              </div>
            </MDBCardBody>
          </MDBCol>
        </MDBRow>
      </MDBCard>
    </MDBContainer>
  );
}

export default Home_temp;
