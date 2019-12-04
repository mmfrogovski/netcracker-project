package com.netcracker.edu.fapi.models;


import org.springframework.format.annotation.NumberFormat;

import javax.validation.constraints.Digits;
import javax.validation.constraints.Max;
import javax.validation.constraints.Min;
import javax.validation.constraints.Positive;
import java.util.Objects;


public class BillingAccount {

    private long id;

    @Positive
    @Max(1000)
    @Min(1)
    private int resources;


    public BillingAccount() {
    }

    public BillingAccount(int resources) {
        this.resources = resources;
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public int getResources() {
        return resources;
    }

    public void setResources(int resources) {
        this.resources = resources;
    }


    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        BillingAccount that = (BillingAccount) o;
        return id == that.id &&
                resources == that.resources;
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, resources);
    }

    @Override
    public String toString() {
        return "\nBillingAccount{" +
                "id=" + id +
                ", resources=" + resources +
                '}';
    }
}
