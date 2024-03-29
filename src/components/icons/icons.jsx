import { useState } from "react";
import IconBubble from "./IconBubble";

export const AddTaskIcon = ({ iconOptions, description }) => {
  return (
    <svg
      {...iconOptions}
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className="h-6 w-6 cursor-pointer text-gray-900 transition-all hover:scale-125"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
      />
    </svg>
  );
};

export const ChevronIcon = ({ iconOptions, description }) => {
  const [isHovered, setIsHovered] = useState(false);
  return (
    <div
      onMouseOver={() => {
        setIsHovered(true);
      }}
      onMouseOut={() => {
        setIsHovered(false);
      }}
    >
      {isHovered && description ? (
        <IconBubble description={description} />
      ) : null}
      <svg
        {...iconOptions}
        width="24"
        height="24"
        viewBox="0 0 24 24"
        strokeWidth="2"
        stroke="currentColor"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
        <path d="M15 6l-6 6l6 6"></path>
      </svg>
    </div>
  );
};

export const CheckIcon = ({ iconOptions, description }) => {
  const [isHovered, setIsHovered] = useState(false);
  return (
    <div
      onMouseOver={() => {
        setIsHovered(true);
      }}
      onMouseOut={() => {
        setIsHovered(false);
      }}
    >
      {isHovered && description ? (
        <IconBubble description={description} />
      ) : null}
      <svg {...iconOptions} viewBox="0 0 20 20" fill="currentColor">
        <path
          fillRule="evenodd"
          d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z"
          clipRule="evenodd"
        />
      </svg>
    </div>
  );
};

export const XIcon = ({ iconOptions, description }) => {
  const [isHovered, setIsHovered] = useState(false);
  return (
    <div
      onMouseOver={() => {
        setIsHovered(true);
      }}
      onMouseOut={() => {
        setIsHovered(false);
      }}
    >
      {isHovered && description ? (
        <IconBubble description={description} />
      ) : null}
      <svg
        {...iconOptions}
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={2}
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M6 18L18 6M6 6l12 12"
        />
      </svg>
    </div>
  );
};

export const TrashIcon = ({ iconOptions, description }) => {
  const [isHovered, setIsHovered] = useState(false);
  return (
    <div
      onMouseOver={() => {
        setIsHovered(true);
      }}
      onMouseOut={() => {
        setIsHovered(false);
      }}
    >
      {isHovered && description ? (
        <IconBubble description={description} />
      ) : null}
      <svg
        {...iconOptions}
        width="24"
        height="24"
        viewBox="0 0 24 24"
        strokeWidth="2"
        stroke="currentColor"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
        <path d="M4 7l16 0"></path>
        <path d="M10 11l0 6"></path>
        <path d="M14 11l0 6"></path>
        <path d="M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12"></path>
        <path d="M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3"></path>
      </svg>
    </div>
  );
};

export const NextIcon = ({ iconOptions, description }) => {
  const [isHovered, setIsHovered] = useState(false);
  return (
    <div
      onMouseOver={() => {
        setIsHovered(true);
      }}
      onMouseOut={() => {
        setIsHovered(false);
      }}
    >
      {isHovered && description ? (
        <IconBubble description={description} />
      ) : null}
      <svg
        {...iconOptions}
        strokeWidth="2"
        stroke="currentColor"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
        <path d="M7 7l5 5l-5 5"></path>
        <path d="M13 7l5 5l-5 5"></path>
      </svg>
    </div>
  );
};

export const PencilIcon = ({ iconOptions, description }) => {
  const [isHovered, setIsHovered] = useState(false);
  return (
    <div
      onMouseOver={() => {
        setIsHovered(true);
      }}
      onMouseOut={() => {
        setIsHovered(false);
      }}
    >
      {isHovered && description ? (
        <IconBubble description={description} />
      ) : null}
      <svg
        {...iconOptions}
        width="24"
        height="24"
        viewBox="0 0 24 24"
        strokeWidth="2"
        stroke="currentColor"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
        <path d="M4 20h4l10.5 -10.5a2.828 2.828 0 1 0 -4 -4l-10.5 10.5v4"></path>
        <path d="M13.5 6.5l4 4"></path>
      </svg>
    </div>
  );
};

export const StopIcon = ({ iconOptions, description }) => {
  const [isHovered, setIsHovered] = useState(false);
  return (
    <div
      onMouseOver={() => {
        setIsHovered(true);
      }}
      onMouseOut={() => {
        setIsHovered(false);
      }}
    >
      {isHovered && description ? (
        <IconBubble description={description} />
      ) : null}
      <svg
        {...iconOptions}
        fill="none"
        stroke="currentColor"
        strokeWidth={2.2}
        viewBox="0 0 24 24"
        aria-hidden="true"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M15.75 5.25v13.5m-7.5-13.5v13.5"
        />
      </svg>
    </div>
  );
};
