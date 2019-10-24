package com.netcracker.edu.backend.service.interfaces;

import com.netcracker.edu.backend.entities.BillingAccount;

import java.util.List;
import java.util.Optional;

public interface BillingAccountServiceInterface {
    List<BillingAccount> getBillingAccounts();
    Optional<BillingAccount> getBillingAccountById(long billingId);
    BillingAccount saveBillingAccount(BillingAccount billingAccount);
    void deleteBillingAccountById(long billingId);
}
