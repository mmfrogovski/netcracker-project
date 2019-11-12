package com.netcracker.edu.fapi.services.interfaces;

import com.netcracker.edu.fapi.models.Subscription;

import java.io.IOException;
import java.util.List;

public interface SubsServiceInterface {
    List<Subscription> getSubs();

    Subscription getServiceById(long serviceId);

    Subscription saveService(Subscription service) throws IOException;

    void deleteServiceById(long serviceId);
}
