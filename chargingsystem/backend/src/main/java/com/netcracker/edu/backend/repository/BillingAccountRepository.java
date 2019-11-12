package com.netcracker.edu.backend.repository;

import com.netcracker.edu.backend.entities.BillingAccount;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

@Repository
public interface BillingAccountRepository extends CrudRepository<BillingAccount, Long> {

    @Transactional
    @Modifying
    @Query(value = "update billing_accounts set resources=:resources where id = :id", nativeQuery = true)
    void updateResources(@Param("id") long id, @Param("resources") int resources);
}
