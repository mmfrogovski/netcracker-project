package com.netcracker.edu.backend.service;

import com.netcracker.edu.backend.entities.Customer;
import com.netcracker.edu.backend.repository.CustomerRepository;
import com.netcracker.edu.backend.service.interfaces.CustomerServiceInterface;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.Optional;

@Component
public class CustomerService implements CustomerServiceInterface {

    @Autowired
    private CustomerRepository customersRepository;

    @Override
    public List<Customer> getCustomers() {
        return (List<Customer>) customersRepository.findAll();
    }

    @Override
    public Optional<Customer> getCustomerById(long id) {
        return customersRepository.findById(id);
    }

    @Override
    public Customer saveCustomer(Customer customer) {
        return customersRepository.save(customer);
    }


    @Override
    public void deleteCustomerById(long id) {
        customersRepository.deleteById(id);
    }

    @Override
    public String checkEmailExists(String email) {
        return customersRepository.getEmailIfExists(email);
    }
}
