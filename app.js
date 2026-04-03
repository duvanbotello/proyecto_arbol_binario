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

  insert(value) {
    if (this.root === null) {
      this.root = new Node(value);
      return { ok: true, message: `Se inserto ${value} como raiz.` };
    }

    let current = this.root;
    while (current) {
      if (value === current.value) {
        return { ok: false, message: `El valor ${value} ya existe.` };
      }

      if (value < current.value) {
        if (!current.left) {
          current.left = new Node(value);
          return { ok: true, message: `Se inserto ${value}.` };
        }
        current = current.left;
      } else {
        if (!current.right) {
          current.right = new Node(value);
          return { ok: true, message: `Se inserto ${value}.` };
        }
        current = current.right;
      }
    }

    return { ok: false, message: "No se pudo insertar." };
  }

  search(value) {
    let current = this.root;
    while (current) {
      if (value === current.value) return true;
      current = value < current.value ? current.left : current.right;
    }
    return false;
  }

  findNode(value) {
    let current = this.root;
    while (current) {
      if (value === current.value) return current;
      current = value < current.value ? current.left : current.right;
    }
    return null;
  }

  findParent(value) {
    if (!this.root || this.root.value === value) return null;
    let parent = null;
    let current = this.root;

    while (current) {
      if (value === current.value) return parent;
      parent = current;
      current = value < current.value ? current.left : current.right;
    }

    return undefined;
  }

  delete(value) {
    const deleteRec = (node, target) => {
      if (!node) return [null, false];
      if (target < node.value) {
        const [nextLeft, deleted] = deleteRec(node.left, target);
        node.left = nextLeft;
        return [node, deleted];
      }
      if (target > node.value) {
        const [nextRight, deleted] = deleteRec(node.right, target);
        node.right = nextRight;
        return [node, deleted];
      }

      if (!node.left) return [node.right, true];
      if (!node.right) return [node.left, true];

      let successor = node.right;
      while (successor.left) successor = successor.left;
      node.value = successor.value;
      const [nextRight] = deleteRec(node.right, successor.value);
      node.right = nextRight;
      return [node, true];
    };

    const [nextRoot, deleted] = deleteRec(this.root, value);
    this.root = nextRoot;
    return deleted;
  }

  min() {
    if (!this.root) return null;
    let current = this.root;
    while (current.left) current = current.left;
    return current.value;
  }

  max() {
    if (!this.root) return null;
    let current = this.root;
    while (current.right) current = current.right;
    return current.value;
  }

  deleteMin() {
    const minValue = this.min();
    if (minValue === null) return null;
    this.delete(minValue);
    return minValue;
  }

  deleteMax() {
    const maxValue = this.max();
    if (maxValue === null) return null;
    this.delete(maxValue);
    return maxValue;
  }

  pruneLeaves() {
    if (!this.root) return 0;

    if (!this.root.left && !this.root.right) {
      this.root = null;
      return 1;
    }

    let removed = 0;
    const prune = (node) => {
      if (!node) return;

      if (node.left && !node.left.left && !node.left.right) {
        node.left = null;
        removed += 1;
      } else {
        prune(node.left);
      }

      if (node.right && !node.right.left && !node.right.right) {
        node.right = null;
        removed += 1;
      } else {
        prune(node.right);
      }
    };

    prune(this.root);
    return removed;
  }

  countNodes() {
    const walk = (node) => (node ? 1 + walk(node.left) + walk(node.right) : 0);
    return walk(this.root);
  }

  countLeaves() {
    const walk = (node) => {
      if (!node) return 0;
      if (!node.left && !node.right) return 1;
      return walk(node.left) + walk(node.right);
    };
    return walk(this.root);
  }

  childrenOf(value) {
    const node = this.findNode(value);
    if (!node) return undefined;
    return {
      left: node.left ? node.left.value : null,
      right: node.right ? node.right.value : null
    };
  }

  preorder() {
    const out = [];
    const walk = (node) => {
      if (!node) return;
      out.push(node.value);
      walk(node.left);
      walk(node.right);
    };
    walk(this.root);
    return out;
  }

  inorder() {
    const out = [];
    const walk = (node) => {
      if (!node) return;
      walk(node.left);
      out.push(node.value);
      walk(node.right);
    };
    walk(this.root);
    return out;
  }

  postorder() {
    const out = [];
    const walk = (node) => {
      if (!node) return;
      walk(node.left);
      walk(node.right);
      out.push(node.value);
    };
    walk(this.root);
    return out;
  }
}

const bst = new BinarySearchTree();

const ui = {
  valueInput: document.getElementById("valueInput"),
  message: document.getElementById("message"),
  traversalResult: document.getElementById("traversalResult"),
  nodesCount: document.getElementById("nodesCount"),
  leavesCount: document.getElementById("leavesCount"),
  minValue: document.getElementById("minValue"),
  maxValue: document.getElementById("maxValue"),
  treeCanvas: document.getElementById("treeCanvas")
};

const buttons = {
  insert: document.getElementById("insertBtn"),
  search: document.getElementById("searchBtn"),
  del: document.getElementById("deleteBtn"),
  parent: document.getElementById("parentBtn"),
  children: document.getElementById("childrenBtn"),
  prune: document.getElementById("pruneBtn"),
  deleteMin: document.getElementById("deleteMinBtn"),
  deleteMax: document.getElementById("deleteMaxBtn"),
  clear: document.getElementById("clearBtn"),
  pre: document.getElementById("preBtn"),
  ino: document.getElementById("inBtn"),
  post: document.getElementById("postBtn")
};

function readNumber() {
  const raw = ui.valueInput.value.trim();
  if (!raw) return null;
  const value = Number(raw);
  if (!Number.isInteger(value)) return NaN;
  return value;
}

function setMessage(text) {
  ui.message.textContent = text;
}

function renderStats() {
  const nodes = bst.countNodes();
  const leaves = bst.countLeaves();
  ui.nodesCount.textContent = String(nodes);
  ui.leavesCount.textContent = String(leaves);
  ui.minValue.textContent = bst.min() ?? "-";
  ui.maxValue.textContent = bst.max() ?? "-";
}

function renderTraversal(name, values) {
  ui.traversalResult.textContent = values.length ? `${name}: ${values.join(" -> ")}` : `${name}: arbol vacio`;
}

function createSvgEl(tag, attrs = {}) {
  const el = document.createElementNS("http://www.w3.org/2000/svg", tag);
  for (const [key, value] of Object.entries(attrs)) el.setAttribute(key, String(value));
  return el;
}

function getDepth(node) {
  if (!node) return 0;
  return 1 + Math.max(getDepth(node.left), getDepth(node.right));
}

function computeLayout(root) {
  let index = 0;
  const nodes = [];

  const walk = (node, depth, parentId) => {
    if (!node) return;
    walk(node.left, depth + 1, node.value);
    nodes.push({ id: node.value, value: node.value, depth, xOrder: index, parentId });
    index += 1;
    walk(node.right, depth + 1, node.value);
  };

  walk(root, 0, null);
  return nodes;
}

function renderTree() {
  ui.treeCanvas.innerHTML = "";

  if (!bst.root) {
    ui.treeCanvas.innerHTML = '<p class="empty">El arbol esta vacio.</p>';
    return;
  }

  const positionedNodes = computeLayout(bst.root);
  const depth = getDepth(bst.root);
  const xGap = 70;
  const yGap = 90;
  const pad = 28;
  const radius = 19;
  const width = Math.max(600, positionedNodes.length * xGap + pad * 2);
  const height = Math.max(300, depth * yGap + pad * 2);

  const svg = createSvgEl("svg", { viewBox: `0 0 ${width} ${height}`, width, height });
  const byId = new Map();

  positionedNodes.forEach((node) => {
    byId.set(node.id, {
      ...node,
      cx: pad + node.xOrder * xGap,
      cy: pad + node.depth * yGap
    });
  });

  byId.forEach((node) => {
    if (node.parentId === null) return;
    const parent = byId.get(node.parentId);
    if (!parent) return;
    svg.appendChild(
      createSvgEl("line", {
        x1: parent.cx,
        y1: parent.cy,
        x2: node.cx,
        y2: node.cy,
        stroke: "#8a7f69",
        "stroke-width": 2
      })
    );
  });

  byId.forEach((node) => {
    svg.appendChild(
      createSvgEl("circle", {
        cx: node.cx,
        cy: node.cy,
        r: radius,
        fill: "#1a6f65",
        stroke: "#0f4e47",
        "stroke-width": 2
      })
    );

    const text = createSvgEl("text", {
      x: node.cx,
      y: node.cy + 5,
      fill: "#ffffff",
      "font-size": 13,
      "font-family": "Space Grotesk, sans-serif",
      "font-weight": 700,
      "text-anchor": "middle"
    });
    text.textContent = String(node.value);
    svg.appendChild(text);
  });

  ui.treeCanvas.appendChild(svg);
}

function refreshAll() {
  renderStats();
  renderTree();
}

buttons.insert.addEventListener("click", () => {
  const value = readNumber();
  if (value === null || Number.isNaN(value)) {
    setMessage("Ingresa un numero entero valido.");
    return;
  }

  const result = bst.insert(value);
  setMessage(result.message);
  refreshAll();
});

buttons.search.addEventListener("click", () => {
  const value = readNumber();
  if (value === null || Number.isNaN(value)) {
    setMessage("Ingresa un numero entero valido.");
    return;
  }
  setMessage(bst.search(value) ? `El valor ${value} SI existe.` : `El valor ${value} NO existe.`);
});

buttons.del.addEventListener("click", () => {
  const value = readNumber();
  if (value === null || Number.isNaN(value)) {
    setMessage("Ingresa un numero entero valido.");
    return;
  }

  const deleted = bst.delete(value);
  setMessage(deleted ? `Se borro ${value}.` : `No existe ${value} en el arbol.`);
  refreshAll();
});

buttons.parent.addEventListener("click", () => {
  const value = readNumber();
  if (value === null || Number.isNaN(value)) {
    setMessage("Ingresa un numero entero valido.");
    return;
  }

  if (!bst.search(value)) {
    setMessage(`El nodo ${value} no existe.`);
    return;
  }

  const parent = bst.findParent(value);
  if (parent === null) {
    setMessage("La raiz no tiene padre.");
    return;
  }
  if (parent === undefined) {
    setMessage("No se pudo determinar el padre.");
    return;
  }
  setMessage(`El padre de ${value} es ${parent.value}.`);
});

buttons.children.addEventListener("click", () => {
  const value = readNumber();
  if (value === null || Number.isNaN(value)) {
    setMessage("Ingresa un numero entero valido.");
    return;
  }

  const children = bst.childrenOf(value);
  if (children === undefined) {
    setMessage(`El nodo ${value} no existe.`);
    return;
  }

  setMessage(`Hijos de ${value}: izquierdo=${children.left ?? "null"}, derecho=${children.right ?? "null"}.`);
});

buttons.prune.addEventListener("click", () => {
  const removed = bst.pruneLeaves();
  setMessage(removed > 0 ? `Se podaron ${removed} hojas.` : "No hay hojas para podar.");
  refreshAll();
});

buttons.deleteMin.addEventListener("click", () => {
  const removed = bst.deleteMin();
  setMessage(removed === null ? "Arbol vacio." : `Se borro el menor: ${removed}.`);
  refreshAll();
});

buttons.deleteMax.addEventListener("click", () => {
  const removed = bst.deleteMax();
  setMessage(removed === null ? "Arbol vacio." : `Se borro el mayor: ${removed}.`);
  refreshAll();
});

buttons.clear.addEventListener("click", () => {
  bst.root = null;
  setMessage("Arbol reiniciado.");
  ui.traversalResult.textContent = "";
  refreshAll();
});

buttons.pre.addEventListener("click", () => renderTraversal("Preorden", bst.preorder()));
buttons.ino.addEventListener("click", () => renderTraversal("Inorden", bst.inorder()));
buttons.post.addEventListener("click", () => renderTraversal("Postorden", bst.postorder()));

ui.valueInput.addEventListener("keydown", (event) => {
  if (event.key === "Enter") buttons.insert.click();
});

refreshAll();
