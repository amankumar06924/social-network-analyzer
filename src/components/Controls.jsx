import { useState } from "react";

function Controls({
  addUser,
  addConnection,
  findPath,
  suggest,
  findCommunities,
  findInfluencer,
}) {
  const [name, setName] = useState("");
  const [user1, setUser1] = useState("");
  const [user2, setUser2] = useState("");
  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");
  const [suggestUser, setSuggestUser] = useState("");
  const [interest, setInterest] = useState("");

  // ---------- STYLES ----------
  const inputStyle = {
  width: "100%",
  padding: "8px",
  marginBottom: "8px",
  background: "#020617",
  color: "#e2e8f0",
  border: "1px solid #1e293b",
  borderRadius: "4px",
  outline: "none",
  boxSizing: "border-box",
};

  const buttonStyle = {
    width: "100%",
    padding: "6px",
    background: "#2563eb",
    color: "white",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    marginBottom: "8px",
  };

  const sectionStyle = {
    marginBottom: "20px",
  };

  const headingStyle = {
    color: "#38bdf8",
    marginBottom: "6px",
  };

  // ---------- HANDLERS ----------
  function handleAdd() {
    if (!name.trim()) return;
    addUser(name, interest);
    setName("");
    setInterest("");
  }

  function handleConnection() {
    if (!user1.trim() || !user2.trim()) return;
    addConnection(user1, user2);
    setUser1("");
    setUser2("");
  }

  function handleFindPath() {
    if (!start.trim() || !end.trim()) return;
    findPath(start, end);
    setStart("");
    setEnd("");
  }

  function handleSuggest() {
    if (!suggestUser.trim()) return;
    suggest(suggestUser);
    setSuggestUser("");
  }

  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      {/* ADD USER */}
      <div style={sectionStyle}>
        <h3 style={headingStyle}>Add User</h3>
        <input
          style={inputStyle}
          type="text"
          placeholder="Enter user name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleAdd()}
        />
        <input
        style={inputStyle}
        type="text"
        placeholder="Interest (CS, ART...)"
        value={interest}
        onChange={(e) => setInterest(e.target.value)}
      />
        <button style={buttonStyle} onClick={handleAdd}>
          Add
        </button>
      </div>

      {/* CONNECT USERS */}
      <div style={sectionStyle}>
        <h3 style={headingStyle}>Connect Users</h3>
        <input
          style={inputStyle}
          type="text"
          placeholder="User 1"
          value={user1}
          onChange={(e) => setUser1(e.target.value)}
        />
        <input
          style={inputStyle}
          type="text"
          placeholder="User 2"
          value={user2}
          onChange={(e) => setUser2(e.target.value)}
        />
        <button style={buttonStyle} onClick={handleConnection}>
          Connect
        </button>
      </div>

      {/* SHORTEST PATH */}
      <div style={sectionStyle}>
        <h3 style={headingStyle}>Shortest Path</h3>
        <input
          style={inputStyle}
          type="text"
          placeholder="Start"
          value={start}
          onChange={(e) => setStart(e.target.value)}
        />
        <input
          style={inputStyle}
          type="text"
          placeholder="End"
          value={end}
          onChange={(e) => setEnd(e.target.value)}
        />
        <button style={buttonStyle} onClick={handleFindPath}>
          Find Path
        </button>
      </div>

      {/* SUGGEST FRIENDS */}
      <div style={sectionStyle}>
        <h3 style={headingStyle}>Friend Suggestions</h3>
        <input
          style={inputStyle}
          type="text"
          placeholder="User"
          value={suggestUser}
          onChange={(e) => setSuggestUser(e.target.value)}
        />
        <button style={buttonStyle} onClick={handleSuggest}>
          Suggest
        </button>
      </div>

      {/* ANALYSIS */}
      <div style={sectionStyle}>
        <h3 style={headingStyle}>Analysis</h3>
        <button style={buttonStyle} onClick={findCommunities}>
          Find Communities
        </button>
        <button style={buttonStyle} onClick={findInfluencer}>
          Find Influencer
        </button>
      </div>
    </div>
  );
}

export default Controls;
