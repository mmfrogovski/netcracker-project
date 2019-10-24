package com.netcracker.edu.backend.entities;


import javax.persistence.*;
import java.util.Objects;

@Entity
@Table(name = "billing_accounts")
public class BillingAccount {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)

    private long id;
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
