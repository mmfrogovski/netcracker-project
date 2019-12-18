package com.netcracker.edu.fapi.services;


import com.netcracker.edu.fapi.models.UserSubscription;
import com.netcracker.edu.fapi.services.interfaces.UserSubInterface;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.Arrays;
import java.util.Collections;
import java.util.List;

@Service()
public class UserSubService implements UserSubInterface {

    @Value("${backend.server.url}")
    private String backendServerUrl;

    @Override
    public List<UserSubscription> getUsersSub() {
        RestTemplate restTemplate = new RestTemplate();
        UserSubscription[] usersSubscriptions = restTemplate.getForObject(backendServerUrl + "/api/users_subs/", UserSubscription[].class);
        return usersSubscriptions == null ? Collections.emptyList() : Arrays.asList(usersSubscriptions);
    }

    @Override
    public UserSubscription getUserSubBySubId(long subId) {
        RestTemplate restTemplate = new RestTemplate();
        return restTemplate.getForObject(backendServerUrl + "/api/users_subs/" + subId, UserSubscription.class);
    }

    @Override
    public List<UserSubscription> getSubscriptionsByCustomerId(long id) {
        RestTemplate restTemplate = new RestTemplate();
        UserSubscription[] usersSubscriptions = restTemplate.getForObject(backendServerUrl + "/api/users_subs/customer/" + id, UserSubscription[].class);
        return usersSubscriptions == null ? Collections.emptyList() : Arrays.asList(usersSubscriptions);
    }


    public UserSubscription getSubscriptionByCustomerAndServiceId(long customerId, long serviceId) {
        RestTemplate restTemplate = new RestTemplate();
        return restTemplate.getForObject(backendServerUrl + "/api/users_subs/customer/" + customerId + "/service/" + serviceId, UserSubscription.class);
    }

    @Override
    public UserSubscription saveUserSub(UserSubscription subscription) {
        RestTemplate restTemplate = new RestTemplate();
        return restTemplate.postForEntity(backendServerUrl + "/api/users_subs/", subscription, UserSubscription.class).getBody();
    }

    @Override
    public void deleteUserSubById(long subId) {
        RestTemplate restTemplate = new RestTemplate();
        restTemplate.delete(backendServerUrl + "/api/users_subs/" + subId);
    }

    @Override
    public void setUserSubActive(long id, boolean status) {
        RestTemplate restTemplate = new RestTemplate();
        restTemplate.put(backendServerUrl + "/api/users_subs/" + id + "/" + status, new UserSubscription());
    }

    @Override
    public int[] getNumberOfServiceSubscriptions(){
        RestTemplate restTemplate = new RestTemplate();
        return restTemplate.getForObject(backendServerUrl+"/api/users_subs/servicesNumOfSub", int[].class);
    }

}
