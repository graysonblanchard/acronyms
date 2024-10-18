import * as React from "react";
import { ModalTypes } from "./enums";
import ExampleImg from '../img/example.png';

export interface ModalProps {
  modalType: ModalTypes | undefined;
  closeModal: () => void;
}

interface ModalData {
  title: string;
  body: React.ReactElement;
}

export function ModalContent(props: ModalProps) {
  const modalData: ModalData = {
    title: "",
    body: <></>,
  }

  switch (props.modalType) {
    case ModalTypes.Help:
      modalData.title = "How to play:";
      modalData.body = (
        <>
          <div>Solve the acronym by entering the missing letter.</div>
          <div>The acronym may be a reference to a common English phrase or expression, a famous name, a list, etc. </div>
          <h4>Example</h4>
          <div><img src={ExampleImg} alt='Example Clue' width={'200px'}/></div>
          <div>In this example, the letters stand for the colors of the rainbow. The solution is V which stands for VIOLET.</div>
          <h4>Scoring</h4>
          <div>You have only three guesses.</div>
          <div>Each incorrect guess deducts a point from your score.</div>
          <div>Good luck!</div>
          {/* <h4>Hints</h4>
          <div>You have two hints available for each clue.</div>
          <div>Each hint used deducts a point from your score.</div> */}
        </>
      )
      break;
    default:
      break;
  }
  
  return (
    <div>
      <h4>{modalData.title}</h4>
      <div className="modal-close" onClick={props.closeModal}>
        <svg
          stroke="currentColor"
          fill="currentColor"
          version="1.1"
          viewBox="0 0 17 17"
          height="20px"
          width="20px"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g></g>
          <path d="M9.207 8.5l6.646 6.646-0.707 0.707-6.646-6.646-6.646 6.646-0.707-0.707 6.646-6.646-6.647-6.646 0.707-0.707 6.647 6.646 6.646-6.646 0.707 0.707-6.646 6.646z"></path>
        </svg>
      </div>
      <div className="modal-body">{modalData.body}</div>
    </div>
  );
}
