import { useState, useEffect } from "react";
import Controls from "./components/Controls";
import GraphView from "./components/GraphView";

import {
  shortestPath,
  suggestFriends,
  findCommunities,
  findInfluencer,
} from "./utils/graph";

function App() {
  const [graph, setGraph] = useState({});
  const [path, setPath] = useState(null);
  const [suggestion, setSuggestion] = useState([]);
  const [communities, setCommunities] = useState([]);
  const [influencer, setInfluencer] = useState(null);
  const [userInfo, setUserInfo] = useState({});
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  function reset() {
    setPath(null);
    setSuggestion([]);
    setCommunities([]);
    setInfluencer(null);
  }

  function addUser(user, interest) {
    const u = user.trim().toUpperCase();
    const i = interest.trim().toUpperCase();
    if (!u || !i) return;

    setGraph((prev) => {
      if (prev[u]) return prev;
      reset();
      return { ...prev, [u]: [] };
    });

    setUserInfo((prev) => ({
      ...prev,
      [u]: i,
    }));
  }

  function addConnection(u, v) {
    const a = u.trim().toUpperCase();
    const b = v.trim().toUpperCase();

    if (!a || !b || a === b) return;

    setGraph((prev) => {
      if (!prev[a] || !prev[b]) return prev;
      if (prev[a].includes(b)) return prev;

      reset();

      return {
        ...prev,
        [a]: [...prev[a], b],
        [b]: [...prev[b], a],
      };
    });
  }

  return (
    <div style={{ height: "100vh", display: "flex", flexDirection: "column" }}>

      {/* HEADER */}
      <div
        style={{
          height: "60px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: "26px",
          fontWeight: "bold",
          background: "#0f172a",
          borderBottom: "1px solid #1e293b",
          color: "#38bdf8",
        }}
      >
        Social Network Analyzer
      </div>

      {/* 🔥 RESPONSIVE MAIN */}
      {isMobile ? (
        // 📱 MOBILE VIEW
        <div style={{ display: "flex", flexDirection: "column" }}>

          {/* CONTROLS */}
          <div style={{ padding: "10px", background: "#111827" }}>
            <Controls
              addUser={addUser}
              addConnection={addConnection}
              findPath={(s, e) => setPath(shortestPath(graph, s, e))}
              suggest={(u) => setSuggestion(suggestFriends(graph, u))}
              findCommunities={() => setCommunities(findCommunities(graph))}
              findInfluencer={() => setInfluencer(findInfluencer(graph))}
            />
          </div>

          {/* GRAPH */}
          <div style={{ height: "400px", background: "#020617" }}>
            <GraphView graph={graph} userInfo={userInfo} />
          </div>

          {/* RESULTS */}
          <div style={{ padding: "10px", background: "#0f172a", color: "#e2e8f0" }}>
            <h3>Results</h3>

            {path && <p>Path: {path.join(" → ")}</p>}
            {suggestion.map(([u, c]) => <p key={u}>{u} ({c})</p>)}
            {communities.map((g, i) => <p key={i}>{g.join(", ")}</p>)}
            {influencer && <p>{influencer[0]} ({influencer[1]})</p>}
          </div>

        </div>
      ) : (
        // 💻 DESKTOP VIEW
        <div style={{ flex: 1, display: "flex", overflow: "hidden" }}>

          {/* LEFT */}
          <div
            style={{
              width: "260px",
              background: "#111827",
              padding: "15px",
              overflowY: "auto",
              borderRight: "1px solid #1e293b",
            }}
          >
            <Controls
              addUser={addUser}
              addConnection={addConnection}
              findPath={(s, e) => setPath(shortestPath(graph, s, e))}
              suggest={(u) => setSuggestion(suggestFriends(graph, u))}
              findCommunities={() => setCommunities(findCommunities(graph))}
              findInfluencer={() => setInfluencer(findInfluencer(graph))}
            />
          </div>

          {/* GRAPH (FIXED) */}
          <div style={{ flex: 1, background: "#111827", width:"100px" }}>
            {Object.keys(graph).length > 0 && (
              <GraphView graph={graph} userInfo={userInfo} />
            )}
          </div>

          {/* RIGHT */}
          <div
            style={{
              width: "260px",
              background: "#0f172a",
              color: "#e2e8f0",
              padding: "15px",
              overflowY: "auto",
              borderLeft: "1px solid #1e293b",
            }}
            >
            <h3 style={{ color: "#38bdf8" }}>Results</h3>

            {path && <p>Path: {path.join(" → ")}</p>}
            {suggestion.map(([u, c]) => <p key={u}>{u} ({c})</p>)}
            {communities.map((g, i) => <p key={i}>{g.join(", ")}</p>)}
            {communities.length > 0 && (
  <>
    <h4>Community Interests</h4>
    {communities.map((group, i) => {
      const interests = group.map(u => userInfo[u]);
      const freq = {};

      interests.forEach(int => {
        freq[int] = (freq[int] || 0) + 1;
      });

      const top = Object.entries(freq).sort((a, b) => b[1] - a[1])[0];

      return (
        <p key={i}>
          Group {i + 1}: {top ? top[0] : "N/A"}
        </p>
      );
    })}
  </>
)}
            {influencer && <p>{influencer[0]} ({influencer[1]})</p>}
          </div>

        </div>
      )}
    </div>
  );
}

export default App;
