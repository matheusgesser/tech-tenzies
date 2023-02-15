import React from "react";
import styled from "styled-components";

export default function Dice(props) {
  const styles = {
    backgroundColor: props.locked ? "#888" : "#eee",
    boxShadow: props.locked ? 'none' : '0 4px 2px #222',
    transform: props.locked ? 'translateY(4px)' : 'none'
  }

  return (
    <Box style={styles} onClick={() => props.hold(props.id)}>
      {props.value}
    </Box>
  )
}

const Box = styled.div`
  width: 100%;
  height: 6rem;
  width: 6rem;
  color: #222;
  margin: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 4rem;
  border-radius: 6px;
  cursor: pointer;
  box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.15);
  @media (max-width: 900px) {
    width: 4rem;
    height: 4rem;
    font-size: 3rem;
  }
  transition: all 30ms;
`