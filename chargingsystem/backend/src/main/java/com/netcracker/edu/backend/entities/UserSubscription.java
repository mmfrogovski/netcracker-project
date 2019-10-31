package com.netcracker.edu.backend.entities;



import javax.persistence.*;

@Entity
@Table(name = "users_subs")
public class UserSubscription {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    private String subStart;
    private int restOfSub;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "customer_id")
    private Customer customer;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "service_id")
    private Subscription subscription;

    public UserSubscription() {
    }

    public UserSubscription(String subStart, int restOfSub) {
        this.subStart = subStart;
        this.restOfSub = restOfSub;
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
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
                ", restOfSub=" + restOfSub +
                ", customer=" + customer +
                ", subscription=" + subscription +
                '}';
    }
}
