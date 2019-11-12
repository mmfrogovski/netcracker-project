package com.netcracker.edu.backend.service;

import com.netcracker.edu.backend.entities.BillingAccount;
import com.netcracker.edu.backend.repository.BillingAccountRepository;
import com.netcracker.edu.backend.service.interfaces.BillingAccountServiceInterface;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.Optional;

@Component
public class BillingAccountService implements BillingAccountServiceInterface {

    @Autowired
    private BillingAccountRepository billingAccountRepository;

    @Override
    public List<BillingAccount> getBillingAccounts(){
        return (List<BillingAccount>)billingAccountRepository.findAll();
    }

    @Override
    public Optional<BillingAccount> getBillingAccountById(long billingId){
        return billingAccountRepository.findById(billingId);
    }

    @Override
    public BillingAccount saveBillingAccount(BillingAccount billingAccount){
        return billingAccountRepository.save(billingAccount);
    }

    @Override
    public void setBillingAccountResources(long id, int resources){
        billingAccountRepository.updateResources(id, resources);
    }


    @Override
    public void deleteBillingAccountById(long billingId){
        billingAccountRepository.deleteById(billingId);
    }

}
