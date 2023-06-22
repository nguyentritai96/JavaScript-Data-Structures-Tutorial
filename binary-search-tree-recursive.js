class Node {
  constructor(value) {
    this.value = value;
    this.left = null;
    this.right = null;
  }
}

class BinarySearchTree {
  constructor() {
    this.root = null;
  }

  isEmpty() {
    return this.root === null;
  }

  insert(value) {
    const newNode = new Node(value);
    if (this.isEmpty()) {
      this.root = newNode;
    } else {
      this.insertNode(this.root, newNode);
    }
  }

  // Đã insert vào rồi là nằm ở đó, không di chuyển
  insertNode(root, newNode) {
    if (newNode.value < root.value) {
      if (root.left === null) {
        return root.left = newNode;
      } 
      
      // Nếu có 1 vòng đệ quy; đi vào vòng đệ quy cho đến khi gặp được base case rồi thoát ra
      // => tương tự async/await, cho đến khi gặp base case mới thoát ra => chạy code phía dưới
      return this.insertNode(root.left, newNode);
    } else {
      if (root.right === null) {
        return root.right = newNode;
      }  

      return this.insertNode(root.right, newNode);
    }
  }

  search(root, value) {
    if (!root) {
      return false;
    }
    if (root.value === value) {
      return true;
    } else if (value < root.value) {
      return this.search(root.left, value);
    } else {
      return this.search(root.right, value);
    }
  }

  min(root) {
    if (!root.left) {
      return root.value;
    } else {
      return this.min(root.left);
    }
  }

  max(root) {
    if (!root.right) {
      return root.value;
    } else {
      return this.max(root.right);
    }
  }

  delete(value) {
    this.root = this.deleteNode(this.root, value);
  }

  // return: null || node
  deleteNode(root, value) {
    if (root === null) {
      return root;
    }
    if (value < root.value) {
      root.left = this.deleteNode(root.left, value);
    } else if (value > root.value) {
      root.right = this.deleteNode(root.right, value);
    } else {
      // root.value === value
      if (!root.left && !root.right) {
        return null;
      }
      if (!root.left) {
        return root.right;
      } else if (!root.right) {
        return root.left;
      }

      // have left and right
      // bên trái không đổi, 
      // min bên phải làm value
      // xoá min value của nhánh bên phải (hiện tại đã gắn cho value của node)
      const minRootRight = this.min(root.right)
      root.value = minRootRight;
      root.right = this.deleteNode(root.right, minRootRight);
    }
    return root;
  }

  // DFS: pre, in, post 
  preOrder(root) {
    // root -> trái -> chạm đáy trái -> phải -> phải
    if (root) {
      console.log(root.value);
      this.preOrder(root.left);
      this.preOrder(root.right);
    }
  }

  inOrder(root) {
    // đáy trái left -> node -> right -> node lớn -> right
    if (root) {
      this.inOrder(root.left);
      console.log(root.value);
      this.inOrder(root.right);
    }
  }

  postOrder(root) {
    if (root) {
      // left -> right - node
      this.postOrder(root.left);
      this.postOrder(root.right);
      console.log(root.value);
    }
  }


  // BFS
  levelOrder() {
    /** Use the optimised queue enqueue and dequeue from queue-object.js instead.
     * I've used an array for simplicity. */
    // Liệt kê từ node xuống theo từng hàng
    const queue = [];
    queue.push(this.root);
    while (queue.length) {
      let curr = queue.shift();
      console.log(curr.value);
      if (curr.left) {
        queue.push(curr.left);
      }
      if (curr.right) {
        queue.push(curr.right);
      }
    }
  }

  height(node) {
    if (!node) {
      return 0;
    } else {
      const leftHeight = this.height(node.left);
      const rightHeight = this.height(node.right);

      return Math.max(leftHeight, rightHeight) + 1;
    }
  }

  printLevel(node, level) {
    if (!node) {
      return;
    }
    if (level === 1) {
      console.log(`${node.value} `);
    } else if (level > 1) {
      this.printLevel(node.left, level - 1);
      this.printLevel(node.right, level - 1);
    }
  }

  isBST(node, min, max) {
    if (!node) {
      return true;
    }
    if (node.value < min || node.value > max) {
      return false;
    }
    return (
      this.isBST(node.left, min, node.value) &&
      this.isBST(node.right, node.value, max)
    );
  }
}

// TODO level order and delete

const bst = new BinarySearchTree();
// console.log(bst.isEmpty());
bst.insert(10);
bst.insert(5);
bst.insert(15);
bst.insert(3);
bst.insert(7);
bst.insert(13);
bst.insert(17);
bst.insert(2);
bst.deleteNode(bst.root, 7)
// console.log(bst.search(bst.root, 10));
// console.log(bst.search(bst.root, 7));
// bst.inOrder(bst.root);
bst.preOrder(bst.root);
// bst.postOrder(bst.root);
// bst.levelOrder();
// bst.printLevel(bst.root, 3);
// console.log(bst.min(bst.root));
// console.log(bst.max(bst.root));
// console.log(bst.height(bst.root));
