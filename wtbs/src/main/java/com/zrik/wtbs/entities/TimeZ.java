package com.zrik.wtbs.entities;

import jakarta.persistence.*;
import lombok.Data;
import org.hibernate.annotations.UpdateTimestamp;

import java.util.Date;

@Entity
@Table(name = "wtb_timez", schema = "public")
@Data
public class TimeZ {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column(name = "utc", nullable = false)
    private String utc;

    @Column(name = "utc_offset", nullable = false)
    private int utcOffset;

    @Column(name = "timezone", nullable = false)
    private String timezone;

    @Column(name = "country", nullable = false)
    private String country;

    @Column(name = "city")
    private String city;

    @Column(name = "update_at")
    @UpdateTimestamp()
    private Date updateAt;

    @Column(name = "create_at")
    @UpdateTimestamp()
    private Date createAt;
}
