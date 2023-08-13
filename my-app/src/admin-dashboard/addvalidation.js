function AddValidation(values){
    let error ={}

    if(values.name===""){
        error.name="Name should not be empty"
    }

    if(values.description===""){
        error.description="Description should not be empty"
    }
    
    if(values.price === ""){
        error.price='Price should not be empty'
    }

    if(values.nr_in_stock ===""){
        error.nr_in_stock ="Number in stock should not be empty"
    }
    
    if(values.nr_of_stars ===""){
        error.nr_of_stars ="Number of stars should not be empty"
    }
    if(values.category ===""){
        error.category ="Category should not be empty"
    }
    if(values.price_before_discount ===""){
        error.price_before_discount ="Price before discount should not be empty"
    }
    return error;


}
export default AddValidation;