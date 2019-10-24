package com.netcracker.edu.fapi.services;

import com.netcracker.edu.fapi.models.BillingAccount;
import com.netcracker.edu.fapi.services.interfaces.BillingAccountServiceInterface;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.Arrays;
import java.util.Collections;
import java.util.List;

@Service()
public class BillingAccountService implements BillingAccountServiceInterface {

    @Value("${backend.server.url}")
    private String backendServerUrl;

    @Override
    public List<BillingAccount> getBillingAccounts() {
        RestTemplate restTemplate = new RestTemplate();
        BillingAccount[] billingAccounts = restTemplate.getForObject(backendServerUrl + "/api/billing_accounts", BillingAccount[].class);
        return billingAccounts == null ? Collections.emptyList() : Arrays.asList(billingAccounts);
    }

    @Override
    public BillingAccount getBillingAccountById(long billingId) {
        RestTemplate restTemplate = new RestTemplate();
        return restTemplate.getForObject(backendServerUrl + "/api/billing_accounts/" + billingId, BillingAccount.class);
    }

    @Override
    public BillingAccount saveBillingAccount(BillingAccount billingAccount) {
        RestTemplate restTemplate = new RestTemplate();
        return restTemplate.postForEntity(backendServerUrl + "/api/billing_accounts/", billingAccount, BillingAccount.class).getBody();
    }

    @Override
    public void deleteBillingAccountById(long billingId) {
        RestTemplate restTemplate = new RestTemplate();
        restTemplate.delete(backendServerUrl + "/api/billing_accounts/" + billingId);
    }

}
