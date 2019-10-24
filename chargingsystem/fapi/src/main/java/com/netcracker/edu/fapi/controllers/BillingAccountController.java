package com.netcracker.edu.fapi.controllers;


import com.netcracker.edu.fapi.models.BillingAccount;
import com.netcracker.edu.fapi.services.interfaces.BillingAccountServiceInterface;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(value = "/api")
public class BillingAccountController {
    private BillingAccountServiceInterface billingAccountsService;

    @Autowired
    public BillingAccountController(BillingAccountServiceInterface billingAccountsService) {
        this.billingAccountsService = billingAccountsService;
    }

    @RequestMapping(value = "/billing_accounts", method = RequestMethod.GET)
    public List<BillingAccount> getBillingAccounts() {
        return billingAccountsService.getBillingAccounts();
    }

    @RequestMapping(value = "/billing_accounts/{billingId}", method = RequestMethod.GET)
    public ResponseEntity<BillingAccount> getBillingAccountById(@PathVariable(name = "billingId") long billingId) {
        BillingAccount billingAccount = billingAccountsService.getBillingAccountById(billingId);
        return billingAccount!=null ? ResponseEntity.ok(billingAccount) : ResponseEntity.notFound().build();
    }

    @RequestMapping(value = "/billing_accounts", method = RequestMethod.POST)
    public BillingAccount saveBillingAccount(@RequestBody BillingAccount billingAccount){
        return billingAccountsService.saveBillingAccount(billingAccount);
    }

    @RequestMapping(value = "/billing_accounts/{billingId}", method = RequestMethod.DELETE)
    public void deleteBillingAccountById(@PathVariable(name = "billingId") long billingId){
        billingAccountsService.deleteBillingAccountById(billingId);
    }

}
