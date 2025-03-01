const myname = "Rico"

const username = document.querySelector("#username")
username.textContent = myname

const categories = [
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

const tasks = [
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
    name: "Attend yoga class",
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
  }
];

// indexing category data by id
const categoryById = new Map(categories.map((category) => [category.id, category]));

// calculate total tasks per category
const totalTaskPerCategory = new Map();
tasks.forEach((task) => {
  const category = categoryById.get(task.category_id);

  if (category) {
    const count = totalTaskPerCategory.get(category) || 0;
    totalTaskPerCategory.set(category, count + 1);
  }
});

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

const getCategoryElement = (category) => {
  const categoryElement = document.createElement("div")
  categoryElement.id = `category-${category.id}`
  categoryElement.classList.add("px-4", "py-5", "flex", "items-center", "gap-x-4", "bg-white", "cursor-pointer", "shadow-lg", "rounded-md", "transition-all", "hover:-translate-y-1", "hover:shadow-xl")
  categoryElement.innerHTML = `
    <img src="${category.img}" alt="${category.name}" class="w-12" />
    <div class="flex-1">
      <h1 class="text-xl font-bold">${category.name}</h1>
      <p class="text-sm text-gray-400">${totalTaskPerCategory.get(category) || 0} tasks</p>
    </div>
  `;

  // set click listener
  categoryElement.addEventListener("click", () => {
    console.log("Category clicked:", category.name);
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

  categories.forEach((category) => {
    const categoryElement = getCategoryElement(category);
    categoriesContainer.appendChild(categoryElement);
  });
}

// render elements
renderWelcomingMessage();
renderCategories();
