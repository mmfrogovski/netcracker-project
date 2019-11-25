package com.netcracker.edu.fapi.validators;

import com.netcracker.edu.fapi.validators.intefaces.BillingAccountValidators;

public class BillingAccountValidator implements BillingAccountValidators{

    @Override
    public Exception resourcesInputException(int resources) throws Exception {
       if(resources==0){
           throw  new Exception("Can't add zero resources.");
       }
        return null;
    }
}
