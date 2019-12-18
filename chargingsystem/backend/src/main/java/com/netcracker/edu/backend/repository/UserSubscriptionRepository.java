package com.netcracker.edu.backend.repository;

import com.netcracker.edu.backend.entities.UserSubscription;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Repository
public interface UserSubscriptionRepository extends CrudRepository<UserSubscription, Long> {

    @Modifying
    @Query(value = "update UserSubscription set active = :active where id = :id")
    @Transactional
    void setUserSubscriptionStatus(@Param("id") long id, @Param("active") boolean active);

    @Query(value = "select * from users_subs where customer_id = :customerId", nativeQuery = true)
    List<UserSubscription> getSubscriptionByCustomerId(@Param("customerId") long customerId);

    @Query(value = "select * from users_subs where customer_id = :customerId and service_id = :serviceId", nativeQuery = true)
    UserSubscription getSubscriptionByCustomerAndServiceId(@Param("customerId") long customerId,
                                                           @Param("serviceId") long serviceId);

    @Modifying
    @Query(value = "update users_subs set discount = :discount where id = :id",
            nativeQuery = true)
    @Transactional
    void updateDiscountById(@Param("id") long id, @Param("discount") int discount);

    @Modifying
    @Query(value = "update users_subs set sub_duration = :duration where id = :id",
            nativeQuery = true)
    @Transactional
    void updateSubDurationById(@Param("id") long id, @Param("duration") int duration);


    List<UserSubscription> findAllByOrderBySubscriptionPriceDesc();

    @Query(value = "select count(us.subscription.id)from UserSubscription us group by us.subscription.id order by us.subscription.id asc")
    int[] getNumberOfServiceSubscriptions();

}
