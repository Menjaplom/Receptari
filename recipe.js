class Recipe {
    constructor(name) {
        let path = "http://127.0.0.1:5500/recipes/" + name.trim().toLowerCase().replace(" ", "_") + ".json";
        console.log(path);
        let data = fetch(path)
            .then((res) => {
                if (!res.ok) {
                    throw new Error
                        (`HTTP error! Status: ${res.status}`);
                }
                return res.json();
            })
            .catch((error) =>
                console.error("Unable to fetch data:", error));
        
        self.name = data.title;
        self.image = data.image;
        self.category = data.category;
        self.tags = data.tags;
        self.recipe_yield = data.recipeYield;
        self.prep_time = data.prep_time;
        // TODO: ADD THE REST OF FIELDS

    }
}