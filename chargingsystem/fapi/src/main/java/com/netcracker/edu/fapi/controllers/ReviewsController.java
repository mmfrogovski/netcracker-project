package com.netcracker.edu.fapi.controllers;


import com.netcracker.edu.fapi.models.Review;
import com.netcracker.edu.fapi.services.interfaces.ReviewsServiceInterface;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(value = "/api")
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class ReviewsController {

    private ReviewsServiceInterface reviewsService;

    @Autowired
    public ReviewsController(ReviewsServiceInterface reviewsService) {
        this.reviewsService = reviewsService;
    }

    @RequestMapping(value = "/reviews", method = RequestMethod.GET)
    public List<Review> getReviews() {
        return reviewsService.getReviews();
    }

    @RequestMapping(value = "/reviews/{serviceId}", method = RequestMethod.GET)
    public List<Review> getReviewsByServiceId(@PathVariable(name = "serviceId") long serviceId){
        return reviewsService.getReviewsByServiceId(serviceId);
    }

    @RequestMapping(value = "/reviews", method = RequestMethod.POST)
    public Review saveReview(@RequestBody Review review) {
        return reviewsService.saveReview(review);
    }

    @RequestMapping(value = "/reviews/{id}", method = RequestMethod.DELETE)
    public void deleteReviewById(@PathVariable(name = "id") long id) {
        reviewsService.deleteReviewById(id);
    }
}
