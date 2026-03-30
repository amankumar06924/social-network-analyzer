import ForceGraph2D from "react-force-graph-2d";
import { findCommunities } from "../utils/graph";

function GraphView({ graph = {},userInfo={} }) {
  const nodes = Object.keys(graph).map(id => ({ id }));
  const links = [];
  const seen = new Set();

  for (let u in graph) {
    for (let v of graph[u]) {
      const key = [u, v].sort().join("-");
      if (!seen.has(key)) {
        seen.add(key);
        links.push({ source: u, target: v });
      }
    }
  }
  // 🔥 ADD THIS BLOCK
for (let u in graph) {
  for (let v in graph) {
    if (
      u !== v &&
      userInfo[u] &&
      userInfo[u] === userInfo[v]
    ) {
      links.push({
        source: u,
        target: v,
        hidden: true
      });
    }
  }
}
  

  const data = { nodes, links };
  const COLORS = [
    "#38bdf8",
    "#f472b6",
    "#facc15",
    "#4ade80",
    "#a78bfa",
    "#fb923c",
    
  ];
  const COLORS2 = {
  CS: "#38bdf8",
  ART: "#f472b6",
  MUSIC: "#facc15",
  SPORTS: "#4ade80",
};


  const communities = findCommunities(graph);
  const colorMap = {};

  communities.forEach((group, i) => {
    group.forEach(node => {
      colorMap[node] = COLORS[i % COLORS.length];
    });
  });

  return (
    <div
      style={{
        height: "689px",
        border: "1px solid #444",
        borderRadius: "8px",
        background: "#0f172a",
      }}
    >
      <ForceGraph2D
        graphData={data}

        // ❌ REMOVE THIS (IMPORTANT)
        // nodeAutoColorBy="id"

        nodeLabel="id"

        // 🔥 CUSTOM NODE DRAW (ADDED)
        nodeCanvasObject={(node, ctx, globalScale) => {
        const interest = userInfo[node.id] || "";
const label = interest ? `${node.id} (${interest})` : node.id;
//idk
          const fontSize = 12 / globalScale;
          ctx.font = `${fontSize}px Sans-Serif`;

          // circle
          ctx.beginPath();
          ctx.arc(node.x, node.y, 6, 0, 2 * Math.PI);
          ctx.fillStyle = COLORS2[userInfo[node.id]] || "#94a3b8";
          ctx.fill();

          // text
          ctx.fillStyle = "#e2e8f0";
          ctx.fillText(label, node.x + 8, node.y + 4);
        }}

        // link styling (UNCHANGED)
       linkColor={(link) => link.hidden ? "transparent" : "#888"}
       linkDistance={(link) => link.hidden ? 30 : 120}
        linkDirectionalParticles={2}
        linkDirectionalParticleSpeed={0.005}

        // physics (UNCHANGED)
        d3VelocityDecay={0.3}
        cooldownTicks={100}

        // interaction (UNCHANGED)
        enableNodeDrag={true}
      />
    </div>
  );
}

export default GraphView;
