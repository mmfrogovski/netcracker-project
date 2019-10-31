package com.netcracker.edu.backend.entities;

import javax.persistence.*;

@Entity
@Table(name = "subs")
public class Subscription {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)

    private long id;
    private String serviceName;
    private String subName;
    private int subDuration;
    private float price;
    private String description;

    public Subscription() {
    }

    public Subscription(String serviceName, String subName, int subDuration, float price, String description) {
        this.serviceName = serviceName;
        this.subName = subName;
        this.subDuration = subDuration;
        this.price = price;
        this.description = description;
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getServiceName() {
        return serviceName;
    }

    public void setServiceName(String serviceName) {
        this.serviceName = serviceName;
    }

    public String getSubName() {
        return subName;
    }

    public void setSubName(String subName) {
        this.subName = subName;
    }

    public int getSubDuration() {
        return subDuration;
    }

    public void setSubDuration(int subDuration) {
        this.subDuration = subDuration;
    }

    public float getPrice() {
        return price;
    }

    public void setPrice(float price) {
        this.price = price;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }


    @Override
    public String toString() {
        return "Subscription{" +
                "id=" + id +
                ", serviceName='" + serviceName + '\'' +
                ", subName='" + subName + '\'' +
                ", subDuration=" + subDuration +
                ", price=" + price +
                ", description='" + description + '\'' +
                '}';
    }
}
