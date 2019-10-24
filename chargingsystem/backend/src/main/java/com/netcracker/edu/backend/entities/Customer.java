package com.netcracker.edu.backend.entities;


import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonManagedReference;

import javax.persistence.*;
import java.util.List;
import java.util.Objects;

@Entity
@Table(name = "customers")
public class Customer {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)

    private long id;

    private String name;
    private String email;
    private int age;


    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "billing_id")
    private BillingAccount billingAccount;


    @OneToMany(fetch = FetchType.LAZY, mappedBy = "customer")
    @JsonManagedReference
    @JsonIgnore
    private List<UserSubscription> subscriptions;

    @OneToMany(fetch = FetchType.LAZY, mappedBy = "customer")
    @JsonManagedReference
    @JsonIgnore
    private List<Review> reviews;

    public Customer() {
    }

    public Customer(String name, String email, int age) {
        this.name = name;
        this.email = email;
        this.age = age;
    }


    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public List<UserSubscription> getSubscriptions() {
        return subscriptions;
    }

    public void setSubscriptions(List<UserSubscription> subscriptions) {
        this.subscriptions = subscriptions;
    }

    public List<Review> getReviews() {
        return reviews;
    }

    public void setReviews(List<Review> reviews) {
        this.reviews = reviews;
    }

    public int getAge() {
        return age;
    }

    public void setAge(int age) {
        this.age = age;
    }
    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public BillingAccount getBillingAccount() {
        return billingAccount;
    }

    public void setBillingAccount(BillingAccount billingAccount) {
        this.billingAccount = billingAccount;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Customer customer = (Customer) o;
        return id == customer.id &&
                Objects.equals(name, customer.name) &&
                Objects.equals(email, customer.email) &&
                Objects.equals(billingAccount, customer.billingAccount);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, name, email, billingAccount);
    }

    @Override
    public String toString() {
        return "Customer{" +
                "id=" + id +
                ", name='" + name + '\'' +
                ", email='" + email + '\'' +
                ", age=" + age +
                ", billingAccount=" + billingAccount +
                ", subscriptions=" + subscriptions +
                '}';
    }
}
