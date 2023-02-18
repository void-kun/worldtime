package com.zrik.wtbs.dto;

import com.zrik.wtbs.utils.DateUtils;
import lombok.*;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;

import java.util.Date;
import java.util.Optional;

@Getter
@Setter
@Builder
public class ResponseTemplate {
    private Optional<Object> data;

    private Optional<String> error;

    @Getter(AccessLevel.NONE)
    private long timestamp;

    public long getTimestamp() {
        return DateUtils.getTimeMillis();
    }
}
