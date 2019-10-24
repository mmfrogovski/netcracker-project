package com.netcracker.edu.fapi.services.interfaces;

import com.netcracker.edu.fapi.models.Review;

import java.util.List;

public interface ReviewsServiceInterface {
    List<Review> getReviews();
    Review saveReview(Review review);
    void deleteReviewById(long id);
}
