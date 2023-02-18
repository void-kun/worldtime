package com.zrik.wtbs.repositories;

import com.zrik.wtbs.entities.TimeZ;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Repository
public interface TimeZRepository extends JpaRepository<TimeZ, Integer> {

    public ArrayList<TimeZ> findByCountryIgnoreCaseContainingOrCityIgnoreCaseContainingOrTimezoneIgnoreCaseContaining(String vl1, String vl2, String vl3);

    public ArrayList<TimeZ> findByCountryLike(String vl1);

    public ArrayList<TimeZ> findByUtcOffset(int offset);

    public Optional<TimeZ> findById(int id);
}
