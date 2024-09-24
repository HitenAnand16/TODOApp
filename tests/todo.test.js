const { test, expect } = require("@playwright/test");

test.describe("To-Do List App", () => {
  // Runs before each test case
  test.beforeEach(async ({ page }) => {
    // Navigate to the app's web version (e.g., running on localhost)
    await page.goto("http://localhost:19006"); // Update with your correct local URL if different
  });

  // Test case for adding tasks
  test("should add a new task", async ({ page }) => {
    // Select the input field for task entry
    const taskInput = page.locator('input[placeholder="Add a new task"]');
    const addButton = page.locator('button:has-text("Add Task")');

    // Enter a new task
    await taskInput.fill("Buy groceries");
    await addButton.click();

    // Verify if the task was added
    const taskText = await page.locator("text=Buy groceries");
    await expect(taskText).toBeVisible();
  });

  // Test case for deleting tasks
  test("should delete a task", async ({ page }) => {
    // Assuming a task "Buy groceries" was already added

    // Locate the delete button next to the task (adjust the locator to match your UI)
    const deleteButton = page.locator('button:has-text("Delete")').first();

    // Click the delete button
    await deleteButton.click();

    // Verify if the task was deleted
    const taskText = page.locator("text=Buy groceries");
    await expect(taskText).not.toBeVisible();
  });

  // Test case for marking tasks as complete
  test("should mark a task as complete", async ({ page }) => {
    // Assuming a task "Buy groceries" was already added
    const taskText = page.locator("text=Buy groceries");

    // Click the task to mark it as complete
    await taskText.click();

    // Verify if the task is marked as complete (crossed out or class change)
    await expect(taskText).toHaveClass(/completedTask/); // Adjust the class name as per your app's CSS
  });

  // Test case for marking a completed task as incomplete
  test("should mark a completed task as incomplete", async ({ page }) => {
    // Assuming the task is already marked as complete
    const taskText = page.locator("text=Buy groceries");

    // Click the task to mark it as incomplete
    await taskText.click();

    // Verify if the task is now marked as incomplete
    await expect(taskText).not.toHaveClass(/completedTask/); // Adjust the class name as per your app's CSS
  });
});
