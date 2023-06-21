/**
 * Weighted Graphs
 *
 * Graphs are a collection of nodes and connections.
 *  - Think about a network - e.g: facebook, or google maps
 *  - Netflix/IMDB for example when recommending movies.
 *  - Airport connections
 *
 * Types of Graphs
 *
 * Terminology
 *  - Vertex = a node
 *  - Edge = Connection between nodes (the connecting line)
 *  - Weighted / Unweighted = values assigned to distances between vertices
 *  - Directed / Undirected = directions assigned to distanced between vertices
 *
 * Weighted Graph:
 *  - Assign a numeric value to the edge
 *  - Is a numeric value to represent a weight on that edge.
 *  - Used for example to simulate traffic in google maps
 *
 * Undirected Graph:
 *  - Two way connections
 *   A --- B
 *  - A connects to B, but B also connects to A
 *  - Useful when modeling Airports
 *
 * Directed Graph:
 *  - One way connection
 *  - You can only go into one direction
 *
 *
 * How to store them:
 *
 * There are two ways to store them:
 *
 * Adjanacenty Matrix = The data is stored as a Matrix - Mostly O(N*2)
 *  - Takes up more space (Uses not needed space) - think multiplication matrix
 *  - Slower
 *  - Faster to lookup specific edge
 *
 * Adjanacenty List = The data is stored in a list (like an array) - Mostly O(1)
 *  - Takes less space (we are only storing the connections)
 *  - Faster to iterate through all edges
 *  - Slow to lookup specific edge (connection)
 */

// No error handling at the moment for the class.

class WeightedGraph {
    constructor() {
        this.adjacencyList = {};
    }

    addVertex(vertex) {
        if (!this.adjacencyList[vertex]) {
            this.adjacencyList[vertex] = [];
        }
    }

    addEdge(vertex1, vertex2, weight) {
        if (!this.adjacencyList[vertex1]) {
            this.addVertex(vertex1);
        }
        if (!this.adjacencyList[vertex2]) {
            this.addVertex(vertex2);
        }

        this.adjacencyList[vertex1].push({ node: vertex2, weight });
        this.adjacencyList[vertex2].push({ node: vertex1, weight });
    }

    removeEdge(vertex1, vertex2) {
        this.adjacencyList[vertex1] = this.adjacencyList[vertex1].filter(
            v => v !== vertex2
        );
        this.adjacencyList[vertex2] = this.adjacencyList[vertex2].filter(
            v => v !== vertex1
        );
    }

    removeVertex(vertex) {
        if (!this.adjacencyList[vertex]) {
            return;
        }
        const edges = this.adjacencyList[vertex];
        edges.forEach(({ node }) => this.removeEdge(node, vertex));
        delete this.adjacencyList[vertex];
    }
}

let g = new WeightedGraph();
console.log("adding vertices -------------------------------");
g.addVertex("A");
g.addVertex("B");
g.addVertex("C");
console.log(g);

console.log("adding edges -------------------------------");
g.addEdge("A", "B", 9);
g.addEdge("A", "C", 5);
g.addEdge("B", "C", 7);
console.log(JSON.stringify(g, null, 4));

console.log("remove vertex -------------------------------");
g.removeVertex("A");
console.log(JSON.stringify(g, null, 4));
  