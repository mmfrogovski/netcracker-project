package com.netcracker.edu.fapi.services;


import com.netcracker.edu.fapi.models.Customer;
import com.netcracker.edu.fapi.services.interfaces.CustomerServiceInterface;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.Arrays;
import java.util.Collections;
import java.util.List;

@Service()
public class CustomerService implements CustomerServiceInterface {

    @Value("${backend.server.url}")
    private String backendServerUrl;

    @Override
    public List<Customer> getCustomers(){
        RestTemplate restTemplate = new RestTemplate();
        Customer[] customers = restTemplate.getForObject(backendServerUrl + "/api/customers", Customer[].class);
        return customers == null ? Collections.emptyList() : Arrays.asList(customers);
    }

    @Override
    public Customer getCustomerById(long id){
        RestTemplate restTemplate = new RestTemplate();
        return restTemplate.getForObject(backendServerUrl + "/api/customers/" + id, Customer.class);
    }

    @Override
    public Customer saveCustomer(Customer customer){
        RestTemplate restTemplate = new RestTemplate();
        return restTemplate.postForEntity(backendServerUrl + "/api/customers/", customer, Customer.class).getBody();
    }

    @Override
    public void deleteCustomerById(long id){
        RestTemplate restTemplate = new RestTemplate();
        restTemplate.delete(backendServerUrl + "/api/customers/" + id);
    }

    public String checkEmailExists(String email){
        RestTemplate restTemplate = new RestTemplate();
        return restTemplate.getForObject(backendServerUrl + "/api/customers/email/" + email, String.class);
    }

}
