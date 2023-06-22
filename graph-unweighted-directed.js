class Graph {
  constructor() {
    this.adjacencyList = {};
  }

  addVertex(vertex) {
    if (!this.adjacencyList[vertex]) {
      this.adjacencyList[vertex] = new Set();
    }
  }

  addEdge(vertex1, vertex2) {
    if (!this.adjacencyList[vertex1]) {
      this.addVertex(vertex1);
    }
    if (!this.adjacencyList[vertex2]) {
      this.addVertex(vertex2);
    }
    this.adjacencyList[vertex1].add(vertex2);
    // this.adjacencyList[vertex2].add(vertex1);
  }

  removeEdge(vertex1, vertex2) {
    this.adjacencyList[vertex1].delete(vertex2);
    // this.adjacencyList[vertex2].delete(vertex1);
  }

  removeVertex(vertex) {
    if (!this.adjacencyList[vertex]) {
      return;
    }
    for (let adjacentVertex of this.adjacencyList[vertex]) {
      this.removeEdge(vertex, adjacentVertex);
    }
    delete this.adjacencyList[vertex];
  }

  hasEdge(vertex1, vertex2) {
    return (
      this.adjacencyList[vertex1].has(vertex2) 
      // && this.adjacencyList[vertex2].has(vertex1)
    );
  }

  display() {
    for (let vertex in this.adjacencyList) {
      console.log(vertex + " -> " + [...this.adjacencyList[vertex]]);
    }
  }

  dfs(startingNode){
    const traverse = []
    const visited = {};
    this.DFSUtil(startingNode, visited, traverse);
    console.log(traverse)
  }

  DFSUtil(vert, visited, traverse){
      visited[vert] = true;
      traverse.push(vert);

      const get_List = this.adjacencyList[vert];

      get_List.forEach((neigh) => {
          if (!visited[neigh]) {
              this.DFSUtil(neigh, visited, traverse);
          }
      })
  }

  // Đi theo hình zic zak từ phải đầu tiên
  bfs(startingNode) {
    const traverse = []
    // create a visited object
    const visited = {};
 
    // Create an object for queue
    const q = [];
 
    // add the starting node to the queue
    visited[startingNode] = true;
    q.push(startingNode);
 
    // loop until queue is empty
    while (q.length) {
        // get the element from the queue
        const getQueueElement = q.shift();
 
        // passing the current vertex to callback function
        traverse.push(getQueueElement);
 
        // get the adjacent list for current vertex
        const get_List = this.adjacencyList[getQueueElement];
 
        // loop through the list and add the element to the
        // queue if it is not processed yet
        get_List.forEach((neigh) => {
          if (!visited[neigh]) {
              visited[neigh] = true;
              q.push(neigh);
          }
        })
    }

    console.log(traverse.join(' -> '))
  }

  
}

const graph = new Graph();
graph.addEdge('A', 'B');
graph.addEdge('A', 'D');
graph.addEdge('A', 'E');
graph.addEdge('B', 'C');
graph.addEdge('D', 'E');
graph.addEdge('E', 'F');
graph.addEdge('E', 'C');
graph.addEdge('C', 'F');
console.log('---- Add Vertex ----')
graph.display();

// graph.dfs('A')

// console.log('---- Remove Edge ----')
// graph.removeEdge("A", "B");
// graph.display();

// console.log('---- Remove Vertex ----')
// graph.removeVertex("A");
// graph.display();
