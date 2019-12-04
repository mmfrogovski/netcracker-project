package com.netcracker.edu.fapi.services.interfaces;


import com.netcracker.edu.fapi.models.Customer;

import java.util.List;

public interface CustomerServiceInterface {
    List<Customer> getCustomers();
    Customer getCustomerById(long id);
    Customer saveCustomer(Customer customer);
    void deleteCustomerById(long id);
    String checkEmailExists(String email);
}
