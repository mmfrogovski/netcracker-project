package com.netcracker.edu.backend.repository;

import com.netcracker.edu.backend.entities.Review;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Repository
public interface ReviewsRepository extends CrudRepository<Review, Long> {
    @Modifying
    @Query(value = "INSERT into reviews(review, review_date, customer_id, service_id) values(:review, :review_date, :customer_id, :service_id)",
            nativeQuery = true)
    @Transactional
    void saveReview(@Param("review") String review, @Param("review_date") String reviewDate, @Param("customer_id") long customerId, @Param("service_id") long serviceId);

    @Query(value = "select * from reviews where service_id = :serviceId", nativeQuery = true)
    List<Review> getReviewsByServiceId(@Param("serviceId") long serviceId);

}
