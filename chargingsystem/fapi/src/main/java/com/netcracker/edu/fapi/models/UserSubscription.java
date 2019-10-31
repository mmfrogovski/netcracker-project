package com.netcracker.edu.fapi.models;


public class UserSubscription {
    private long id;
    private String subStart;
    private int restOfSub;
    private Customer customer;
    private Subscription subscription;

    public UserSubscription() {
    }

    public UserSubscription(String subStart, int restOfSub, Customer customer, Subscription subscription) {
        this.subStart = subStart;
        this.restOfSub = restOfSub;
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

    public Subscription getSubscription() {
        return subscription;
    }

    public void setSubscription(Subscription subscription) {
        this.subscription = subscription;
    }

    public String getSubStart() {
        return subStart;
    }

    public void setSubStart(String subStart) {
        this.subStart = subStart;
    }

    public int getRestOfSub() {
        return restOfSub;
    }

    public void setRestOfSub(int restOfSub) {
        this.restOfSub = restOfSub;
    }


    @Override
    public String toString() {
        return "UserSubscription{" +
                "id=" + id +
                ", subStart='" + subStart + '\'' +
                ", restOfSub=" + restOfSub +
                ", customer=" + customer +
                ", subscription=" + subscription +
                '}';
    }
}
