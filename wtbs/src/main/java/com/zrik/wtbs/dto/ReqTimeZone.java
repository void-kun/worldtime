package com.zrik.wtbs.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
@AllArgsConstructor
public class ReqTimeZone {
    private String placeOrTimezone;
    private String offset;
}
