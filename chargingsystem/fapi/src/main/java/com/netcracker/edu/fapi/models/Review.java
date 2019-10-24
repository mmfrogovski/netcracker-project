package com.netcracker.edu.fapi.models;


import java.util.Objects;


public class Review {
    private long id;
    private String review;
    private String reviewDate;


    public Review() {
    }

    public Review(String review, String reviewDate) {
        this.review = review;
        this.reviewDate = reviewDate;
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
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

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Review review1 = (Review) o;
        return id == review1.id &&
                Objects.equals(review, review1.review) &&
                Objects.equals(reviewDate, review1.reviewDate);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, review, reviewDate);
    }

    @Override
    public String toString() {
        return "Review{" +
                "id=" + id +
                ", review='" + review + '\'' +
                ", reviewDate='" + reviewDate + '\'' +
                '}';
    }
}
