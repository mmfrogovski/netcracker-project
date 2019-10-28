package com.netcracker.edu.backend.service.interfaces;

import com.netcracker.edu.backend.entities.NewUserSubscription;
import com.netcracker.edu.backend.entities.UserSubscription;

import java.util.List;
import java.util.Optional;


public interface UserSubInterface {
    List<UserSubscription> getUsersSub();

    Optional<UserSubscription> getUserSubBySubId(long subId);

    UserSubscription saveUserSub(NewUserSubscription subscription);

    void deleteUserSubById(long subId);
}
