import React from "react";
import styled from "styled-components";

export default function Instructions(props) {

  return (
    <>
      <Fade onClick={props.close} />
      <ModalContainer>
        <Title>How to Play</Title>
        <List>
          <ListElement>Roll dices until they have same number</ListElement>
          <ListElement>Click to lock the number</ListElement>
          <ListElement>Simple as that</ListElement>
        </List>
        <CloseModalButton onClick={props.close}>{props.closeText}</CloseModalButton>
      </ModalContainer>
    </>
  )
}

const Fade = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  background: rgba(0,0,0,0.8);
  z-index: 2;
`

const ModalContainer = styled.div`
  height: 40vh;
  max-height: 100rem;
  width: 60%;
  max-width: 25rem;
  position: absolute;
  background: #111;
  box-shadow: 0 5px 40px #222;
  z-index: 3;
  padding: 2rem;
  border-radius: 10px;
  display: flex;
  align-items: center;
  flex-direction: column;
  gap: 1rem;
  font-size: 2rem;
`

const CloseModalButton = styled.button`
  margin-top: auto;
  width: 40%;
  font-size: 2rem;
  color: #fff;
  background: #00ADB5;
  border: 2px solid #fff;
  border-radius: 20px;
  cursor: pointer;
`

const Title = styled.h2`
  font-size: 2.5rem;
  margin-bottom: 1.5rem;
  color: #00ADB5;
`

const List = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`

const ListElement = styled.li`
  font-size: 1.8rem;
  color: #EEE;
`