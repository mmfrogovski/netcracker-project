package com.netcracker.edu.fapi.services;


import com.netcracker.edu.fapi.models.RestResponsePage;
import com.netcracker.edu.fapi.models.Subscription;
import com.netcracker.edu.fapi.services.interfaces.SubsServiceInterface;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.Arrays;
import java.util.Collections;
import java.util.List;


@Service()
public class SubscriptionService implements SubsServiceInterface {

    @Value("${backend.server.url}")
    private String backendServerUrl;

    @Override
    public List<Subscription> getSubs() {
        RestTemplate restTemplate = new RestTemplate();
        Subscription[] subscriptions = restTemplate.getForObject(backendServerUrl + "/api/all_subs/", Subscription[].class);
        return subscriptions == null ? Collections.emptyList() : Arrays.asList(subscriptions);
    }

    @Override
    public Subscription getServiceById(long serviceId) {
        RestTemplate restTemplate = new RestTemplate();
        return restTemplate.getForObject(backendServerUrl + "/api/all_subs/" + serviceId, Subscription.class);
    }

    @Override
    public Subscription saveService(Subscription service) {
        RestTemplate restTemplate = new RestTemplate();
        return restTemplate.postForEntity(backendServerUrl + "/api/all_subs/", service, Subscription.class).getBody();
    }

    @Override
    public void deleteServiceById(long serviceId) {
        RestTemplate restTemplate = new RestTemplate();
        restTemplate.delete(backendServerUrl + "/api/all_subs/" + serviceId);
    }

    @Override
    public RestResponsePage getSubsPage(int page, int size) {
        RestTemplate restTemplate = new RestTemplate();
        return restTemplate.getForObject(backendServerUrl + "/api/all_subs/pages/" + page + "/" + size, RestResponsePage.class);
    }

    @Override
    public Subscription getMostPopularService() {
        RestTemplate restTemplate = new RestTemplate();
        return restTemplate.getForObject(backendServerUrl+"/api/all_subs/mostPopular", Subscription.class);
    }

    @Override
    public Subscription getLastAddedService() {
        RestTemplate restTemplate = new RestTemplate();
        return restTemplate.getForObject(backendServerUrl+"/api/all_subs/lastAdded", Subscription.class);
    }
}

