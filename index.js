class Recipe {
  constructor(name, ingredientsList, cookingDescription, cookingTime) {
    this.name = name;
    this.ingredientsList = ingredientsList.map((el) => `${el}`.toLowerCase());
    this.cookingDescription = cookingDescription;
    this.cookingTime = +cookingTime;
  }

  isValid() {
    const nameCheck = !this.name?.trim();
    const ingredientsListCheck =
      !Array.isArray(this.ingredientsList) ||
      this.ingredientsList.length === 0 ||
      !this.ingredientsList.every((current) => current && isNaN(current));

    const cookingDescriptionCheck = !this.cookingDescription?.trim();
    const cookingTimeCheck = !this.cookingTime || this.cookingTime <= 0;
    if (
      nameCheck ||
      ingredientsListCheck ||
      cookingDescriptionCheck ||
      cookingTimeCheck
    ) {
      return false;
    }
    return true;
  }
}

class BookOfRecipe {
  #recipeList = [];
  addRecipe(recipe) {
    if (recipe instanceof Recipe && recipe.isValid())
      this.#recipeList.push(recipe);
  }
  getRecipeList() {
    return this.#recipeList;
  }
  findRecipeByTime(inputNum) {
    if (Number.isFinite(inputNum) && inputNum > 0)
      return this.#recipeList.filter(
        (recipe) => recipe.cookingTime <= inputNum
      );
  }

  findRecipeByIngredients(inputIngr) {
    if (!Array.isArray(inputIngr) || inputIngr.length === 0) {
      return [];
    }
    return this.#recipeList.filter((recipe) =>
      inputIngr.every((e) => recipe.ingredientsList.includes(e.toLowerCase()))
    );
  }
}

const Chops = new Recipe(
  "Chops",
  ["Цукор", "сіль"],
  "не містить ні картоплі, ні моркви",
  "30"
);
const StrawberryPie = new Recipe(
  "Strawberry pie",
  ["Картопля", "сіль"],
  "містить картоплю, не містить моркву",
  "60"
);
const Pancakes = new Recipe(
  "Pancakes",
  ["картопля", "морква"],
  "містить і картоплю, і моркву",
  "120"
);
const Bread = new Recipe("Bread", [], "невалідний", "30");
const Bread1 = new Recipe("Bread", ["картопля"], "невалідний", "0");
const Pie = new Recipe(
  "Pie",
  ["картопля", "морква", "сіль"],
  "містить і картоплю, і моркву",
  "120"
);

const Book = new BookOfRecipe();
const recipeList = [Chops, StrawberryPie, Pancakes, Bread, Bread1, Pie];
recipeList.forEach((recipe) => Book.addRecipe(recipe));

console.log(Book.getRecipeList());

console.log(
  Book.findRecipeByTime(60)
    .map((recipe) => recipe.name)
    .join(", ") + " - можна приготувати за цей час"
);

console.log(
  Book.findRecipeByIngredients(["картопля", "морква"])
    .map((recipe) => recipe.name)
    .join(", ") + " - рецепти які містять всі вказані інгрідієнти"
);
