package com.netcracker.edu.backend.service;

import com.netcracker.edu.backend.entities.UserSubscription;
import com.netcracker.edu.backend.repository.UserSubscriptionRepository;
import com.netcracker.edu.backend.service.interfaces.UserSubInterface;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.Optional;

@Component
public class UserSubService implements UserSubInterface {

    @Autowired
    private UserSubscriptionRepository userSubscriptionRepository;

    @Override
    public List<UserSubscription> getUsersSub() {
        return (List<UserSubscription>) userSubscriptionRepository.findAll();
    }

    @Override
    public Optional<UserSubscription> getUserSubBySubId(long subId) {
        return userSubscriptionRepository.findById(subId);
    }

    @Override
    public List<UserSubscription> getSubscriptionsByCustomerId(long id){
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
}
