package com.netcracker.edu.backend.entities;



import javax.persistence.*;

@Entity
@Table(name = "users_subs")
public class UserSubscription {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    private String subStart;
    private boolean active;
    private int subDuration;
    private int discount;

    @ManyToOne()
    @JoinColumn(name = "customer_id")
    private Customer customer;

    @ManyToOne()
    @JoinColumn(name = "service_id")
    private Subscription subscription;

    public UserSubscription() {
    }

    public UserSubscription(String subStart, boolean active, int subDuration, int discount, Customer customer, Subscription subscription) {
        this.subStart = subStart;
        this.active = active;
        this.subDuration = subDuration;
        this.discount = discount;
        this.customer = customer;
        this.subscription = subscription;
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

    public String getSubStart() {
        return subStart;
    }

    public void setSubStart(String subStart) {
        this.subStart = subStart;
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

    @Override
    public String toString() {
        return "UserSubscription{" +
                "id=" + id +
                ", subStart='" + subStart + '\'' +
                ", active=" + active +
                ", subDuration=" + subDuration +
                ", discount=" + discount +
                ", customer=" + customer +
                ", subscription=" + subscription +
                '}';
    }
}
