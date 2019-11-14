package com.netcracker.edu.fapi.models;

public class Subscription {

    private long id;
    private String serviceName;
    private String subName;
    private int price;
    private String description;
    private String image;

    public Subscription() {
    }

    public Subscription(long id, String serviceName, String subName, int price, String description, String image) {
        this.id = id;
        this.serviceName = serviceName;
        this.subName = subName;
        this.price = price;
        this.description = description;
        this.image = image;
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

    @Override
    public String toString() {
        return "Subscription{" +
                "id=" + id +
                ", serviceName='" + serviceName + '\'' +
                ", subName='" + subName + '\'' +
                ", price=" + price +
                ", description='" + description + '\'' +
                ", image=" + image +
                '}';
    }
}
