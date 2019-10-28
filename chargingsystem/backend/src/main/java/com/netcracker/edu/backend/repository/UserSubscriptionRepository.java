package com.netcracker.edu.backend.repository;

import com.netcracker.edu.backend.entities.UserSubscription;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

@Repository
public interface UserSubscriptionRepository extends CrudRepository<UserSubscription, Long> {

    @Modifying
    @Query(value = "INSERT into users_subs(rest_of_sub, sub_start, customer_id, service_id) values(:rest_of_sub, :sub_start, :customer_id, :service_id)",
            nativeQuery = true)
    @Transactional
    void saveUserSubscription(@Param("rest_of_sub") int restOfSub, @Param("sub_start") String subStart, @Param("customer_id") long customerId, @Param("service_id") long serviceId);

}
