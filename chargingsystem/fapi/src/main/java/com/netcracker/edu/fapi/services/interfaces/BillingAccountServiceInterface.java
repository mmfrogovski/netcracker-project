package com.netcracker.edu.fapi.services.interfaces;


import com.netcracker.edu.fapi.models.BillingAccount;

import java.util.List;

public interface BillingAccountServiceInterface {
    List<BillingAccount> getBillingAccounts();

    BillingAccount getBillingAccountById(long billingId);

    BillingAccount saveBillingAccount(BillingAccount billingAccount);

    void deleteBillingAccountById(long billingId);

    void setBillingAccountResources(long id, int resources);
}
