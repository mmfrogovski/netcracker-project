package com.netcracker.edu.backend.service;

import com.netcracker.edu.backend.entities.NewService;
import com.netcracker.edu.backend.entities.Subscription;
import com.netcracker.edu.backend.repository.SubscriptionRepository;
import com.netcracker.edu.backend.service.interfaces.SubsServiceInterface;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.Collections;
import java.util.List;
import java.util.Optional;

@Component
public class SubscriptionService implements SubsServiceInterface {

    @Autowired
    SubscriptionRepository subscriptionRepository;

    @Override
    public List<Subscription> getSubs() {
        return (List<Subscription>) subscriptionRepository.findAll();
    }

    @Override
    public Optional<Subscription> getServiceById(long serviceId) {
        return subscriptionRepository.findById(serviceId);
    }

    @Override
    public Subscription saveService(NewService service) {
        Subscription temp = new Subscription(service.getServiceName(), service.getSubName(), service.getSubDuration(), service.getPrice(), service.getDescription());
        temp.setReviews(Collections.emptyList());
        temp.setUsersSubscriptions(Collections.emptyList());
        return subscriptionRepository.save(temp);
    }

    @Override
    public void deleteServiceById(long serviceId) {
        subscriptionRepository.deleteById(serviceId);
    }
}
