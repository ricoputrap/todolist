// ==================== DEFAULT DATA ==================== //
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

// ==================== CONSTANTS ==================== //
// page names
const PAGE = {
  HOME: "home",
  TASK: "task"
}

const ENUM_SCREEN_ID = {
  [PAGE.HOME]: "home-screen",
  [PAGE.TASK]: "task-screen"
}

const SCREEN_IDS = [
  ENUM_SCREEN_ID[PAGE.HOME],
  ENUM_SCREEN_ID[PAGE.TASK]
]

// ==================== DATA GETTERS ==================== //

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

// ==================== DATA STORES ==================== //

const userStore = {
  name: "You",
}

const categoryStore = {
  categories: getCategories(),
  categoryById: new Map(getCategories().map((category) => [category.id, category])),
  addCategory: (category) => {},
  editCategory: (id, category) => {},
  deleteCategory: (id) => {}
}

const taskStore = {
  tasks: getTasks(),
  addTask: (name, categoryId) => {
    const newTask = {
      id: taskStore.tasks.length + 1,
      name: name,
      is_completed: false,
      category_id: categoryId
    }

    // update task store
    taskStore.tasks.push(newTask);

    // update local storage
    localStorage.setItem("tasks", JSON.stringify(taskStore.tasks));
  },
  /**
   * Toggles the completion status of the task with the given id.
   *
   * @param {number} id - The ID of the task to toggle.
   * @returns {boolean} The new completion status of the task.
   */
  toggleCompletion: (id) => {
    const taskIndex = taskStore.tasks.findIndex((task) => task.id == id);

    // task not found
    if (taskIndex === -1) return false;

    // update task store
    taskStore.tasks[taskIndex].is_completed = !taskStore.tasks[taskIndex].is_completed;

    // update local storage
    localStorage.setItem("tasks", JSON.stringify(taskStore.tasks));

    return taskStore.tasks[taskIndex].is_completed;
  },
/**
 * Deletes a task with the given ID from the task store.
 *
 * This function removes the task with the specified ID from the task store
 * and updates the local storage to reflect the changes.
 *
 * @param {number} id - The ID of the task to be deleted.
 */
  deleteTask: (id) => {
    const taskIndex = taskStore.tasks.findIndex((task) => task.id == id);

    // update task store
    taskStore.tasks.splice(taskIndex, 1);

    // update local storage
    localStorage.setItem("tasks", JSON.stringify(taskStore.tasks));
  }
}

// ==================== ELEMENTS SHOW/HIDE FUNCTIONS ==================== //
const hideOtherScreens = (screenId) => {
  for (const screen of SCREEN_IDS) {
    if (screen !== screenId) {
      const element = document.querySelector(`#${screen}`);
      element.classList.add("hidden");
    }
  }
}

const showHomeScreen = () => {
  hideOtherScreens(ENUM_SCREEN_ID[PAGE.HOME]);

  const homeScreen = document.querySelector("#home-screen");
  homeScreen.classList.remove("hidden");
}

const showTaskScreen = () => {
  hideOtherScreens(ENUM_SCREEN_ID[PAGE.TASK]);

  const taskScreen = document.querySelector("#task-screen");
  taskScreen.classList.remove("hidden");
}

/**
 * Shows the back button in top bar.
 *
 * This function is used to show the back button that is used to navigate back
 * to the home screen. It removes the "hidden" class from the element with the
 * id of "back-btn".
 */
const showBackButton = () => {
  const backButton = document.querySelector("#back-btn");
  backButton.classList.remove("hidden");
}

/**
 * Hides the back button in top bar.
 *
 * This function is used to hide the back button that is used to navigate back
 * to the home screen. It adds the "hidden" class to the element with the
 * id of "back-btn".
 */
const hideBackButton = () => {
  const backButton = document.querySelector("#back-btn");
  backButton.classList.add("hidden");
}

// ==================== DOM MODIFIERS ==================== //

/**
 * Reduces the size of the screen backdrop.
 *
 * The screen backdrop is an absolute positioned div that is used to create a
 * visual effect when the user navigates to a different screen. This function
 * reduces the size of the backdrop to indicate that the user is viewing a
 * sub-screen (e.g. task screen).
 */
const reduceScreenBackdrop = () => {
  const screenBackdrop = document.querySelector("#screen-backdrop");
  screenBackdrop.classList.remove("w-[135%]", "h-80");
  screenBackdrop.classList.add("w-[110%]", "h-40");
}

/**
 * Resets the size of the screen backdrop.
 *
 * This function is used to reset the size of the backdrop to its original size
 * when the user navigates back to the home screen. It is called after the user
 * navigates away from a sub-screen (e.g. task screen).
 */
const resetScreenBackdrop = () => {
  const screenBackdrop = document.querySelector("#screen-backdrop");
  screenBackdrop.classList.remove("w-[110%]", "h-40");
  screenBackdrop.classList.add("w-[135%]", "h-80");
}


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

const deleteTaskUI = (taskId) => {
  const taskElement = document.querySelector(`#task-${taskId}`);
  taskElement.remove();
}

const updateTaskCount = (categoryId) => {
  const taskCount = document.querySelector("#category-task-count");
  const numOfTasks = taskStore.tasks.filter((task) => task.category_id == categoryId).length;
  taskCount.innerText = numOfTasks > 1 ? `${numOfTasks} tasks` : `${numOfTasks} task`;
}

const resetAddTaskForm = () => {
  const taskInput = document.querySelector("#task-input");
  taskInput.value = "";

  const categoryInput = document.querySelector("#category-input");
  categoryInput.value = "";
}

// ==================== EVENT HANDLERS ==================== //

/**
 * Handles the event when a category item in Home SCreen is clicked.
 *
 * This function is used as an event handler for category elements. When a
 * category element is clicked, it hides the home screen, shows the task screen
 * with the tasks for the selected category, shows the back button, and reduces
 * the size of the screen backdrop. It also updates the URL with query
 * parameters to reflect the current page and category ID.
 *
 * @param {number} id - The ID of the category that was clicked.
 */
const onCategoryClick = (id) => {
  showTaskScreen();
  showBackButton();

  // screen backdrop's position should be moved slightly up
  reduceScreenBackdrop();

  // render task items
  renderTasks(id);

  // push new history state with query params
  pushHistory({ page: PAGE.TASK, categoryId: id });
}

const onBackBtnClick = () => {
  showHomeScreen();
  renderWelcomingMessage();
  renderCategories();
  resetScreenBackdrop();
  hideBackButton();

  // push new history state with query params
  pushHistory({ page: PAGE.HOME });
}

const onAddTaskBtnClick = () => {
  showAddTaskForm();
  showBlackOverlay();
}

const onCancelBtnClick = () => {
  hideAddTaskForm();
  hideBlackOverlay();
}

const onAddBtnClick = () => {
  addTask();
  hideAddTaskForm();
  hideBlackOverlay();
}

/**
 * Toggles the completion status of the task with the given ID.
 *
 * @param {number} taskId - The ID of the task to toggle.
 */
const toggleTaskCompletion = (taskId) => {
  // update task data
  const isCompleted = taskStore.toggleCompletion(taskId);

  // update UI
  updateTaskCheckboxCompletionUI(taskId, isCompleted);
  updateTaskLabelCompletionUI(taskId, isCompleted);
}

/**
 * Deletes the task with the given ID and updates the UI accordingly.
 *
 * This function calls the taskStore's deleteTask method to remove the task from
 * the task store. It then updates the UI by removing the task element and
 * updating the task count for the category.
 *
 * @param {number} taskId - The ID of the task to delete.
 * @param {number} categoryId - The ID of the category the task belongs to.
 */
const deleteTask = (taskId, categoryId) => {
  // delete task data
  taskStore.deleteTask(taskId);

  // update UI
  deleteTaskUI(taskId);
  updateTaskCount(categoryId);
}

/**
 * Adds a new task with the given name and category ID, updates the task store,
 * resets the add task form, and rerenders the UI based on the current active
 * screen.
 */
const addTask = () => {
  // read the form data
  const taskInput = document.querySelector("#task-input");
  const categoryInput = document.querySelector("#category-input");

  // add task data
  taskStore.addTask(taskInput.value, Number(categoryInput.value));

  // update UI
  resetAddTaskForm();

  // rerender UI based on the current active screen
  const { page, categoryId } = getQueryParams();
  switch (page) {
    case PAGE.HOME:
      renderCategories();
      break;

    case PAGE.TASK:
      renderTasks(categoryId);
      break;

    default:
      break;
  }
}


// ==================== COMPONENTS ==================== //
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
const createCategoryElement = (category, numOfTasks = 0) => {
  const taskCount = numOfTasks > 1
    ? `${numOfTasks} tasks`
    : `${numOfTasks} task`;

  // define category DOM element
  const categoryElement = document.createElement("div")
  categoryElement.id = `category-${category.id}`

  categoryElement.classList.add(
    "px-4", "py-5", "flex", "items-center", "gap-x-4", "bg-white",
    "cursor-pointer", "shadow-lg", "rounded-md", "transition-all",
    "hover:-translate-y-1", "hover:shadow-xl"
  );

  categoryElement.innerHTML = `
    <img src="${category.img}" alt="${category.name}" class="w-12" />
    <div class="flex-1">
      <h1 class="text-xl font-bold">${category.name}</h1>
      <p class="text-sm text-gray-400">${taskCount}</p>
    </div>
  `;

  // open the Tasks Screen displaying the list of tasks in the category
  categoryElement.addEventListener("click", () => {
    onCategoryClick(category.id);
  });

  return categoryElement;
}

const createTaskElement = (task) => {
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

  // apply line-through and text-gray-400 on the label if task is completed
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

// ==================== DOM RENDERERS ==================== //
/**
 * Render the welcoming message on the home screen.
 *
 * This function renders the welcoming message based on the `userStore.name` and
 * the total number of tasks.
 *
 * @returns {void}
 */
const renderWelcomingMessage = () => {
  const tasks = taskStore.tasks;
  const welcomeMessage = document.querySelector("#welcome-message");

  welcomeMessage.innerHTML = `
    <h1 class="text-2xl font-bold">Hello
      <span id="username">${userStore.name}</span>
    </h1>
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
  categoriesContainer.innerHTML = "";

  // group tasks by category
  const tasksPerCategory = new Map();
  taskStore.tasks.forEach((task) => {
    const category = categoryStore.categoryById.get(task.category_id);

    // category not found
    if (!category) return;

    const tasks = tasksPerCategory.get(category.id) || [];
    tasks.push(task);
    tasksPerCategory.set(category.id, tasks);
  });

  // render categories
  categoryStore.categories.forEach((category) => {
    const categoryElement = createCategoryElement(category, tasksPerCategory.get(category.id)?.length);
    categoriesContainer.appendChild(categoryElement);
  });
}

/**
 * Renders tasks for a specific category on the task screen.
 *
 * This function retrieves the category by its ID and filters tasks
 * associated with that category. It updates the task header and
 * task container in the DOM with the relevant category image, name,
 * and list of tasks. If the category or tasks are not found, the function
 * exits early without making changes to the DOM.
 *
 * @param {number} categoryId - The ID of the category for which tasks should be rendered.
 * @returns {void}
 */

const renderTasks = (categoryId) => {
  const category = categoryStore.categoryById.get(categoryId);

  // category not found
  if (!category) return;

  const tasks = taskStore.tasks.filter((task) => task.category_id == category.id);

  // TODO show empty state on the UI
  // tasks not found
  if (!tasks || tasks.length == 0) return;

  // render tasks header
  const tasksHeader = document.querySelector("#tasks-header");

  const taskCount = tasks.length > 1
    ? `${tasks.length} tasks`
    : `${tasks.length} task`;

  // define task header DOM
  tasksHeader.innerHTML = `
    <img src="${category.img}" alt="${category.name}" class="w-12" />
    <div class="flex-1">
      <p id="category-task-count" class="text-sm text-gray-400">
        ${taskCount}
      </p>
      <h1 class="text-xl font-bold">${category.name}</h1>
    </div>
  `;

  // render tasks container
  const tasksContainer = document.querySelector("#tasks-container");
  tasksContainer.innerHTML = "";
  tasks.forEach((task) => {
    const taskElement = createTaskElement(task);
    tasksContainer.appendChild(taskElement);
  });
}

/**
 * Displays the Add Task form by adjusting its position on the screen.
 *
 * This function modifies the CSS class of the Add Task form element
 * to smoothly transition it into view from its hidden state at the bottom
 * of the screen.
 */

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

// ==================== UTILS ==================== //

/**
 * Retrieves the current page and category ID from the URL query parameters.
 *
 * This function parses the URL search parameters to determine the current
 * page and category being viewed. If the "page" parameter is not present,
 * it defaults to the home page. If the "category-id" parameter is not present,
 * it defaults to null.
 *
 * @returns {Object} An object containing the `page` and `categoryId` properties.
 */
const getQueryParams = () => {
  const queryParams = new URLSearchParams(window.location.search);
  const page = queryParams.get("page") || PAGE.HOME;
  const categoryId = queryParams.get("category-id") || null;

  return { page, categoryId }
}

/**
 * Updates the browser history state with the specified page and category ID.
 *
 * This function modifies the current URL's query parameters to reflect the
 * given page and category ID. It then pushes this new state to the browser's
 * history without reloading the page.
 *
 * @param {Object} params - The parameters to update in the history state.
 * @param {string} params.page - The page identifier to set in the query parameters.
 * @param {string|null} [params.categoryId=null] - The category ID to set in the query parameters.
 */
const pushHistory = ({ page, categoryId = null }) => {
  const url = new URL(window.location.href);
  url.searchParams.set("page", page);
  url.searchParams.set("category-id", categoryId);
  history.pushState(null, null, url);
}

const render = () => {
  const { page, categoryId } = getQueryParams();

  switch (page) {
    case PAGE.HOME:
      showHomeScreen();
      renderWelcomingMessage();
      renderCategories();
      resetScreenBackdrop();
      hideBackButton();
      break;

    case PAGE.TASK:
      showTaskScreen();
      if (categoryId == null) {
        alert("ERROR: Tasks for this category is not found.");
      }
      renderTasks(categoryId);
      reduceScreenBackdrop();
      showBackButton();
      break;

    default:
      break;
  }
}

const setEventListeners = () => {
  // Add Task Button
  const addTaskButton = document.querySelector("#add-task-button");
  addTaskButton.addEventListener("click", () => {
    onAddTaskBtnClick();
  });

  // Cancel Button in the Add Task Form
  const cancelButton = document.querySelector("#cancel-button");
  cancelButton.addEventListener("click", () => {
    onCancelBtnClick();
  });

  // Add Button in the Add Task Form
  const addButton = document.querySelector("#add-button");
  addButton.addEventListener("click", () => {
    onAddBtnClick();
  });

  // Back Button in the Top Bar
  const backBtnElement = document.querySelector("#back-btn");
  backBtnElement.addEventListener("click", () => {
    onBackBtnClick();
  })
}

// rerender when the browser/device back button is clicked
window.addEventListener("popstate", () => {
  render();
});

// render on page load
setEventListeners();
render();