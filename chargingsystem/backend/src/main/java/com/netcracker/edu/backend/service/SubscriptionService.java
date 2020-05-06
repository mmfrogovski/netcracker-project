package com.netcracker.edu.backend.service;

import com.netcracker.edu.backend.entities.Customer;
import com.netcracker.edu.backend.entities.Subscription;
import com.netcracker.edu.backend.entities.UserSubscription;
import com.netcracker.edu.backend.repository.SubscriptionRepository;
import com.netcracker.edu.backend.repository.UserSubscriptionRepository;
import com.netcracker.edu.backend.service.interfaces.SubsServiceInterface;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.Optional;

@Component
public class SubscriptionService implements SubsServiceInterface {

    @Autowired
    SubscriptionRepository subscriptionRepository;

    @Autowired
    UserSubscriptionRepository userSubscriptionRepository;

    @Override
    public List<Subscription> getSubs() {
        return (List<Subscription>) subscriptionRepository.findAll();
    }

    @Override
    public Optional<Subscription> getServiceById(long serviceId) {
        return subscriptionRepository.findById(serviceId);
    }

    @Override
    public Subscription saveService(Subscription service) {
        subscriptionRepository.save(service);
        Customer customer = new Customer();
        customer.setId(5);
        Subscription subscription = new Subscription();
        subscription.setId(service.getId());
        userSubscriptionRepository.save(new UserSubscription("00-00-0000", false, 0, 0, customer, subscription));
        return service;
    }

    @Override
    public void deleteServiceById(long serviceId) {
        subscriptionRepository.deleteById(serviceId);
    }

    @Override
    public Page<Subscription> getSubsPage(int page, int size) {
        return subscriptionRepository.findAll(PageRequest.of(page, size, Sort.Direction.ASC, "id"));
    }

    @Override
    public Subscription getLastAddedSubscription() {
        return subscriptionRepository.getLastAddedSubscription();
    }

    @Override
    public Subscription getMostPopularSubscription() {
        return subscriptionRepository.getMostPopularSubscription();
    }
}
