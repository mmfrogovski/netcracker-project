package com.netcracker.edu.fapi.models;


public class UserSubscription {
    private long id;
    private String subStart;
    private Customer customer;
    private Subscription subscription;
    private boolean active;
    private int subDuration;
    private int discount;

    public UserSubscription() {
    }

    public UserSubscription(long id, String subStart, Customer customer, Subscription subscription, boolean active, int subDuration, int discount) {
        this.id = id;
        this.subStart = subStart;
        this.customer = customer;
        this.subscription = subscription;
        this.active = active;
        this.subDuration = subDuration;
        this.discount = discount;
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public boolean isActive() {
        return active;
    }

    public void setActive(boolean active) {
        this.active = active;
    }

    public int getSubDuration() {
        return subDuration;
    }

    public void setSubDuration(int subDuration) {
        this.subDuration = subDuration;
    }

    public int getDiscount() {
        return discount;
    }

    public void setDiscount(int discount) {
        this.discount = discount;
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



    @Override
    public String toString() {
        return "UserSubscription{" +
                "id=" + id +
                ", subStart='" + subStart + '\'' +
                ", customer=" + customer +
                ", subscription=" + subscription +
                ", active=" + active +
                '}';
    }
}
