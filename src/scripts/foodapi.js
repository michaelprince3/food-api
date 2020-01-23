// fetch("http://localhost:8088/food")
//     .then(foods => foods.json())
//     .then(parsedFoods => {
//         console.table(parsedFoods)
//     })

    fetch("http://localhost:8088/food")
    .then(foods => foods.json())
    .then(parsedFoods => {
        parsedFoods.forEach(food => {
           
            fetch(`https://world.openfoodfacts.org/api/v0/product/${food.barcode}.json`)
                .then(response => response.json())
                .then(productInfo => {
                    if (productInfo.product.ingredients_text) {
                      food.ingredients = productInfo.product.ingredients_text
                    } else {
                      food.ingredients = "no ingredients listed"
                    }
                    if (productInfo.product.countries) {
                        food.country = productInfo.product.countries
                    } else {
                        food.country = "no country listed"
                    }
                    if (productInfo.product.nutriments.energy_value) {
                        food.calorie = productInfo.product.nutriments.energy_value
                    } else {
                        food.calorie = "no calories listed"
                    }
                    if (productInfo.product.nutriments.fat_value) {
                        food.fat = productInfo.product.nutriments.fat_value
                    } else {
                        food.fat = "no fat listed"
                    }
                    if (productInfo.product.nutriments.sugars_value) {
                        food.sugar = productInfo.product.nutriments.sugars_value
                    } else {
                        food.sugar = "no sugar listed"
                    }
                    console.log(productInfo.product.nutriments.sugar_serving)
                    const foodsHTML = foodFactory(food)
                    addFoodToDom(foodsHTML)
                })
        })
    })

    const foodFactory = (food) => {
        return `
        <section class="foodItem">
          <h2>${food.name}</h2>
          <p>Ethnicity: ${food.ethnicity}</p>
          <p>Category: ${food.category}</p>
          <p>Ingredients: ${food.ingredients}</p>
          <p>Country: ${food.country}</p>
          <p>Calorie: ${food.calorie}</p>
          <p>Fat: ${food.fat}</p>
          <p>Sugar: ${food.sugar}</p>          
        </section>
        `
    }

    const addFoodToDom = (food) => {
        const foodContainer = document.querySelector(".foodList")
        foodContainer.innerHTML += (food)

    }