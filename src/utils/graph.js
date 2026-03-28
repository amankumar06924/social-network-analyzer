export function shortestPath(graph, start, end) {
  const s = start.trim().toUpperCase();
  const e = end.trim().toUpperCase();
  if (!graph[s] || !graph[e]) return null;
  let queue = [[s]];
  let visited = new Set([s]);

  while (queue.length > 0) {
    let path = queue.shift();
    let node = path[path.length - 1];
    if (node === e) return path;

    for (let neighbor of graph[node]) {
      if (!visited.has(neighbor)) {
        visited.add(neighbor);
        queue.push([...path, neighbor]);
      }
    }
  }

  return null;
}
export function suggestFriends(graph, user) {
  const u = user.trim().toUpperCase();
  if (!graph[u]) return [];

  let friends = new Set(graph[u]);
  let suggestions = {};

  for (let f of graph[u]) {
    if(!graph[f]) continue;
    for (let fof of graph[f]) {
      if (fof !== u && !friends.has(fof)) {
        suggestions[fof] = (suggestions[fof] || 0) + 1;
      }
    }
  }

  return Object.entries(suggestions)
    .sort((a, b) => b[1] - a[1]);
}

export function findCommunities(graph) {
  let visited = new Set();
  let result = [];

  for (let node in graph) {
    if (!visited.has(node)) {
      let stack = [node];
      let group = [];

      while (stack.length) {
        let curr = stack.pop();

        if (!visited.has(curr)) {
          visited.add(curr);
          group.push(curr);

          for (let nei of graph[curr]) {
            if (!visited.has(nei)) {
              stack.push(nei);
            }
          }
        }
      }

      result.push(group);
    }
  }

  return result;
}

export function findInfluencer(graph) {
  let maxUser = null;
  let maxConnections = -1;

  for (let user in graph) {
    if (graph[user].length > maxConnections) {
      maxConnections = graph[user].length;
      maxUser = user;
    }
  }

  return [maxUser, maxConnections];
}