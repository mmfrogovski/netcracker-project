package com.netcracker.edu.backend.service.interfaces;

import com.netcracker.edu.backend.entities.Review;

import java.util.List;

public interface ReviewsServiceInterface {
    List<Review> getReviews();
    Review saveReview(Review review);
    List<Review> getReviewsByServiceId(long serviceId);
    void deleteReviewById(long id);
}
