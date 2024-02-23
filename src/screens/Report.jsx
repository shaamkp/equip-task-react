import React, { useState } from "react";
import styled from "styled-components";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import "../App.css";
import { BaseUrl } from "../axiosConfig";

import "sweetalert2/dist/sweetalert2.css";
import Swal from "sweetalert2";

const Report = () => {
  const [clinicName, setClinicName] = useState("");
  const [physicianName, setPhysicianName] = useState("");
  const [physicianPhone, setPhysicianPhone] = useState("");
  const [patiantPhone, setPatiantPhone] = useState("");
  const [patiantName, setPatiantName] = useState("");
  const [patiantLastName, setPatiantLastName] = useState("");
  const [patiantDop, setPatiantDop] = useState("");
  const [complaint, setComplaint] = useState("");
  const [note, setNote] = useState("");

  const handleComplaint = (value) => {
    setComplaint(value);
  };

  const handleNote = (value) => {
    setNote(value);
  };

  const showSuccessAlert = () => {
    Swal.fire({
      title: "Success!",
      text: "Changes Updated.",
      icon: "success",
      confirmButtonColor: "rgb(9, 175, 244)",
      confirmButtonText: "Done",
    });
  };

  const handleSubmit = () => {
    const fromData = new FormData();
    fromData.append("clinic_name", clinicName);
    fromData.append("physician_name", physicianName);
    fromData.append("physician_contact", physicianPhone);
    fromData.append("patiant_first_name", patiantName);
    fromData.append("patiant_last_name", patiantLastName);
    fromData.append("patiant_phone", patiantPhone);
    fromData.append("patiant_dob", patiantDop);
    fromData.append("chief_complaint", complaint);
    fromData.append("consultant_note", note);

    BaseUrl.post("report/generate-report/", fromData, {
      responseType: "arraybuffer",
    }).then((res) => {
      const blob = new Blob([res.data], { type: "application/pdf" });
      const url = window.URL.createObjectURL(blob);

      // Create a temporary link element
      const link = document.createElement("a");
      link.href = url;
      link.download = `report.pdf`; // Set the desired file name

      // Append the link to the document and trigger the click event
      document.body.appendChild(link);
      link.click();

      // Clean up
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
      showSuccessAlert();
    });
  };

  return (
    <div>
      <MainContainer>
        <Wrapper>
          <Form>
            <TopDiv>
              <LeftDiv>
                <InputDiv>
                  <LabelDiv>
                    <Label>Clinic Name :</Label>
                  </LabelDiv>

                  <Input
                    type="text"
                    placeholder="Enter Clinic Name"
                    onChange={(e) => setClinicName(e.target.value)}
                  />
                </InputDiv>
                <InputDiv>
                  <LabelDiv>
                    <Label>Physician Name :</Label>
                  </LabelDiv>

                  <Input
                    type="text"
                    placeholder="Enter Clinic Name"
                    onChange={(e) => setPhysicianName(e.target.value)}
                  />
                </InputDiv>
                <InputDiv>
                  <LabelDiv>
                    <Label>Patiant First Name :</Label>
                  </LabelDiv>

                  <Input
                    type="text"
                    placeholder="Enter Clinic Name"
                    onChange={(e) => setPatiantName(e.target.value)}
                  />
                </InputDiv>
                <InputDiv>
                  <LabelDiv>
                    <Label>Patiant Dob :</Label>
                  </LabelDiv>

                  <Input
                    type="text"
                    placeholder="Enter Clinic Name"
                    onChange={(e) => setPatiantDop(e.target.value)}
                  />
                </InputDiv>
              </LeftDiv>
              <RightDiv>
                <InputDiv>
                  <LabelDiv>
                    <Label>Physician Phone :</Label>
                  </LabelDiv>

                  <Input
                    type="text"
                    placeholder="Enter Clinic Name"
                    onChange={(e) => setPhysicianPhone(e.target.value)}
                  />
                </InputDiv>

                <InputDiv>
                  <LabelDiv>
                    <Label>Patiant Last Name :</Label>
                  </LabelDiv>

                  <Input
                    type="text"
                    placeholder="Enter Clinic Name"
                    onChange={(e) => setPatiantLastName(e.target.value)}
                  />
                </InputDiv>
                <InputDiv>
                  <LabelDiv>
                    <Label>Patiant Phone :</Label>
                  </LabelDiv>

                  <Input
                    type="text"
                    placeholder="Enter Clinic Name"
                    onChange={(e) => setPatiantPhone(e.target.value)}
                  />
                </InputDiv>
              </RightDiv>
            </TopDiv>
            <BottomDiv>
              <BottomInputDiv>
                <Label>Complaint :</Label>
                <ReactQuill
                  className="rich-text-area-specification"
                  onChange={handleComplaint}
                />
              </BottomInputDiv>
              <BottomInputDiv>
                <Label>Consultation Note :</Label>
                <ReactQuill
                  className="rich-text-area-specification"
                  onChange={handleNote}
                />
              </BottomInputDiv>
            </BottomDiv>
            <ButtonDiv>
              <Button onClick={handleSubmit}>Generate Report</Button>
            </ButtonDiv>
          </Form>
        </Wrapper>
      </MainContainer>
    </div>
  );
};

export default Report;

const MainContainer = styled.div``;
const Wrapper = styled.div`
  width: 80%;
  margin: 0 auto;
`;
const Form = styled.form``;
const LabelDiv = styled.div`
  width: 30%;
`;
const ButtonDiv = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding-bottom: 50px;
`;
const TopDiv = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 20px;
`;
const LeftDiv = styled.div`
  width: 50%;
`;
const InputDiv = styled.div`
  display: flex;
  gap: 20px;
  align-items: center;
  margin-top: 15px;
`;
const Label = styled.label``;
const Input = styled.input`
  padding: 5px;
`;

const Button = styled.div`
  width: 30%;
  background-color: blue;
  color: #fff;
  cursor: pointer;
  padding: 5px;
  font-weight: 700;
  text-align: center;
`;
const RightDiv = styled.div`
  width: 50%;
`;
const BottomDiv = styled.div`
  margin-top: 30px;
`;
const BottomInputDiv = styled.div`
  height: 400px;
`;
