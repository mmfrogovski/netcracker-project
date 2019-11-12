package com.netcracker.edu.fapi.models;

import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.util.Arrays;

public class NewSubscription {

    private long id;
    private String serviceName;
    private String subName;
    private int subDuration;
    private float price;
    private String description;
    private byte[] image;

    public NewSubscription() {
    }


    public NewSubscription(long id, String serviceName, String subName, int subDuration, float price, String description, byte[] image) {
        this.id = id;
        this.serviceName = serviceName;
        this.subName = subName;
        this.subDuration = subDuration;
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


    public byte[] getImage() {
        return image;
    }

    public void setImage(byte[] image) {
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
        return "NewSubscription{" +
                "id=" + id +
                ", serviceName='" + serviceName + '\'' +
                ", subName='" + subName + '\'' +
                ", subDuration=" + subDuration +
                ", price=" + price +
                ", description='" + description + '\'' +
                ", image=" + Arrays.toString(image) +
                '}';
    }
}
