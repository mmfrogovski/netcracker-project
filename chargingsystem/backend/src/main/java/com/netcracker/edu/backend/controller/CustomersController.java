package com.netcracker.edu.backend.controller;


import com.netcracker.edu.backend.entities.Customer;
import com.netcracker.edu.backend.service.interfaces.CustomerServiceInterface;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.sql.SQLException;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping(value = "/api/customers")
public class CustomersController {

    private CustomerServiceInterface customersService;

    @Autowired
    public CustomersController(CustomerServiceInterface customersService) {
        this.customersService = customersService;
    }

    @RequestMapping(value = "", method = RequestMethod.GET)
    public List<Customer> getCustomers() {
        return customersService.getCustomers();
    }

    @RequestMapping(value = "/{id}", method = RequestMethod.GET)
    public ResponseEntity<Customer> getCustomerById(@PathVariable(name = "id") long id) {
        Optional<Customer> customer = customersService.getCustomerById(id);
        return customer.isPresent() ? ResponseEntity.ok(customer.get()) : ResponseEntity.notFound().build();
    }

    @RequestMapping(value = "", method = RequestMethod.POST)
    public Customer saveCustomer(@RequestBody Customer customer) {
        return customersService.saveCustomer(customer);
    }

//    @RequestMapping(value = "/customers/{billingId}/{id}", method = RequestMethod.PUT)
//    public int updateCustomerBillingAccount(@PathVariable(name = "billingId") long billingId, @PathVariable(name = "id") long id) {
//        return customersService.updateCustomerBillingAccount(billingId, id);
//    }

    @RequestMapping(value = "/email/{email}", method = RequestMethod.GET)
    public String checkEmailExists(@PathVariable(name = "email") String email) throws SQLException {
        return this.customersService.checkEmailExists(email);
    }

    @RequestMapping(value = "/{id}", method = RequestMethod.DELETE)
    public void deleteCustomerById(@PathVariable(name = "id") long id) {
        customersService.deleteCustomerById(id);
    }
}
