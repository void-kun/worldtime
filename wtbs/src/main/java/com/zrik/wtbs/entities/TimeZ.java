package com.zrik.wtbs.entities;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import lombok.Data;

import java.util.Date;

@Entity(name="wtb_timez")
@Data
public class TimeZone {
    @Id
    private String id;

    @Column(name = "utc")
    private String utc;

    @Column(name = "utc_offset")
    private int utcOffset;

    @Column(name = "timezone")
    private String timezone;

    @Column(name = "country")
    private String country;

    @Column(name = "city")
    private String city;

    @Column(name = "update_at")
    private Date updateAt;

    @Column(name = "create_at")
    private Date createAt;
}
