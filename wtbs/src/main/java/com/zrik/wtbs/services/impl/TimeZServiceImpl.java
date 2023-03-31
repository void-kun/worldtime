package com.zrik.wtbs.services.impl;

import com.zrik.wtbs.dto.ReqTimeZone;
import com.zrik.wtbs.dto.ResponseTemplate;
import com.zrik.wtbs.dto.TimeZDto;
import com.zrik.wtbs.entities.TimeZ;
import com.zrik.wtbs.repositories.TimeZRepository;
import com.zrik.wtbs.services.TimeZService;
import org.modelmapper.ModelMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.*;
import java.util.stream.Collectors;

@Service
public class TimeZServiceImpl implements TimeZService {
    private Logger logger = LoggerFactory.getLogger(TimeZServiceImpl.class);

    private final ModelMapper mapper;

    private final TimeZRepository timezRepository;

    public TimeZServiceImpl(ModelMapper mapper, TimeZRepository timezRepository) {
        this.mapper = mapper;
        this.timezRepository = timezRepository;
    }


    @Override
    @Transactional(readOnly = false)
    public ResponseEntity<ResponseTemplate> findTimeZoneByPlaceOrTimezoneOrOffset(String placeOrTimezone, String offset) {
        ArrayList<TimeZ> res = new ArrayList<>();
        try {
            if (!offset.isBlank()) {
                res = timezRepository.findByUtcOffset(Float.parseFloat(offset));
            }
            if (!placeOrTimezone.isBlank()){
                if (res.isEmpty()) res = timezRepository.findByCountryOrCityOrTimezone(placeOrTimezone);
                else res.retainAll(timezRepository.findByCountryOrCityOrTimezone(placeOrTimezone));
            }

            logger.info("SEARCH " + placeOrTimezone + " : have " + String.valueOf(res.size()) + " cities");
        } catch (Exception e)    {
            return ResponseEntity.badRequest().body(
                    ResponseTemplate.builder()
                    .data(null)
                    .error(Optional.of(e.getMessage()))
                    .build());
        }

        ArrayList<TimeZDto> data = res.stream()
                                        .map((timeZ) -> mapper.map(timeZ, TimeZDto.class))
                                        .collect(Collectors.toCollection(ArrayList::new));
        return ResponseEntity.ok(ResponseTemplate.builder()
                .data(Optional.of(data))
                .build());
    }
}
