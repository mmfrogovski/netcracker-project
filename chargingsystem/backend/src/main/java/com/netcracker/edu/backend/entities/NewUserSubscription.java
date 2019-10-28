package com.netcracker.edu.backend.entities;

public class NewUserSubscription {
    private long id;
    private int restOfSub;
    private String subStart;
    private long customerId;
    private long serviceId;


    public NewUserSubscription() {
    }

    public NewUserSubscription(int restOfSub, String subStart, long customerId, long serviceId) {
        this.restOfSub = restOfSub;
        this.subStart = subStart;
        this.customerId = customerId;
        this.serviceId = serviceId;
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public int getRestOfSub() {
        return restOfSub;
    }

    public void setRestOfSub(int restOfSub) {
        this.restOfSub = restOfSub;
    }

    public String getSubStart() {
        return subStart;
    }

    public void setSubStart(String subStart) {
        this.subStart = subStart;
    }

    public long getCustomerId() {
        return customerId;
    }

    public void setCustomerId(long customerId) {
        this.customerId = customerId;
    }

    public long getServiceId() {
        return serviceId;
    }

    public void setServiceId(long serviceId) {
        this.serviceId = serviceId;
    }

    @Override
    public String toString() {
        return "NewUserSubscription{" +
                "id=" + id +
                ", restOfSub=" + restOfSub +
                ", subStart='" + subStart + '\'' +
                ", customerId=" + customerId +
                ", serviceId=" + serviceId +
                '}';
    }
}
