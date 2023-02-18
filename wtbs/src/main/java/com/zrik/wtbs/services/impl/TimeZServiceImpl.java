package com.zrik.wtbs.services.impl;

import com.zrik.wtbs.dto.ReqTimeZone;
import com.zrik.wtbs.dto.ResponseTemplate;
import com.zrik.wtbs.dto.TimezoneDto;
import com.zrik.wtbs.entities.TimeZone;
import com.zrik.wtbs.repositories.TimezoneRepository;
import com.zrik.wtbs.services.TimezoneService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class TimeZoneServiceImpl implements TimezoneService {

    @Autowired
    private ModelMapper mapper;

    @Autowired
    private TimezoneRepository timezoneRepository;


    @Override
    public ResponseTemplate findTimeZoneByPlaceOrTimezoneOrOffset(ReqTimeZone reqTimeZone) {
        ArrayList<TimeZone> res = null;
        try {
            if (reqTimeZone.getOffset() != null) {
                res = timezoneRepository.findByUtcOffset(Integer.parseInt(reqTimeZone.getOffset()));
            } else {
                res = timezoneRepository.findByCountryOrCityOrTimezoneLike(reqTimeZone.getPlaceOrTimezone());
            }
        } catch (Exception e) {
            return ResponseTemplate.builder()
                    .status(HttpStatus.BAD_REQUEST)
                    .data(null)
                    .error(Optional.of(e.getMessage()))
                    .build();
        }

        ArrayList<TimezoneDto> data = res.stream()
                                        .map((timeZone) -> mapper.map(timeZone, TimezoneDto.class))
                                        .collect(Collectors.toCollection(ArrayList::new));
        return ResponseTemplate.builder()
                .status(HttpStatus.OK)
                .data(Optional.of(data))
                .build();
    }
}
