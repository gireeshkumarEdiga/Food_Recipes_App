const Recipes = require("../Models/Recipe");
const multer = require("multer");

const storage = multer.diskStorage({
    destination : (req,file,cb) => {
        cb(null,"./public/images");
    },
    filename : (req, file, cb) => {
        const filename = Date.now() + "-" + file.originalname
        cb(null, filename);
    }
});

const upload = multer({ storage });

const RecipeControllerHandler = async (req,res) => {

    const MEASURE = req.body.MEASURE;
    const TITLE = req.body.TITLE;
    const INGREDIENTS = req.body.INGREDIENTS;
    const INSTRUCTIONS = req.body.INSTRUCTIONS;
    const TIME = req.body.TIME;
    const COVERIMAGE = req.body.COVERIMAGE;
    const RECIPE_ID = req.body.RECIPE_ID;
    const FILED_NAME = req.body.FILED_NAME;
    const UPDATED_FILED_VALUE = req.body.UPDATED_FILED_VALUE;
    
    if(MEASURE == "GET_RECIPES_LIST"){

        const isRecipeList = await Recipes.find();

        if(isRecipeList){
            res.send({
                Message : "Recipes List",
                Success : true,
                Data : isRecipeList 
            });
        }else{
            res.send({
                Message : "Recipes List Not Found",
                Success : false
            });
        }

    }

    if(MEASURE == "ADD_RECIPE_INTO_LIST"){

        await Recipes.create({
            title : TITLE,
            ingredients : INGREDIENTS,
            instructions : INSTRUCTIONS,
            time : TIME,
            coverImage : COVERIMAGE
            // "TITLE" : "MUTTON_BIRYANI",
            // "INGREDIENTS" : ["Mutton","Masala","Vegetables"],
            // "INSTRUCTIONS" : "Follow Youtube",
            // "TIME" : "Evening",
            // "COVERIMAGE" : "biryani.png"
        });

        const isRecipeList = await Recipes.find();

        if(isRecipeList){
            res.send({
                Message : "Recipes List",
                Success : true,
                Data : isRecipeList 
            });
        }else{
            res.send({
                Message : "Recipes List Not Found",
                Success : false
            });
        }

    }

    if(MEASURE == "GET_RECIPES_LIST_BY_ID"){

        const isRecipeList = await Recipes.findOne({_id : RECIPE_ID});

        if(isRecipeList){
            res.send({
                Message : "Recipes List Found By Id",
                Success : true,
                Data : isRecipeList
            });
        }else{
            res.send({
                Message : "List Not Found",
                Success : false
            });
        }

    }

    if(MEASURE == "EDIT_RECIPE_FROM_LIST_BY_ID"){

        await Recipes.updateOne({ _id : RECIPE_ID},{[FILED_NAME] : UPDATED_FILED_VALUE},{new : true, runValidators: true});

        const isRecipeList = await Recipes.find();
        
        if(isRecipeList){
            res.send({
                Message : "Recipes List Updated",
                Success : true,
                Data : isRecipeList 
            });
        }else{
            res.send({
                Message : "Recipes List Not Found",
                Success : false
            });
        }



    }

    if(MEASURE == "DELETE_RECIPE_FROM_LIST"){

        await Recipes.deleteOne({_id : RECIPE_ID});

        const isRecipeList = await Recipes.find();

        if(isRecipeList){
            res.send({
                Message : "Recipes List",
                Success : true,
                Data : isRecipeList 
            });
        }else{
            res.send({
                Message : "Recipes List Not Found",
                Success : false
            });
        }

    }

}

module.exports = {
    RecipeControllerHandler,
    upload
}