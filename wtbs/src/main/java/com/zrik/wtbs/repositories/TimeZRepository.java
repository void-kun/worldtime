package com.zrik.wtbs.repositories;

import com.zrik.wtbs.entities.TimeZone;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;
import java.util.Optional;

@Repository
public interface TimezoneRepository extends CrudRepository<TimeZone, String> {

    ArrayList<TimeZone> findByCountryOrCityOrTimezoneLike(String placeOrTimezone);

    ArrayList<TimeZone> findByUtcOffset(int offset);

    Optional<TimeZone> findById(String id);
}
