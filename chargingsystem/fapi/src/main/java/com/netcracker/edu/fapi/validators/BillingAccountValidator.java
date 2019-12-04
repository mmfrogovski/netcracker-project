package com.netcracker.edu.fapi.validators;

import com.netcracker.edu.fapi.models.BillingAccount;
import org.springframework.stereotype.Component;
import org.springframework.validation.Errors;
import org.springframework.validation.Validator;

@Component
public class BillingAccountValidator implements Validator {

    @Override
    public boolean supports(Class<?> aClass) {
        return BillingAccount.class.equals(aClass);
    }

    @Override
    public void validate(Object o, Errors errors) {
    }
}
