package com.netcracker.edu.fapi.validators;

import com.netcracker.edu.fapi.models.RegistrationData;
import com.netcracker.edu.fapi.services.CustomerService;
import com.netcracker.edu.fapi.services.UsersService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.validation.Errors;
import org.springframework.validation.Validator;

@Component
public class UsersValidator implements Validator {

    private CustomerService customerService;
    private UsersService usersService;

    @Autowired
    UsersValidator(CustomerService customerService, UsersService usersService){
        this.customerService=customerService;
        this.usersService=usersService;
    }

    @Override
    public boolean supports(Class<?> aClass) {
        return RegistrationData.class.equals(aClass);
    }

    @Override
    public void validate(Object o, Errors errors) {
        RegistrationData registrationData = (RegistrationData) o;
        if (customerService.checkEmailExists(registrationData.getEmail()) != null){
            errors.rejectValue("email", "This email is already in use.");
        }
        if(usersService.findByLogin(((RegistrationData) o).getLogin())!=null){
            errors.rejectValue("login", "Login is already used.");
        }
    }
}
