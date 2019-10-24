package com.netcracker.edu.fapi.services;

import com.netcracker.edu.fapi.models.RegistrationData;
import com.netcracker.edu.fapi.models.User;
import com.netcracker.edu.fapi.services.interfaces.UsersServiceInterface;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.Arrays;
import java.util.Collections;
import java.util.List;


@Service()
public class UsersService implements UsersServiceInterface {


    @Value("${backend.server.url}")
    private String backendServerUrl;


    @Override
    public List<User> getUsers() {
        RestTemplate restTemplate = new RestTemplate();
        User[] usersResponse = restTemplate.getForObject(backendServerUrl + "api/users", User[].class);
        return usersResponse == null ? Collections.emptyList() : Arrays.asList(usersResponse);
    }

    @Override
    public User getUserById(long userId) {
        RestTemplate restTemplate = new RestTemplate();
        return restTemplate.getForObject(backendServerUrl + "api/users/" + userId, User.class);
    }

    @Override
    public User saveUser(User user) {
        RestTemplate restTemplate = new RestTemplate();
        return restTemplate.postForEntity(backendServerUrl + "api/users/", user, User.class).getBody();
    }

    @Override
    public void deleteUserById(long userId) {
        RestTemplate restTemplate = new RestTemplate();
        restTemplate.delete(backendServerUrl + "api/users/" + userId);
    }

    @Override
    public User registerUser(RegistrationData registrationData) {
        RestTemplate restTemplate = new RestTemplate();
        return restTemplate.postForEntity(backendServerUrl + "api/users/register", registrationData, User.class).getBody();
    }
}
