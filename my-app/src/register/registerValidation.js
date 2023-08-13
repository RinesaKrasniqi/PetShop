function validation(values){
    let error ={}
    const email_pattern=/^[^\s@]+@[^\s@]+\.[^\s@]+$/
    const password_pattern=/^[a-zA-z0-9]{8,}$/

    if(values.name===""){
        error.name="Name should not be empty"
    }

    if(values.surname===""){
        error.surname="Surname should not be empty"
    }
    
    if(values.email === ""){
        error.email='email should not be empty'
    }

    if(values.password ===""){
        error.password ="Password should not be empty"
    }
    
    if(values.phone ===""){
        error.phone ="Phone should not be empty"
    }
    // else if(!password_pattern.test(values.password)){
    //     error.password ='Password didnt match'
    // }
    return error;


}
export default validation;