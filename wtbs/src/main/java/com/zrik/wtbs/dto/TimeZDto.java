package com.zrik.wtbs.dto;


import lombok.Data;

@Data
public class TimeZDto {
    private int id;
    private String utc;
    private int utcOffset;
    private String timezone;
    private String country;
    private String city;
}
