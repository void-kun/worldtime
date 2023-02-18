package com.zrik.wtbs.dto;


import lombok.Data;

@Data
public class TimezoneDto {
    private String id;
    private String utc;
    private int utcOffset;
    private String timezone;
    private String country;
    private String city;
}
