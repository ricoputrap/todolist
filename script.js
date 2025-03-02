const myname = "Rico"

const username = document.querySelector("#username")
username.textContent = myname

// default categories
const CATEGORIES = [
  {
    id: 1,
    name: "Life",
    img: "images/boy.png"
  },
  {
    id: 2,
    name: "Work",
    img: "images/briefcase.png"
  },
  {
    id: 3,
    name: "Projects",
    img: "images/webdev.png"
  },
  {
    id: 4,
    name: "Learning",
    img: "images/education.png"
  }
]

// default tasks
const TASKS = [
  // Life category tasks
  {
    id: 1,
    name: "Grocery shopping",
    is_completed: false,
    category_id: 1
  },
  {
    id: 2,
    name: "Plan family gathering",
    is_completed: true,
    category_id: 1
  },
  {
    id: 3,
    name: "Morning running",
    is_completed: false,
    category_id: 1
  },

  // Work category tasks
  {
    id: 4,
    name: "Finish quarterly report",
    is_completed: false,
    category_id: 2
  },
  {
    id: 5,
    name: "Schedule performance reviews",
    is_completed: true,
    category_id: 2
  },
  {
    id: 6,
    name: "Update team project",
    is_completed: false,
    category_id: 2
  },

  // Projects category tasks
  {
    id: 7,
    name: "Build new website",
    is_completed: false,
    category_id: 3
  },
  {
    id: 8,
    name: "Create presentation for stakeholders",
    is_completed: true,
    category_id: 3
  },
  {
    id: 9,
    name: "Research project management tools",
    is_completed: false,
    category_id: 3
  },

  // Learning category tasks
  {
    id: 10,
    name: "Complete online course on JavaScript",
    is_completed: true,
    category_id: 4
  },
  {
    id: 11,
    name: "Read a book about UX design",
    is_completed: false,
    category_id: 4
  },
  {
    id: 12,
    name: "Practice Git commands",
    is_completed: false,
    category_id: 4
  },
  {
    id: 13,
    name: "Learning Shell Scripting",
    is_completed: false,
    category_id: 4
  }
];

// page names
const PAGE = {
  HOME: "home",
  TASK: "task"
}

/**
 * Gets all categories from localStorage and returns them.
 * If no categories exist in localStorage, stores the default categories
 * and returns them.
 *
 * @returns {Array} An array of category objects.
 */
const getCategories = () => {
  // get all categories from localStorage
  const categories = localStorage.getItem("categories");

  // return all categories from localStorage
  if (categories) return JSON.parse(categories);

  // store default categories to localStorage
  localStorage.setItem("categories", JSON.stringify(CATEGORIES));

  return CATEGORIES
}

/**
 * Gets all tasks from localStorage and returns them.
 * If no tasks exist in localStorage, stores the default tasks
 * and returns them.
 *
 * @returns {Array} An array of task objects.
 */
const getTasks = () => {
  const tasks = localStorage.getItem("tasks");

  // return all tasks from localStorage
  if (tasks) return JSON.parse(tasks);

  // store default tasks to localStorage
  localStorage.setItem("tasks", JSON.stringify(TASKS));

  return TASKS
}

// indexing category data by id
const categoryById = new Map(getCategories().map((category) => [category.id, category]));

/**
 * Updates the checkbox of a task with the given ID to visually indicate completion.
 *
 * @param {number} taskId - The ID of the task to update.
 * @param {boolean} [isCompleted=false] - Whether the task is completed.
 */
const updateTaskCheckboxCompletionUI = (taskId, isCompleted) => {
  const taskCheckboxElement = document.querySelector(`#task-checkbox-${taskId}`);
  if (!taskCheckboxElement) return;

  if (isCompleted) {
    taskCheckboxElement.checked = true;
  } else {
    taskCheckboxElement.checked = false;
  }
}

/**
 * Updates the label of a task with the given ID to visually indicate completion.
 *
 * @param {number} taskId - The ID of the task to update.
 * @param {boolean} [isCompleted=false] - Whether the task is completed.
 */
const updateTaskLabelCompletionUI = (taskId, isCompleted = false) => {
  const taskLabelElement = document.querySelector(`#task-label-${taskId}`);
  if (!taskLabelElement) return;

  if (isCompleted) {
    taskLabelElement.classList.add("line-through", "text-gray-400");
  } else {
    taskLabelElement.classList.remove("line-through", "text-gray-400");
  }
}

/**
 * Toggles the completion status of the task with the given ID.
 *
 * @param {number} taskId - The ID of the task to toggle.
 */
const toggleTaskCompletion = (taskId) => {
  const taskIndex = getTasks().findIndex((task) => task.id == taskId);
  if (taskIndex === -1) return;

  const tasks = getTasks();
  tasks[taskIndex].is_completed = !tasks[taskIndex].is_completed;
  localStorage.setItem("tasks", JSON.stringify(tasks));

  // update UI
  updateTaskCheckboxCompletionUI(taskId, tasks[taskIndex].is_completed);
  updateTaskLabelCompletionUI(taskId, tasks[taskIndex].is_completed);
}

const deleteTask = (taskId, categoryId) => {
  const taskIndex = getTasks().findIndex((task) => task.id == taskId);
  if (taskIndex === -1) return;

  const tasks = getTasks();
  tasks.splice(taskIndex, 1);

  // remove task from localStorage
  localStorage.setItem("tasks", JSON.stringify(tasks));

  // update UI - remove task
  const taskElement = document.querySelector(`#task-${taskId}`);
  taskElement.remove();

  // update UI - update task count
  const taskCount = document.querySelector("#category-task-count");
  const numOfTasks = tasks.filter((task) => task.category_id == categoryId).length;
  taskCount.innerText = numOfTasks > 1 ? `${numOfTasks} tasks` : `${numOfTasks} task`;
}

/**
 * Creates a DOM element for a given category.
 *
 * This function generates a clickable category element with an image, name,
 * and the total number of tasks associated with the category. The element has
 * specific styling and transition effects for hover interactions.
 *
 * @param {Object} category - The category object containing id, name, and img properties.
 * @returns {HTMLElement} The DOM element representing the category.
 */
const getCategoryElement = (category, numOfTasks = 0) => {
  const categoryElement = document.createElement("div")
  categoryElement.id = `category-${category.id}`
  categoryElement.classList.add("px-4", "py-5", "flex", "items-center", "gap-x-4", "bg-white", "cursor-pointer", "shadow-lg", "rounded-md", "transition-all", "hover:-translate-y-1", "hover:shadow-xl")
  categoryElement.innerHTML = `
    <img src="${category.img}" alt="${category.name}" class="w-12" />
    <div class="flex-1">
      <h1 class="text-xl font-bold">${category.name}</h1>
      <p class="text-sm text-gray-400">${numOfTasks} tasks</p>
    </div>
  `;

  // open the Tasks Screen displaying the list of tasks in the category
  categoryElement.addEventListener("click", () => {
    showTasksScreen();
    hideHomeScreen();
    renderTasks(category.id);
    reduceScreenBackdrop();
    showAddTaskButton();

    // add query param in the current URL
    const url = new URL(window.location.href);
    url.searchParams.set("page", PAGE.TASK);
    url.searchParams.set("category-id", category.id);
    history.pushState(null, null, url);
  })

  return categoryElement;
}

/**
 * Render the welcoming message on the page.
 *
 * This function renders the welcoming message based on the `myname` and
 * the total number of tasks.
 *
 * @returns {void}
 */
const renderWelcomingMessage = () => {
  const tasks = getTasks();
  const welcomeMessage = document.querySelector("#welcome-message");

  welcomeMessage.innerHTML = `
    <h1 class="text-2xl font-bold">Hello <span id="username">${myname}</span></h1>
    <p class="text-sm">Today you have <span id="task-count">${tasks.length} task</span></p>
  `;
}

/**
 * Render all categories on the page.
 *
 * This function renders all categories on the page and appends them to the
 * element with the id of "categories".
 *
 * @returns {void}
 */
const renderCategories = () => {
  const categoriesContainer = document.querySelector("#categories");

  // group tasks by category
  const tasksPerCategory = new Map();
  getTasks().forEach((task) => {
    const category = categoryById.get(task.category_id);

    if (category) {
      const tasks = tasksPerCategory.get(category.id) || [];
      tasks.push(task);
      tasksPerCategory.set(category.id, tasks);
    }
  });

  getCategories().forEach((category) => {
    const categoryElement = getCategoryElement(category, tasksPerCategory.get(category.id)?.length);
    categoriesContainer.appendChild(categoryElement);
  });
}

const showHomeScreen = () => {
  const welcomeSection = document.querySelector("#welcome-section");
  const categories = document.querySelector("#categories");
  welcomeSection.classList.remove("hidden");
  categories.classList.remove("hidden");

  const categoriesContainer = document.querySelector("#categories");
  categoriesContainer.innerHTML = "";
}

const hideHomeScreen = () => {
  const welcomeSection = document.querySelector("#welcome-section");
  const categories = document.querySelector("#categories");
  welcomeSection.classList.add("hidden");
  categories.classList.add("hidden");
}

const showTasksScreen = () => {
  const tasksHeader = document.querySelector("#tasks-header");
  const tasksContainer = document.querySelector("#tasks-container");
  tasksHeader.classList.remove("hidden");
  tasksContainer.classList.remove("hidden");
}

const hideTasksScreen = () => {
  const tasksHeader = document.querySelector("#tasks-header");
  const tasksContainer = document.querySelector("#tasks-container");
  tasksHeader.classList.add("hidden");
  tasksContainer.classList.add("hidden");
}

const getTaskElement = (task) => {
  const taskElement = document.createElement("div");
  taskElement.id = `task-${task.id}`;
  taskElement.classList.add("task", "flex", "items-center", "gap-x-3", "p-1");

  // checkbox
  const inputElement = document.createElement("input");
  inputElement.type = "checkbox";
  inputElement.id = `task-checkbox-${task.id}`
  inputElement.classList.add("cursor-pointer");
  inputElement.checked = task.is_completed;
  inputElement.addEventListener("change", () => {
    toggleTaskCompletion(task.id);
  });

  // label (task name)
  const labelElement = document.createElement("label");
  labelElement.textContent = task.name;
  labelElement.id = `task-label-${task.id}`
  labelElement.classList.add("flex-1", "text-sm", "cursor-pointer");
  if (task.is_completed) {
    labelElement.classList.add("line-through", "text-gray-400");
  }
  labelElement.addEventListener("click", () => {
    toggleTaskCompletion(task.id);
  });

  // delete button
  const deleteElement = document.createElement("div");
  deleteElement.classList.add("delete-task", "cursor-pointer", "bg-slate-50", "rounded-full", "p-2");
  deleteElement.innerHTML = `
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke-width="1.5"
      stroke="currentColor"
      class="w-4 h-4"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
      />
    </svg>
  `;
  deleteElement.addEventListener("click", () => {
    deleteTask(task.id, task.category_id);
  });

  taskElement.appendChild(inputElement);
  taskElement.appendChild(labelElement);
  taskElement.appendChild(deleteElement);

  return taskElement;
}

const renderTasks = (categoryId) => {
  const category = getCategories().find((category) => category.id == categoryId);

  // category not found
  if (!category) return;

  const tasks = getTasks().filter((task) => task.category_id == category.id);

  // tasks not found
  if (!tasks) return;

  // render tasks header
  const tasksHeader = document.querySelector("#tasks-header");

  const taskCount = tasks.length > 1 ? `${tasks.length} tasks` : `${tasks.length} task`;

  tasksHeader.innerHTML = `
    <img src="${category.img}" alt="${category.name}" class="w-12" />
    <div class="flex-1">
      <p id="category-task-count" class="text-sm text-gray-400">${taskCount}</p>
      <h1 class="text-xl font-bold">${category.name}</h1>
    </div>
  `;

  // render tasks container
  const tasksContainer = document.querySelector("#tasks-container");
  tasksContainer.innerHTML = "";
  tasks.forEach((task) => {
    const taskElement = getTaskElement(task);
    tasksContainer.appendChild(taskElement);
  });
}

const resetScreenBackdrop = () => {
  const screenBackdrop = document.querySelector("#screen-backdrop");
  screenBackdrop.classList.remove("w-[110%]", "h-40");
  screenBackdrop.classList.add("w-[135%]", "h-80");
}

const reduceScreenBackdrop = () => {
  const screenBackdrop = document.querySelector("#screen-backdrop");
  screenBackdrop.classList.remove("w-[135%]", "h-80");
  screenBackdrop.classList.add("w-[110%]", "h-40");
}

const showAddTaskButton = () => {
  const addTaskButton = document.querySelector("#add-task-button");
  addTaskButton.classList.remove("hidden");
}

const hideAddTaskButton = () => {
  const addTaskButton = document.querySelector("#add-task-button");
  addTaskButton.classList.add("hidden");
}

/**
 * Renders the appropriate screen based on the current page and category ID.
 * 
 * This function checks query parameters to determine the page and category ID.
 * Depending on the page, it will display the home screen with welcoming message
 * and categories, or the task screen with tasks for the selected category.
 * It also adjusts the screen backdrop size accordingly.
 *
 * - On the home page, it shows the home screen, renders the welcoming message,
 *   categories, and resets the screen backdrop.
 * - On the task page, it hides the home screen, renders tasks for the given category,
 *   and reduces the screen backdrop.
 */
const render = () =>  {
  const queryParams = new URLSearchParams(window.location.search);
  const page = queryParams.get("page") || PAGE.HOME;
  const categoryId = queryParams.get("category-id") || null;

  switch (page) {
    case PAGE.HOME:
      hideTasksScreen();
      showHomeScreen();
      renderWelcomingMessage();
      renderCategories();
      resetScreenBackdrop();
      hideAddTaskButton();
      break;

    case PAGE.TASK:
      hideHomeScreen();
      renderTasks(categoryId);
      reduceScreenBackdrop();
      showAddTaskButton();
      break;

    default:
      break;
  }
}

// rerender when the browser/device back button is clicked
window.addEventListener("popstate", () => {
  render();
});

render();

const showAddTaskForm = () => {
  const addTaskForm = document.querySelector("#add-task-form");
  addTaskForm.classList.remove("bottom-[-50%]");
  addTaskForm.classList.add("bottom-0");
}

const hideAddTaskForm = () => {
  const addTaskForm = document.querySelector("#add-task-form");
  addTaskForm.classList.remove("bottom-0");
  addTaskForm.classList.add("bottom-[-50%]");
}

const showBlackOverlay = () => {
  const blackOverlay = document.querySelector("#black-overlay");
  blackOverlay.classList.remove("hidden");
}

const hideBlackOverlay = () => {
  const blackOverlay = document.querySelector("#black-overlay");
  blackOverlay.classList.add("hidden");
}

const addTaskButton = document.querySelector("#add-task-button");
addTaskButton.addEventListener("click", () => {
  showAddTaskForm();
  showBlackOverlay();
})

const cancelButton = document.querySelector("#cancel-button");
cancelButton.addEventListener("click", () => {
  hideAddTaskForm();
  hideBlackOverlay();
})