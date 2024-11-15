import { useEffect, useRef } from "react";
const styleLoaderCircle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  width: "90px",
  height: "90px",
  margin: "-60px 0 0 -60px",
  border: "5px solid #F9EB02",
  borderRadius: "50%",
};
const keyframes1 = [
  { transform: "scale(0)" },
  { transform: "scale(0.166)" },
  { transform: "scale(0.333)" },
  { transform: "scale(0.5)" },
  { transform: "scale(0.666)" },
  { transform: "scale(0.833)" },
  { transform: "scale(1)" },
  //   { transform: "opacity(0)" },
];
const timing = { duration: 1250, iterations: Infinity };
const keyframes2 = [
  { transform: "scale(0)" },
  { transform: "scale(0)" },
  { transform: "scale(0.25)" },
  { transform: "scale(0.5)" },
  { transform: "scale(0.75)" },
  { transform: "scale(1)" },
  //   { transform: "opacity(0)" },
];

const keyframes3 = [
  { transform: "scale(0)" },
  { transform: "scale(0)" },
  { transform: "scale(0)" },
  { transform: "scale(0.33)" },
  { transform: "scale(0.66)" },
  { transform: "scale(1)" },
];
const LoadIcon = () => {
  const loadIconRef1 = useRef(null);
  const loadIconRef2 = useRef(null);
  const loadIconRef3 = useRef(null);
  useEffect(() => {
    loadIconRef1.current.animate(keyframes1, timing);
  }, []);
  useEffect(() => {
    loadIconRef2.current.animate(keyframes2, timing);
  }, []);
  useEffect(() => {
    loadIconRef3.current.animate(keyframes3, timing);
  }, []);
  return (
    <>
      <div ref={loadIconRef1} style={styleLoaderCircle}></div>
      <div ref={loadIconRef2} style={styleLoaderCircle}></div>
      <div ref={loadIconRef3} style={styleLoaderCircle}></div>
    </>
  );
};

const Loader = () => {
  return <LoadIcon />;
};

export default Loader;
