export function TopBar({ user }) {

  return (
    <div style={{position: "absolute", right: "20px", top: "0"}}>
      <p>Welcome, <span>{user.fName ? user.fName : ""}!!</span></p>
    </div>
  );
}

export default TopBar;
