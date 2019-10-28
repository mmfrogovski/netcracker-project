package com.netcracker.edu.fapi.models;

public class NewService {
    private String serviceName;
    private String subName;
    private int subDuration;
    private float price;
    private String description;

    public NewService() {
    }

    public NewService(String serviceName, String subName, int subDuration, float price, String description) {
        this.serviceName = serviceName;
        this.subName = subName;
        this.subDuration = subDuration;
        this.price = price;
        this.description = description;
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
        return "NewService{" +
                "serviceName='" + serviceName + '\'' +
                ", subName='" + subName + '\'' +
                ", subDuration=" + subDuration +
                ", price=" + price +
                ", description='" + description + '\'' +
                '}';
    }
}

