import { useEffect } from "react";

const keyframes = [
  { transform: "scale(0)" },
  { transform: "scale(1)" },
  { transform: "scale(1)" },
];
const timing = { duration: 750, iterations: Infinity };
const LoadIcon = () => {
  return (
    <div
      style={{
        position: "absolute",
        top: "50%",
        left: "50%",
        width: "120px",
        height: "120px",
        margin: "-60px 0 0 -60px",
        border: "5px solid #F9EB02",
        borderRadius: "50%",
        opacity: "0",
        animation: "scaleIn 4s infinite cubic-bezier(.36, .11, .89, .32)",
      }}
    ></div>
  );
};

const Loader = () => {
  //   useEffect(() => {
  //     LoadIcon.animate(keyframes, timing);
  //   }, []);
  return <LoadIcon />;
};

export default Loader;
