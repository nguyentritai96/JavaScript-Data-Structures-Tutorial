class WeightedDirectedGraph {
    constructor() {
        this.adjacencyList = {};
    }

    addVertex(vertex) {
        if (!this.adjacencyList[vertex]) {
            this.adjacencyList[vertex] = {};
        }
    }

    addEdge(vertex1, vertex2, weight) {
        if (!this.adjacencyList[vertex1]) {
            this.addVertex(vertex1);
        }

        this.adjacencyList[vertex1][vertex2] = weight
    }

    removeEdge(vertex1, vertex2) {
        if (typeof this.adjacencyList[vertex1][vertex2] !== 'undefined') {
            delete this.adjacencyList[vertex1][vertex2]
        }
        
    }

    removeVertex(vertex) {
        if (!this.adjacencyList[vertex]) {
            return;
        }
        const edges = this.adjacencyList[vertex];
        Object.keys(edges).forEach((node) => this.removeEdge(node, vertex));
        delete this.adjacencyList[vertex];
    }
}

let g = new WeightedDirectedGraph();
console.log("adding vertices -------------------------------");
g.addVertex("A");
g.addVertex("B");
g.addVertex("C");
console.log(g);

console.log("adding edges -------------------------------");
g.addEdge("A", "B", 9);
g.addEdge("A", "C", 5);
g.addEdge("B", "C", 7);
g.addEdge("C", "D", 8);
console.log(JSON.stringify(g, null, 4));

// console.log("remove vertex -------------------------------");
// g.removeVertex("A");
// console.log(JSON.stringify(g, null, 4));


const shortestDistanceNode = (distances, visited) => {
    if (!Object.keys(distances).length) {
        return null
    }

    let shortest = null;

	for (let node in distances) {
		let currentIsShortest = shortest === null || distances[node] < distances[shortest];
		if (currentIsShortest && !visited.includes(node)) {
			shortest = node;
		}
	}
	return shortest;
};

const findShortestPath = (graph, startNode, endNode) => {
	// Ghi lại khoảng cách từ điểm bắt đầu cho đến đỉnh kề
	const distances = {
        [endNode]: 'Infinity',
        ...graph[startNode]
    };
	
	// Lưu lại điểm gần nhất trước khi đến node tiếp theo
	const parents = { endNode: null };
	for (let child in graph[startNode]) {
		parents[child] = startNode;
	}

	// Điểm đã duyệt qua
	const visited = [];

	// Xác định đỉnh có cạnh ngắn nhất
	let node = shortestDistanceNode(distances, visited);

	// for that node
	while (node) {
		// find its distance from the start node & its child nodes
		const distance = distances[node];
		const children = graph[node];

		// for each of those child nodes
		for (let child in children) {
			// make sure each child node is not the start node
			if (String(child) === String(startNode)) {
				continue;
			} else {
				// save the distance from the start node to the child node
				let newdistance = distance + children[child];
				// if there's no recorded distance from the start node to the child node in the distances object
				// or if the recorded distance is shorter than the previously stored distance from the start node to the child node
				// save the distance to the object
				// record the path
				if (!distances[child] || distances[child] > newdistance) {
					distances[child] = newdistance;
					parents[child] = node;
				}
			}
		}
		// move the node to the visited set
		visited.push(node);
		// move to the nearest neighbor node
		node = shortestDistanceNode(distances, visited);
	}

	// using the stored paths from start node to end node
	// record the shortest path
	const shortestPath = [endNode];
	let parent = parents[endNode];
	while (parent) {
		shortestPath.unshift(parent);
		parent = parents[parent];
	}

	// return the shortest path from start node to end node & its distance
	return {
		distance: distances[endNode],
		path: shortestPath,
	};
};


console.log(findShortestPath(g.adjacencyList, 'A', 'D'))