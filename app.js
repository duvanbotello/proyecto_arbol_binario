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
      return { ok: true, code: "root" };
    }

    let current = this.root;
    while (current) {
      if (value === current.value) {
        return { ok: false, code: "duplicate" };
      }

      if (value < current.value) {
        if (!current.left) {
          current.left = new Node(value);
          return { ok: true, code: "inserted" };
        }
        current = current.left;
      } else {
        if (!current.right) {
          current.right = new Node(value);
          return { ok: true, code: "inserted" };
        }
        current = current.right;
      }
    }

    return { ok: false, code: "error" };
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

const translations = {
  es: {
    heroEyebrow: "Recurso academico interactivo",
    heroTitle: "Arbol Binario de Busqueda",
    heroSubtitle: "Laboratorio visual para universidades: comprende la teoria del ABB y observa su comportamiento grafico paso a paso.",
    theoryTitle: "Que es un arbol binario de busqueda (ABB)?",
    theoryIntro: "Un ABB es una estructura jerarquica donde cada nodo puede tener hasta dos hijos y cumple una regla de orden.",
    theoryRuleTitle: "Regla fundamental",
    theoryRuleDesc: "Para cualquier nodo N: todos los valores del subarbol izquierdo son menores que N y todos los del subarbol derecho son mayores.",
    theoryOpsTitle: "Operaciones clasicas",
    theoryOpsDesc: "Insercion, busqueda y eliminacion siguen comparaciones sucesivas desde la raiz hasta ubicar el nodo objetivo.",
    theoryTravTitle: "Recorridos y teoria",
    theoryTravDesc: "Preorden: raiz-izquierda-derecha, Inorden: izquierda-raiz-derecha, Postorden: izquierda-derecha-raiz. En un ABB, Inorden produce valores ordenados.",
    theoryCompTitle: "Costo computacional",
    theoryCompDesc: "Promedio O(log n) si el arbol esta balanceado; peor caso O(n) cuando se degrada a una lista.",
    guideTitle: "Guia para aprender",
    guideCopy: "Regla base del ABB: todo valor menor va a la izquierda y todo valor mayor va a la derecha.",
    step1: "Inserta algunos valores (por ejemplo 50, 30, 70, 20, 40, 60, 80).",
    step2: "Ejecuta Inorden y verifica que el resultado quede ordenado.",
    step3: "Busca un nodo y luego consulta su padre e hijos.",
    step4: "Borra nodos y observa como se reorganiza el arbol.",
    loadExample: "Cargar ejemplo guiado",
    inputLabel: "Valor entero",
    inputPlaceholder: "Ej: 42",
    insertBtn: "Insertar",
    searchBtn: "Buscar",
    deleteBtn: "Borrar",
    parentBtn: "Buscar padre",
    childrenBtn: "Buscar hijos",
    pruneBtn: "Podar hojas",
    deleteMinBtn: "Borrar menor",
    deleteMaxBtn: "Borrar mayor",
    clearBtn: "Limpiar arbol",
    preBtn: "Preorden",
    inBtn: "Inorden",
    postBtn: "Postorden",
    statNodes: "Nodos",
    statLeaves: "Hojas",
    statMin: "Menor",
    statMax: "Mayor",
    graphTitle: "Representacion grafica",
    emptyTree: "El arbol esta vacio.",
    msgReady: "Listo para comenzar.",
    msgInvalid: "Ingresa un numero entero valido.",
    msgInsertedRoot: (v) => `Se inserto ${v} como raiz.`,
    msgInserted: (v) => `Se inserto ${v}.`,
    msgDuplicate: (v) => `El valor ${v} ya existe.`,
    msgInsertError: "No se pudo insertar.",
    msgSearchYes: (v) => `El valor ${v} SI existe.`,
    msgSearchNo: (v) => `El valor ${v} NO existe.`,
    msgDeleted: (v) => `Se borro ${v}.`,
    msgDeleteMissing: (v) => `No existe ${v} en el arbol.`,
    msgNodeMissing: (v) => `El nodo ${v} no existe.`,
    msgRootNoParent: "La raiz no tiene padre.",
    msgParentUnknown: "No se pudo determinar el padre.",
    msgParent: (v, p) => `El padre de ${v} es ${p}.`,
    msgChildren: (v, l, r) => `Hijos de ${v}: izquierdo=${l}, derecho=${r}.`,
    msgPruned: (n) => `Se podaron ${n} hojas.`,
    msgNoLeaves: "No hay hojas para podar.",
    msgTreeEmpty: "Arbol vacio.",
    msgDeleteMin: (v) => `Se borro el menor: ${v}.`,
    msgDeleteMax: (v) => `Se borro el mayor: ${v}.`,
    msgReset: "Arbol reiniciado.",
    msgExampleLoaded: "Ejemplo guiado cargado: 50, 30, 70, 20, 40, 60, 80.",
    hintInput: "Ingresa un valor y presiona Insertar.",
    hintRoot: (v) => `Si insertas ${v}, sera la raiz.`,
    hintLeft: (v, r) => `${v} es menor que la raiz ${r}, empezara por la izquierda.`,
    hintRight: (v, r) => `${v} es mayor que la raiz ${r}, empezara por la derecha.`,
    traversalNamePre: "Preorden",
    traversalNameIn: "Inorden",
    traversalNamePost: "Postorden",
    traversalEmpty: (n) => `${n}: arbol vacio`,
    traversalData: (n, values) => `${n}: ${values.join(" -> ")}`,
    lessons: {
      start: "Tip: empieza por insertar la raiz del arbol.",
      insert: "Aprendizaje: al insertar, compara desde la raiz. Menor va a la izquierda, mayor a la derecha.",
      search: "Aprendizaje: buscar evita revisar todo el arbol, solo sigue comparaciones.",
      delete: "Aprendizaje: al borrar, el nodo puede reemplazarse por su sucesor inorden.",
      traversal: "Aprendizaje: Inorden en un ABB debe entregar los valores ordenados.",
      prune: "Aprendizaje: podar elimina hojas y simplifica la forma del arbol.",
      example: "Ahora ejecuta Inorden y verifica que el recorrido salga en orden ascendente."
    },
    traversalHint: "Sugerencia: pulsa Inorden para validar la propiedad del ABB."
  },
  en: {
    heroEyebrow: "Interactive academic resource",
    heroTitle: "Binary Search Tree",
    heroSubtitle: "Visual lab for university courses: understand BST theory and observe its graphical behavior step by step.",
    theoryTitle: "What is a binary search tree (BST)?",
    theoryIntro: "A BST is a hierarchical data structure where each node can have up to two children and follows an ordering rule.",
    theoryRuleTitle: "Core rule",
    theoryRuleDesc: "For any node N: all values in the left subtree are smaller than N, and all values in the right subtree are greater than N.",
    theoryOpsTitle: "Classic operations",
    theoryOpsDesc: "Insertion, search, and deletion follow repeated comparisons from the root to locate the target node.",
    theoryTravTitle: "Traversals and theory",
    theoryTravDesc: "Preorder: root-left-right, Inorder: left-root-right, Postorder: left-right-root. In a BST, inorder traversal returns sorted values.",
    theoryCompTitle: "Time complexity",
    theoryCompDesc: "Average O(log n) when the tree is balanced; worst-case O(n) when it degenerates into a list.",
    guideTitle: "Learning guide",
    guideCopy: "BST base rule: smaller values go left and greater values go right.",
    step1: "Insert sample values (for example 50, 30, 70, 20, 40, 60, 80).",
    step2: "Run Inorder and verify the output is sorted.",
    step3: "Search for a node, then check its parent and children.",
    step4: "Delete nodes and observe how the tree reorganizes.",
    loadExample: "Load guided sample",
    inputLabel: "Integer value",
    inputPlaceholder: "Ex: 42",
    insertBtn: "Insert",
    searchBtn: "Search",
    deleteBtn: "Delete",
    parentBtn: "Find parent",
    childrenBtn: "Find children",
    pruneBtn: "Prune leaves",
    deleteMinBtn: "Delete min",
    deleteMaxBtn: "Delete max",
    clearBtn: "Clear tree",
    preBtn: "Preorder",
    inBtn: "Inorder",
    postBtn: "Postorder",
    statNodes: "Nodes",
    statLeaves: "Leaves",
    statMin: "Min",
    statMax: "Max",
    graphTitle: "Graphical representation",
    emptyTree: "The tree is empty.",
    msgReady: "Ready to start.",
    msgInvalid: "Please enter a valid integer.",
    msgInsertedRoot: (v) => `${v} inserted as root.`,
    msgInserted: (v) => `${v} inserted.`,
    msgDuplicate: (v) => `${v} already exists.`,
    msgInsertError: "Could not insert value.",
    msgSearchYes: (v) => `Value ${v} exists.`,
    msgSearchNo: (v) => `Value ${v} does not exist.`,
    msgDeleted: (v) => `${v} deleted.`,
    msgDeleteMissing: (v) => `${v} does not exist in the tree.`,
    msgNodeMissing: (v) => `Node ${v} does not exist.`,
    msgRootNoParent: "The root node has no parent.",
    msgParentUnknown: "Parent could not be determined.",
    msgParent: (v, p) => `Parent of ${v} is ${p}.`,
    msgChildren: (v, l, r) => `Children of ${v}: left=${l}, right=${r}.`,
    msgPruned: (n) => `${n} leaves were pruned.`,
    msgNoLeaves: "There are no leaves to prune.",
    msgTreeEmpty: "Tree is empty.",
    msgDeleteMin: (v) => `Deleted minimum value: ${v}.`,
    msgDeleteMax: (v) => `Deleted maximum value: ${v}.`,
    msgReset: "Tree reset.",
    msgExampleLoaded: "Guided sample loaded: 50, 30, 70, 20, 40, 60, 80.",
    hintInput: "Enter a value and press Insert.",
    hintRoot: (v) => `If you insert ${v}, it will become the root.`,
    hintLeft: (v, r) => `${v} is smaller than root ${r}, so it starts on the left.`,
    hintRight: (v, r) => `${v} is greater than root ${r}, so it starts on the right.`,
    traversalNamePre: "Preorder",
    traversalNameIn: "Inorder",
    traversalNamePost: "Postorder",
    traversalEmpty: (n) => `${n}: empty tree`,
    traversalData: (n, values) => `${n}: ${values.join(" -> ")}`,
    lessons: {
      start: "Tip: begin by inserting the root node.",
      insert: "Learning: insertion compares from the root. Smaller goes left, greater goes right.",
      search: "Learning: search does not scan everything; it follows comparisons only.",
      delete: "Learning: when deleting, a node can be replaced by its inorder successor.",
      traversal: "Learning: inorder traversal in a BST should return sorted values.",
      prune: "Learning: pruning removes leaves and simplifies tree shape.",
      example: "Now run Inorder and verify the sequence is ascending."
    },
    traversalHint: "Suggestion: click Inorder to validate the BST property."
  }
};

const bst = new BinarySearchTree();

const ui = {
  valueInput: document.getElementById("valueInput"),
  message: document.getElementById("message"),
  ruleHint: document.getElementById("ruleHint"),
  lessonText: document.getElementById("lessonText"),
  traversalResult: document.getElementById("traversalResult"),
  nodesCount: document.getElementById("nodesCount"),
  leavesCount: document.getElementById("leavesCount"),
  minValue: document.getElementById("minValue"),
  maxValue: document.getElementById("maxValue"),
  treeCanvas: document.getElementById("treeCanvas"),
  langEs: document.getElementById("langEs"),
  langEn: document.getElementById("langEn")
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
  post: document.getElementById("postBtn"),
  example: document.getElementById("exampleBtn")
};

let currentLang = navigator.language && navigator.language.toLowerCase().startsWith("en") ? "en" : "es";

function t(key) {
  return translations[currentLang][key];
}

function applyStaticTranslations() {
  document.querySelectorAll("[data-i18n]").forEach((el) => {
    const key = el.getAttribute("data-i18n");
    el.textContent = t(key);
  });

  document.querySelectorAll("[data-i18n-placeholder]").forEach((el) => {
    const key = el.getAttribute("data-i18n-placeholder");
    el.setAttribute("placeholder", t(key));
  });

  ui.langEs.classList.toggle("is-active", currentLang === "es");
  ui.langEn.classList.toggle("is-active", currentLang === "en");
}

function readNumber() {
  const raw = ui.valueInput.value.trim();
  if (!raw) return null;
  const value = Number(raw);
  if (!Number.isInteger(value)) return Number.NaN;
  return value;
}

function setMessage(text) {
  ui.message.textContent = text;
}

function setLesson(text) {
  ui.lessonText.textContent = text;
}

function updateRuleHint() {
  const value = readNumber();
  if (value === null || Number.isNaN(value)) {
    ui.ruleHint.textContent = t("hintInput");
    return;
  }

  if (!bst.root) {
    ui.ruleHint.textContent = t("hintRoot")(value);
    return;
  }

  ui.ruleHint.textContent = value < bst.root.value
    ? t("hintLeft")(value, bst.root.value)
    : t("hintRight")(value, bst.root.value);
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
  ui.traversalResult.textContent = values.length ? t("traversalData")(name, values) : t("traversalEmpty")(name);
  setLesson(t("lessons").traversal);
}

function createSvgEl(tag, attrs = {}) {
  const el = document.createElementNS("http://www.w3.org/2000/svg", tag);
  Object.entries(attrs).forEach(([key, value]) => {
    el.setAttribute(key, String(value));
  });
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
    const p = document.createElement("p");
    p.className = "empty";
    p.textContent = t("emptyTree");
    ui.treeCanvas.appendChild(p);
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

    svg.appendChild(createSvgEl("line", {
      x1: parent.cx,
      y1: parent.cy,
      x2: node.cx,
      y2: node.cy,
      stroke: "#8a7f69",
      "stroke-width": 2
    }));
  });

  byId.forEach((node) => {
    svg.appendChild(createSvgEl("circle", {
      cx: node.cx,
      cy: node.cy,
      r: radius,
      fill: "#1a6f65",
      stroke: "#0f4e47",
      "stroke-width": 2
    }));

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
  updateRuleHint();
}

function loadGuidedExample() {
  bst.root = null;
  [50, 30, 70, 20, 40, 60, 80].forEach((value) => bst.insert(value));
  setMessage(t("msgExampleLoaded"));
  setLesson(t("lessons").example);
  ui.traversalResult.textContent = t("traversalHint");
  refreshAll();
}

function setLanguage(lang) {
  currentLang = lang;
  document.documentElement.lang = lang === "en" ? "en" : "es";
  applyStaticTranslations();
  setLesson(t("lessons").start);
  setMessage(t("msgReady"));
  ui.traversalResult.textContent = "";
  refreshAll();
}

buttons.insert.addEventListener("click", () => {
  const value = readNumber();
  if (value === null || Number.isNaN(value)) {
    setMessage(t("msgInvalid"));
    return;
  }

  const result = bst.insert(value);
  if (result.code === "root") setMessage(t("msgInsertedRoot")(value));
  else if (result.code === "inserted") setMessage(t("msgInserted")(value));
  else if (result.code === "duplicate") setMessage(t("msgDuplicate")(value));
  else setMessage(t("msgInsertError"));

  setLesson(t("lessons").insert);
  refreshAll();
});

buttons.search.addEventListener("click", () => {
  const value = readNumber();
  if (value === null || Number.isNaN(value)) {
    setMessage(t("msgInvalid"));
    return;
  }

  setMessage(bst.search(value) ? t("msgSearchYes")(value) : t("msgSearchNo")(value));
  setLesson(t("lessons").search);
});

buttons.del.addEventListener("click", () => {
  const value = readNumber();
  if (value === null || Number.isNaN(value)) {
    setMessage(t("msgInvalid"));
    return;
  }

  const deleted = bst.delete(value);
  setMessage(deleted ? t("msgDeleted")(value) : t("msgDeleteMissing")(value));
  setLesson(t("lessons").delete);
  refreshAll();
});

buttons.parent.addEventListener("click", () => {
  const value = readNumber();
  if (value === null || Number.isNaN(value)) {
    setMessage(t("msgInvalid"));
    return;
  }

  if (!bst.search(value)) {
    setMessage(t("msgNodeMissing")(value));
    return;
  }

  const parent = bst.findParent(value);
  if (parent === null) {
    setMessage(t("msgRootNoParent"));
    return;
  }
  if (parent === undefined) {
    setMessage(t("msgParentUnknown"));
    return;
  }
  setMessage(t("msgParent")(value, parent.value));
});

buttons.children.addEventListener("click", () => {
  const value = readNumber();
  if (value === null || Number.isNaN(value)) {
    setMessage(t("msgInvalid"));
    return;
  }

  const children = bst.childrenOf(value);
  if (children === undefined) {
    setMessage(t("msgNodeMissing")(value));
    return;
  }

  const left = children.left === null ? "null" : children.left;
  const right = children.right === null ? "null" : children.right;
  setMessage(t("msgChildren")(value, left, right));
});

buttons.prune.addEventListener("click", () => {
  const removed = bst.pruneLeaves();
  setMessage(removed > 0 ? t("msgPruned")(removed) : t("msgNoLeaves"));
  setLesson(t("lessons").prune);
  refreshAll();
});

buttons.deleteMin.addEventListener("click", () => {
  const removed = bst.deleteMin();
  setMessage(removed === null ? t("msgTreeEmpty") : t("msgDeleteMin")(removed));
  refreshAll();
});

buttons.deleteMax.addEventListener("click", () => {
  const removed = bst.deleteMax();
  setMessage(removed === null ? t("msgTreeEmpty") : t("msgDeleteMax")(removed));
  refreshAll();
});

buttons.clear.addEventListener("click", () => {
  bst.root = null;
  setMessage(t("msgReset"));
  setLesson(t("lessons").start);
  ui.traversalResult.textContent = "";
  refreshAll();
});

buttons.pre.addEventListener("click", () => renderTraversal(t("traversalNamePre"), bst.preorder()));
buttons.ino.addEventListener("click", () => renderTraversal(t("traversalNameIn"), bst.inorder()));
buttons.post.addEventListener("click", () => renderTraversal(t("traversalNamePost"), bst.postorder()));
buttons.example.addEventListener("click", loadGuidedExample);

ui.valueInput.addEventListener("keydown", (event) => {
  if (event.key === "Enter") buttons.insert.click();
});

ui.valueInput.addEventListener("input", updateRuleHint);

ui.langEs.addEventListener("click", () => setLanguage("es"));
ui.langEn.addEventListener("click", () => setLanguage("en"));

setLanguage(currentLang);
