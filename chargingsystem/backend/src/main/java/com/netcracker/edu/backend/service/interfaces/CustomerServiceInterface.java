package com.netcracker.edu.backend.service.interfaces;

import com.netcracker.edu.backend.entities.Customer;

import java.util.List;
import java.util.Optional;

public interface CustomerServiceInterface {
    List<Customer> getCustomers();
    Optional<Customer> getCustomerById(long id);
    Customer saveCustomer(Customer customer);
    void deleteCustomerById(long id);
}
