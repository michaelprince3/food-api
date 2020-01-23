fetch("http://localhost:8088/food")
    .then(foods => foods.json())
    .then(parsedFoods => {
        console.table(parsedFoods)
    })

    fetch("http://localhost:8088/food")
    .then(foods => foods.json())
    .then(parsedFoods => {
        parsedFoods.forEach(food => {
            const foodAsHTML = foodFactory(food)
            addFoodToDom(foodAsHTML)
        })
    })

    const foodFactory = (food) => {
        return `
        <section class="foodItem">
          <h2>${food.name}</h2>
          <p>${food.ethnicity}</p>
          <p>${food.category}</p>
        </section>
        `
    }

    const addFoodToDom = (food) => {
        const foodContainer = document.querySelector(".foodList")
        foodContainer.innerHTML += (food)

    }