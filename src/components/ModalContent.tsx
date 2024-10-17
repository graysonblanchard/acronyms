import * as React from "react";
import { ModalTypes } from "./enums";

export interface ModalProps {
  modalType: ModalTypes | undefined;
  closeModal: () => void;
}

export function ModalContent(props: ModalProps) {
  const title = () => {
    switch (props.modalType) {
      case ModalTypes.Help:
        return "How to play:";
      default:
        return "";
    }
  };

  return (
    <div>
      <h4>{title()}</h4>
      <div className="modal-close" onClick={props.closeModal}>
        <svg
          stroke="currentColor"
          fill="currentColor"
          stroke-width="0"
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
    </div>
  );
}
