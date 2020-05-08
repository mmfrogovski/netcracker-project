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
    private int price;
    private String description;
    private String image;
    private String tags;

    public Subscription() {
    }

    public Subscription(String serviceName, String subName, int price, String description, String image, String tags) {
        this.serviceName = serviceName;
        this.subName = subName;
        this.price = price;
        this.description = description;
        this.image = image;
        this.tags = tags;
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getImage() {
        return image;
    }

    public void setImage(String image) {
        this.image = image;
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

    public int getPrice() {
        return price;
    }

    public void setPrice(int price) {
        this.price = price;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getTags() {
        return tags;
    }

    public void setTags(String tags) {
        this.tags = tags;
    }

    @Override
    public String toString() {
        return "Subscription{" +
                "id=" + id +
                ", serviceName='" + serviceName + '\'' +
                ", subName='" + subName + '\'' +
                ", price=" + price +
                ", description='" + description + '\'' +
                ", image=" + image +
                ", tags=" + tags +
                '}';
    }
}
