package com.netcracker.edu.backend.service;


import com.netcracker.edu.backend.entities.Review;
import com.netcracker.edu.backend.repository.ReviewsRepository;
import com.netcracker.edu.backend.service.interfaces.ReviewsServiceInterface;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class ReviewsService implements ReviewsServiceInterface {
    private final ReviewsRepository reviewsRepository;

    @Autowired
    public ReviewsService(ReviewsRepository reviewsRepository) {
        this.reviewsRepository = reviewsRepository;
    }

    @Override
    public List<Review> getReviews() {
        return (List<Review>) reviewsRepository.findAll();
    }

    @Override
    public Review saveReview(Review review) {
        return reviewsRepository.save(review);
    }

    @Override
    public List<Review> getReviewsByServiceId(long serviceId) {
        return (List<Review>) reviewsRepository.getReviewsByServiceId(serviceId);
    }

    @Override
    public void deleteReviewById(long id) {
        reviewsRepository.deleteById(id);
    }
}
