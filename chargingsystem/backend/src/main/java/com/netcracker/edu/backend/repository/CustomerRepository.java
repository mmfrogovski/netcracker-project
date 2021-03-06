package com.netcracker.edu.backend.repository;


import com.netcracker.edu.backend.entities.Customer;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface CustomerRepository extends CrudRepository<Customer, Long> {

    @Query(value = "select c.email from Customer c where c.email = :email")
    String getEmailIfExists(@Param("email") String email);
}
