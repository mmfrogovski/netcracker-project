package com.netcracker.edu.fapi.controllers;


import com.netcracker.edu.fapi.models.Customer;
import com.netcracker.edu.fapi.services.interfaces.CustomerServiceInterface;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(value = "/api")
public class CustomersController {

    private CustomerServiceInterface customersService;

    @Autowired
    public CustomersController(CustomerServiceInterface customersService) {
        this.customersService = customersService;
    }

    @RequestMapping(value = "/customers", method = RequestMethod.GET)
    public List<Customer> getCustomers() {
        return customersService.getCustomers();
    }

    @RequestMapping(value = "/customers/{id}", method = RequestMethod.GET)
    public ResponseEntity<Customer> getCustomerById(@PathVariable(name = "id") long id) {
        Customer customer = customersService.getCustomerById(id);
        return customer!=null ? ResponseEntity.ok(customer) : ResponseEntity.notFound().build();
    }

    @RequestMapping(value = "/customers", method = RequestMethod.POST)
    public Customer saveCustomer(@RequestBody Customer customer) {
        return customersService.saveCustomer(customer);
    }


    @RequestMapping(value = "/customers/{id}", method = RequestMethod.DELETE)
    public void deleteCustomerById(@PathVariable(name = "id") long id) {
        customersService.deleteCustomerById(id);
    }
}
