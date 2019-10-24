package com.netcracker.edu.backend.repository;

import com.netcracker.edu.backend.entities.Review;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ReviewsRepository extends CrudRepository<Review, Long> {
}
