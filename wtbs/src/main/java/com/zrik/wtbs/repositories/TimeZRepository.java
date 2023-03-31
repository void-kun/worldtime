package com.zrik.wtbs.repositories;

import com.zrik.wtbs.entities.TimeZ;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;
import java.util.Optional;

@Repository
public interface TimeZRepository extends JpaRepository<TimeZ, Integer> {

    @Query("SELECT tz from TimeZ tz WHERE " +
            "tz.country ilike %:vl1% " +
            "or tz.city ilike %:vl1% " +
            "or tz.timezone ilike %:vl1% " +
            "order by tz.id " +
            "limit 10")
    public ArrayList<TimeZ> findByCountryOrCityOrTimezone(@Param("vl1") String vl1);

    public ArrayList<TimeZ> findByUtcOffset(float offset);

    public Optional<TimeZ> findById(int id);
}
