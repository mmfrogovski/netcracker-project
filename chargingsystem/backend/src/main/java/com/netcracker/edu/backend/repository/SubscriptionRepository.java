package com.netcracker.edu.backend.repository;

import com.netcracker.edu.backend.entities.Subscription;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface SubscriptionRepository extends JpaRepository<Subscription, Long> {
    @Query(value = "SELECT * FROM subs ORDER BY id DESC LIMIT 1", nativeQuery = true)
    Subscription getLastAddedSubscription();

    @Query(value = "select s.id, description, price, service_name, sub_name, image from users_subs us inner join subs s on us.service_id = s.id group by s.service_name order by count(us.service_id) DESC limit 1", nativeQuery = true)
    Subscription getMostPopularSubscription();
}
