package com.netcracker.edu.fapi.services;


import com.netcracker.edu.fapi.models.Review;
import com.netcracker.edu.fapi.services.interfaces.ReviewsServiceInterface;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.Arrays;
import java.util.Collections;
import java.util.List;

@Service()
public class ReviewsService implements ReviewsServiceInterface {

    @Value("${backend.server.url}")
    private String backendServerUrl;

    @Override
    public List<Review> getReviews() {
        RestTemplate restTemplate = new RestTemplate();
        Review[] reviews = restTemplate.getForObject(backendServerUrl + "/api/reviews", Review[].class);
        return reviews == null ? Collections.emptyList() : Arrays.asList(reviews);
    }

    @Override
    public Review saveReview(Review review) {
        RestTemplate restTemplate = new RestTemplate();
        return restTemplate.postForEntity(backendServerUrl + "/api/reviews/", review, Review.class).getBody();
    }

    @Override
    public void deleteReviewById(long id) {
        RestTemplate restTemplate = new RestTemplate();
        restTemplate.delete(backendServerUrl + "/api/reviews/" + id);
    }
}
