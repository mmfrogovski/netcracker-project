package com.netcracker.edu.backend.service;


import com.netcracker.edu.backend.entities.Review;
import com.netcracker.edu.backend.repository.ReviewsRepository;
import com.netcracker.edu.backend.service.interfaces.ReviewsServiceInterface;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class ReviewsService implements ReviewsServiceInterface {
    @Autowired
    private ReviewsRepository reviewsRepository;

    @Override
    public List<Review> getReviews(){
        return (List<Review>)reviewsRepository.findAll();
    }

    @Override
    public Review saveReview(Review review){
        return reviewsRepository.save(review);
    }

    @Override
    public void deleteReviewById(long id){
        reviewsRepository.deleteById(id);
    }
}
