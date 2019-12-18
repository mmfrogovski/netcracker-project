package com.netcracker.edu.backend.service.interfaces;

import com.netcracker.edu.backend.entities.UserSubscription;

import java.util.List;
import java.util.Optional;


public interface UserSubInterface {
    List<UserSubscription> getUsersSub();

    Optional<UserSubscription> getUserSubBySubId(long subId);

    List<UserSubscription> getSubscriptionsByCustomerId(long id);

    UserSubscription saveUserSub(UserSubscription subscription);

    void deleteUserSubById(long subId);

    void setUserSubActive(long id, boolean status);

    UserSubscription getSubscriptionByCustomerAndServiceId(long customerId, long serviceId);

    void getMoneyForSubscriptions();

    void subDurationAdd();

    int[] getNumberOfServiceSubscriptions();
}

