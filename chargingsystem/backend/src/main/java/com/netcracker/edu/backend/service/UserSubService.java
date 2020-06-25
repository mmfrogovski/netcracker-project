package com.netcracker.edu.backend.service;

import com.netcracker.edu.backend.entities.BillingAccount;
import com.netcracker.edu.backend.entities.UserSubscription;
import com.netcracker.edu.backend.repository.BillingAccountRepository;
import com.netcracker.edu.backend.repository.UserSubscriptionRepository;
import com.netcracker.edu.backend.service.interfaces.UserSubInterface;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.Optional;

@Component
public class UserSubService implements UserSubInterface {

    @Autowired
    private UserSubscriptionRepository userSubscriptionRepository;

    @Autowired
    private BillingAccountService billingAccountService;

    @Override
    @Scheduled(fixedRate = 20000)
    public void subDurationAdd() {
        List<UserSubscription> userSubscriptions = (List<UserSubscription>) userSubscriptionRepository.findAll();
        userSubscriptions.forEach(subscription -> {
            if (subscription.isActive()) {
                userSubscriptionRepository.updateSubDurationById(subscription.getId(), subscription.getSubDuration() + 1);
                if (10 < subscription.getSubDuration()) {
                    if (20 < subscription.getSubDuration()) {
                        if (30 < subscription.getSubDuration()) {
                            userSubscriptionRepository.updateDiscountById(subscription.getId(), 3);
                        } else {
                            userSubscriptionRepository.updateDiscountById(subscription.getId(), 2);
                        }
                    } else {
                        userSubscriptionRepository.updateDiscountById(subscription.getId(), 1);
                    }
                }
            }
        });
    }


    @Override
    public List<UserSubscription> getUsersSub() {
        return (List<UserSubscription>) userSubscriptionRepository.findAll();
    }

    @Override
    public Optional<UserSubscription> getUserSubBySubId(long subId) {
        return userSubscriptionRepository.findById(subId);
    }

    @Override
    public List<UserSubscription> getSubscriptionsByCustomerId(long id) {
        return (List<UserSubscription>) userSubscriptionRepository.getSubscriptionByCustomerId(id);
    }

    @Override
    public UserSubscription saveUserSub(UserSubscription subscription) {
        return userSubscriptionRepository.save(subscription);
    }


    @Override
    public void deleteUserSubById(long id) {
        userSubscriptionRepository.deleteById(id);
    }


    @Override
    public void setUserSubActive(long id, boolean status) {
        userSubscriptionRepository.setUserSubscriptionStatus(id, status);
    }

    public UserSubscription getSubscriptionByCustomerAndServiceId(long customerId, long serviceId) {
        return userSubscriptionRepository.getSubscriptionByCustomerAndServiceId(customerId, serviceId);
    }

    @Override
    @Scheduled(fixedRate = 5000)
    public void getMoneyForSubscriptions() {
        List<UserSubscription> userSubscriptions = userSubscriptionRepository.findAllByOrderBySubscriptionPriceDesc();
        int resources=0;
        for (UserSubscription userSubscription : userSubscriptions) {
            if (userSubscription.isActive()) {
                Optional<BillingAccount> billingAccount = billingAccountService.getBillingAccountById(userSubscription.getCustomer().getBillingAccount().getId());
                if(billingAccount.isPresent())
                    resources = billingAccount.get().getResources();
                if (userSubscription.getSubscription().getPrice() <= resources) {
                    billingAccountService.setBillingAccountResources(userSubscription.getCustomer()
                            .getBillingAccount().getId(),
                            resources - userSubscription.getSubscription().getPrice() + userSubscription.getDiscount());
                } else {
                    userSubscriptionRepository.setUserSubscriptionStatus(userSubscription.getId(), false);
                }
            }
        }
    }

    @Override
    public int[] getNumberOfServiceSubscriptions(){
        return userSubscriptionRepository.getNumberOfServiceSubscriptions();
    }
}
