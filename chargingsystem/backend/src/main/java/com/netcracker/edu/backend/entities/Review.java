package com.netcracker.edu.backend.entities;


import com.fasterxml.jackson.annotation.JsonBackReference;

import javax.persistence.*;
import java.util.Objects;

@Entity
@Table(name = "reviews")
public class Review {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    private String review;
    private String reviewDate;


    @ManyToOne(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    @JsonBackReference
    @JoinColumn(name = "customer_id")
    private Customer customer;

    @ManyToOne(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    @JsonBackReference
    @JoinColumn(name = "service_id")
    private Subscription service;

    public Review() {
    }
    public Review(String review, String reviewDate){
        this.review = review;
        this.reviewDate = reviewDate;
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }


    public Customer getCustomer() {
        return customer;
    }

    public void setCustomer(Customer customer) {
        this.customer = customer;
    }

    public String getReview() {
        return review;
    }

    public void setReview(String review) {
        this.review = review;
    }

    public String getReviewDate() {
        return reviewDate;
    }

    public void setReviewDate(String reviewDate) {
        this.reviewDate = reviewDate;
    }

    public Subscription getService() {
        return service;
    }

    public void setService(Subscription service) {
        this.service = service;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Review review1 = (Review) o;
        return id == review1.id &&
                Objects.equals(review, review1.review) &&
                Objects.equals(reviewDate, review1.reviewDate) &&
                Objects.equals(service, review1.service);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, review, reviewDate, service);
    }

    @Override
    public String toString() {
        return "Review{" +
                "id=" + id +
                ", review='" + review + '\'' +
                ", reviewDate='" + reviewDate + '\'' +
                ", customer=" + customer +
                ", service=" + service +
                '}';
    }
}
