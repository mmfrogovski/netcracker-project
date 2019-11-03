package com.netcracker.edu.fapi.services.interfaces;

import com.netcracker.edu.fapi.models.UserSubscription;

import java.util.List;

public interface UserSubInterface {
    List<UserSubscription> getUsersSub();

    UserSubscription getUserSubBySubId(long subId);

    UserSubscription saveUserSub(UserSubscription subscription);

    List<UserSubscription> getSubscriptionsByCustomerId(long id);

    void deleteUserSubById(long subId);
}
