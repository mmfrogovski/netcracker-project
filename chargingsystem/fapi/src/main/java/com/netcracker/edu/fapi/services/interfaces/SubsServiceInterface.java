package com.netcracker.edu.fapi.services.interfaces;

import com.netcracker.edu.fapi.models.NewService;
import com.netcracker.edu.fapi.models.Subscription;

import java.util.List;

public interface SubsServiceInterface {
    List<Subscription> getSubs();

    Subscription getServiceById(long serviceId);

    Subscription saveService(NewService service);

    void deleteServiceById(long serviceId);
}
